import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CubeletEdges, CubeletMesh } from "./CubeletMesh";
import { createInitialCubelets, cubeletKey, gridToWorld, randomTwistMove } from "./cubeState";
import { useCubeInteraction } from "./useCubeInteraction";
import { useLayerTwist } from "./useLayerTwist";

const CUBE_SCALE = 1.22;
const AUTO_SPIN_Y = 0.78;
const AUTO_SPIN_X = 0.42;
const AUTO_SPIN_Z = 0.32;
const AUTO_TWIST_MIN_PAUSE = 1.25;
const AUTO_TWIST_MAX_PAUSE = 2.5;

export function RubiksCube() {
  const cubeRef = useRef<THREE.Group>(null);
  const [cubelets, setCubelets] = useState(createInitialCubelets);
  const groupRefs = useRef<Map<number, THREE.Group>>(new Map());
  const cubeletMeshesRef = useRef<THREE.Mesh[]>([]);
  const visualPositions = useRef<Map<number, THREE.Vector3>>(new Map());

  const layerTwist = useLayerTwist(cubelets, setCubelets, visualPositions, groupRefs);
  const autoTwistCooldown = useRef(0.6);
  const { isDragging, spinVelocity } = useCubeInteraction({
    cubeRef,
    cubeletMeshesRef,
    layerTwist,
  });

  useEffect(() => {
    cubelets.forEach((cubelet) => {
      const [x, y, z] = gridToWorld(cubelet.position);
      visualPositions.current.set(cubelet.id, new THREE.Vector3(x, y, z));
    });
  }, [cubelets]);

  useFrame((state, delta) => {
    const cube = cubeRef.current;
    if (!cube) return;

    layerTwist.update(delta);

    if (!isDragging.current && !layerTwist.isAnimating.current) {
      autoTwistCooldown.current -= delta;
      if (autoTwistCooldown.current <= 0) {
        if (layerTwist.requestTwist(randomTwistMove())) {
          autoTwistCooldown.current =
            AUTO_TWIST_MIN_PAUSE + Math.random() * (AUTO_TWIST_MAX_PAUSE - AUTO_TWIST_MIN_PAUSE);
        } else {
          autoTwistCooldown.current = 0.35;
        }
      }
    }

    if (isDragging.current) return;

    const time = state.clock.elapsedTime;

    if (Math.abs(spinVelocity.current.x) > 0.00005 || Math.abs(spinVelocity.current.y) > 0.00005) {
      cube.rotation.y += spinVelocity.current.x;
      cube.rotation.x += spinVelocity.current.y;
      spinVelocity.current.x *= 0.92;
      spinVelocity.current.y *= 0.92;
      return;
    }

    cube.rotation.y += delta * AUTO_SPIN_Y;
    cube.rotation.x += delta * AUTO_SPIN_X * Math.sin(time * 0.85);
    cube.rotation.z += delta * AUTO_SPIN_Z * Math.cos(time * 0.62);
  });

  return (
    <>
      <ambientLight intensity={0.55} color="#c8deff" />
      <directionalLight position={[5, 10, 7]} intensity={3.2} color="#ffffff" />
      <directionalLight position={[-6, 4, 5]} intensity={1.4} color="#6eb3ff" />
      <spotLight
        position={[8, 12, 10]}
        angle={0.35}
        penumbra={0.45}
        intensity={2.8}
        color="#ffffff"
        castShadow={false}
      />
      <spotLight
        position={[-10, 6, 8]}
        angle={0.42}
        penumbra={0.55}
        intensity={1.6}
        color="#8ec5ff"
      />
      <pointLight position={[0, -2, 10]} intensity={0.9} color="#3d8ef0" />

      <group ref={cubeRef} scale={CUBE_SCALE} rotation={[0.28, -0.55, 0.12]}>
        {cubelets.map((cubelet) => {
          const [wx, wy, wz] = gridToWorld(cubelet.position);
          return (
            <group
              key={cubeletKey(cubelet.id)}
              ref={(node) => {
                if (node) groupRefs.current.set(cubelet.id, node);
                else groupRefs.current.delete(cubelet.id);
              }}
              position={[wx, wy, wz]}
            >
              <CubeletMesh
                position={cubelet.position}
                cubeletId={cubelet.id}
                meshRef={(mesh) => {
                  if (!mesh) {
                    cubeletMeshesRef.current = cubeletMeshesRef.current.filter(
                      (entry) => entry.userData.cubeletId !== cubelet.id
                    );
                    return;
                  }
                  mesh.userData.isCubelet = true;
                  mesh.userData.cubeletId = cubelet.id;
                  if (!cubeletMeshesRef.current.includes(mesh)) {
                    cubeletMeshesRef.current.push(mesh);
                  }
                }}
              />
              <CubeletEdges />
            </group>
          );
        })}
      </group>
    </>
  );
}
