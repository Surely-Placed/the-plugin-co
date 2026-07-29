import { useEffect, useRef, type RefObject } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { TwistMove } from "./cubeState";
import { resolveTwist } from "./cubeState";
import type { LayerTwistController } from "./useLayerTwist";

const DRAG_SENSITIVITY = 0.011;
const HOVER_MIN_SPEED = 0.35;
const HOVER_MAX_SPEED = 14;
const HOVER_DRAG_THRESHOLD = 22;
const HOVER_COOLDOWN_MS = 420;

interface UseCubeInteractionOptions {
  cubeRef: RefObject<THREE.Group | null>;
  cubeletMeshesRef: RefObject<THREE.Mesh[]>;
  layerTwist: LayerTwistController;
}

export function useCubeInteraction({
  cubeRef,
  cubeletMeshesRef,
  layerTwist,
}: UseCubeInteractionOptions) {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const normalMatrix = useRef(new THREE.Matrix3());

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const spinVelocity = useRef({ x: 0, y: 0 });

  const hoverPointer = useRef({ x: 0, y: 0 });
  const hoverDelta = useRef({ x: 0, y: 0 });
  const isOverCube = useRef(false);
  const lastTwistAt = useRef(0);
  const lastHoverNormal = useRef<{ x: number; y: number; z: number } | null>(null);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    const setPointerFromEvent = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const getHoverNormal = (): { x: number; y: number; z: number } | null => {
      const cube = cubeRef.current;
      const meshes = cubeletMeshesRef.current;
      if (!cube || meshes.length === 0) return null;

      raycaster.current.setFromCamera(pointer.current, camera);
      const hits = raycaster.current.intersectObjects(meshes, false);
      const hit = hits[0];
      if (!hit?.face) return null;

      normalMatrix.current.getNormalMatrix(cube.matrixWorld);
      const localNormal = hit.face.normal.clone().applyMatrix3(normalMatrix.current).normalize();
      return { x: localNormal.x, y: localNormal.y, z: localNormal.z };
    };

    const tryHoverTwist = (event: PointerEvent) => {
      if (isDragging.current || layerTwist.isAnimating.current) return;
      if (Date.now() - lastTwistAt.current < HOVER_COOLDOWN_MS) return;

      const deltaX = event.clientX - hoverPointer.current.x;
      const deltaY = event.clientY - hoverPointer.current.y;
      const speed = Math.hypot(deltaX, deltaY);
      if (speed < HOVER_MIN_SPEED || speed > HOVER_MAX_SPEED) return;

      hoverDelta.current.x += deltaX;
      hoverDelta.current.y += deltaY;

      const normal = getHoverNormal();
      if (!normal) {
        isOverCube.current = false;
        return;
      }

      isOverCube.current = true;
      lastHoverNormal.current = normal;

      const totalDrag = Math.hypot(hoverDelta.current.x, hoverDelta.current.y);
      if (totalDrag < HOVER_DRAG_THRESHOLD) return;

      const move: TwistMove | null = resolveTwist(
        normal,
        hoverDelta.current.x,
        hoverDelta.current.y
      );
      hoverDelta.current = { x: 0, y: 0 };

      if (move && layerTwist.requestTwist(move)) {
        lastTwistAt.current = Date.now();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      isDragging.current = true;
      spinVelocity.current = { x: 0, y: 0 };
      lastPointer.current = { x: event.clientX, y: event.clientY };
      hoverDelta.current = { x: 0, y: 0 };
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isDragging.current && cubeRef.current) {
        const deltaX = event.clientX - lastPointer.current.x;
        const deltaY = event.clientY - lastPointer.current.y;

        cubeRef.current.rotation.y += deltaX * DRAG_SENSITIVITY;
        cubeRef.current.rotation.x += deltaY * DRAG_SENSITIVITY;

        spinVelocity.current = {
          x: deltaX * DRAG_SENSITIVITY * 0.92,
          y: deltaY * DRAG_SENSITIVITY * 0.92,
        };

        lastPointer.current = { x: event.clientX, y: event.clientY };
        return;
      }

      if (event.buttons === 0) {
        setPointerFromEvent(event);
        tryHoverTwist(event);
        hoverPointer.current = { x: event.clientX, y: event.clientY };
      }
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      canvas.style.cursor = "grab";
      hoverPointer.current = { x: event.clientX, y: event.clientY };
      hoverDelta.current = { x: 0, y: 0 };
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    };

    const onPointerLeave = () => {
      isOverCube.current = false;
      hoverDelta.current = { x: 0, y: 0 };
      lastHoverNormal.current = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.style.cursor = "";
      canvas.style.touchAction = "";
    };
  }, [camera, cubeRef, cubeletMeshesRef, gl.domElement, layerTwist]);

  return { isDragging, spinVelocity, isOverCube };
}
