import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const CUBE_BOUND = 2.85;
const PADDING = 1.12;

/** Fit the full cube inside the canvas — keeps aspect ratio in sync with the canvas */
export function FitCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const aspect = size.width / Math.max(size.height, 1);
    const vFov = 44;
    const vFovRad = (vFov * Math.PI) / 180;
    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect);

    const distV = (CUBE_BOUND * PADDING) / Math.sin(vFovRad / 2);
    const distH = (CUBE_BOUND * PADDING) / Math.sin(hFovRad / 2);
    const distance = Math.max(distV, distH);

    const dir = new THREE.Vector3(0.45, 0.32, 1).normalize().multiplyScalar(distance);

    camera.fov = vFov;
    camera.aspect = aspect;
    camera.position.copy(dir);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}
