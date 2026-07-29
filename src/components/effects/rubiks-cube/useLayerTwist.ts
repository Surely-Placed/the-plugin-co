import { useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import type { Axis, CubeletState, TwistMove } from "./cubeState";
import { applyTwist, cubeletsInLayer, gridToWorld } from "./cubeState";

const TWIST_DURATION = 0.52;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function axisVector(axis: Axis) {
  if (axis === "x") return new THREE.Vector3(1, 0, 0);
  if (axis === "y") return new THREE.Vector3(0, 1, 0);
  return new THREE.Vector3(0, 0, 1);
}

function rotatePoint(
  point: THREE.Vector3,
  axis: Axis,
  angle: number,
  direction: 1 | -1
): THREE.Vector3 {
  return point.clone().applyAxisAngle(axisVector(axis), angle * direction);
}

export interface LayerTwistController {
  visualPositions: MutableRefObject<Map<number, THREE.Vector3>>;
  groupRefs: MutableRefObject<Map<number, THREE.Group>>;
  isAnimating: MutableRefObject<boolean>;
  requestTwist: (move: TwistMove) => boolean;
  update: (delta: number) => void;
}

export function useLayerTwist(
  cubelets: CubeletState[],
  setCubelets: (next: CubeletState[]) => void,
  visualPositions: MutableRefObject<Map<number, THREE.Vector3>>,
  groupRefs: MutableRefObject<Map<number, THREE.Group>>
): LayerTwistController {
  const isAnimating = useRef(false);
  const cubeletsRef = useRef(cubelets);
  cubeletsRef.current = cubelets;

  const activeTwist = useRef<{
    move: TwistMove;
    progress: number;
    ids: number[];
    startPositions: Map<number, THREE.Vector3>;
  } | null>(null);

  const syncVisualsFromState = (states: CubeletState[]) => {
    states.forEach((cubelet) => {
      const [x, y, z] = gridToWorld(cubelet.position);
      visualPositions.current.set(cubelet.id, new THREE.Vector3(x, y, z));
      groupRefs.current.get(cubelet.id)?.position.set(x, y, z);
    });
  };

  const requestTwist = (move: TwistMove): boolean => {
    if (isAnimating.current) return false;

    const layerCubelets = cubeletsInLayer(cubeletsRef.current, move.axis, move.layer);
    if (layerCubelets.length === 0) return false;

    const startPositions = new Map<number, THREE.Vector3>();
    layerCubelets.forEach((cubelet) => {
      const pos =
        visualPositions.current.get(cubelet.id)?.clone() ??
        new THREE.Vector3(...gridToWorld(cubelet.position));
      startPositions.set(cubelet.id, pos);
    });

    activeTwist.current = {
      move,
      progress: 0,
      ids: layerCubelets.map((c) => c.id),
      startPositions,
    };
    isAnimating.current = true;
    return true;
  };

  const update = (delta: number) => {
    const twist = activeTwist.current;
    if (!twist) return;

    twist.progress = Math.min(1, twist.progress + delta / TWIST_DURATION);
    const eased = easeInOutCubic(twist.progress);
    const angle = (Math.PI / 2) * eased;
    const { move, ids, startPositions } = twist;

    ids.forEach((id) => {
      const start = startPositions.get(id);
      if (!start) return;
      const next = rotatePoint(start, move.axis, angle, move.direction);
      visualPositions.current.set(id, next);
      groupRefs.current.get(id)?.position.copy(next);
    });

    if (twist.progress >= 1) {
      const nextStates = applyTwist(cubeletsRef.current, move);
      setCubelets(nextStates);
      activeTwist.current = null;
      isAnimating.current = false;
      syncVisualsFromState(nextStates);
    }
  };

  return {
    visualPositions,
    groupRefs,
    isAnimating,
    requestTwist,
    update,
  };
}
