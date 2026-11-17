import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function PluginCubeModel() {
  const { scene } = useGLTF("/assets/plugin-cube.glb");
  return <primitive object={scene} scale={1.35} />;
}

useGLTF.preload("/assets/plugin-cube.glb");

export default function PluginCubeCanvas() {
  return (
    <Canvas
      className="aspect-square w-full rounded-3xl"
      camera={{ position: [0, 0.4, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 2]} intensity={1.1} />
      <Suspense fallback={null}>
        <PluginCubeModel />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.85} />
    </Canvas>
  );
}