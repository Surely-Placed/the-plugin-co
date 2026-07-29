import { Canvas } from "@react-three/fiber";
import { RubiksCube } from "./RubiksCube";
import { FitCamera } from "./FitCamera";

export default function RubiksCubeCanvas() {
  return (
    <Canvas
      className="rubiks-cube-canvas"
      camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <FitCamera />
      <RubiksCube />
    </Canvas>
  );
}
