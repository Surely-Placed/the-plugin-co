import { useMemo } from "react";
import type * as THREE from "three";
import { edgeMaterial, getFaceMaterial, innerFaceMaterial } from "./materials";
import type { CubeletPosition } from "./cubeState";
import { CUBIE_SIZE } from "./cubeState";

function isOuterFace(x: number, y: number, z: number, faceIndex: number) {
  if (faceIndex === 0) return x === 1;
  if (faceIndex === 1) return x === -1;
  if (faceIndex === 2) return y === 1;
  if (faceIndex === 3) return y === -1;
  if (faceIndex === 4) return z === 1;
  if (faceIndex === 5) return z === -1;
  return false;
}

interface CubeletMeshProps {
  position: CubeletPosition;
  cubeletId: number;
  meshRef?: (mesh: THREE.Mesh | null) => void;
}

export function CubeletMesh({ position, cubeletId, meshRef }: CubeletMeshProps) {
  const { x, y, z } = position;

  const materials = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((face) =>
        isOuterFace(x, y, z, face) ? getFaceMaterial(x, y, z, face) : innerFaceMaterial
      ),
    [x, y, z]
  );

  return (
    <mesh ref={meshRef} material={materials} userData={{ isCubelet: true, cubeletId }}>
      <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
    </mesh>
  );
}

export function CubeletEdges() {
  return (
    <lineSegments material={edgeMaterial}>
      <boxGeometry args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]} />
    </lineSegments>
  );
}
