export type Axis = "x" | "y" | "z";
export type GridCoord = -1 | 0 | 1;

export interface CubeletPosition {
  x: GridCoord;
  y: GridCoord;
  z: GridCoord;
}

export interface CubeletState {
  id: number;
  position: CubeletPosition;
}

export interface TwistMove {
  axis: Axis;
  layer: GridCoord;
  direction: 1 | -1;
}

export const CUBIE_SIZE = 0.94;
export const CUBIE_GAP = 1.02;

export function gridToWorld({ x, y, z }: CubeletPosition): [number, number, number] {
  return [x * CUBIE_GAP, y * CUBIE_GAP, z * CUBIE_GAP];
}

export function createInitialCubelets(): CubeletState[] {
  const cubelets: CubeletState[] = [];
  let id = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubelets.push({
          id: id++,
          position: { x: x as GridCoord, y: y as GridCoord, z: z as GridCoord },
        });
      }
    }
  }
  return cubelets;
}

export function cubeletsInLayer(cubelets: CubeletState[], axis: Axis, layer: GridCoord) {
  return cubelets.filter((c) => c.position[axis] === layer);
}

export function rotatePosition(
  position: CubeletPosition,
  axis: Axis,
  direction: 1 | -1
): CubeletPosition {
  const { x, y, z } = position;

  if (axis === "x") {
    return direction === 1
      ? { x, y: z as GridCoord, z: (-y as GridCoord) }
      : { x, y: (-z as GridCoord), z: y as GridCoord };
  }

  if (axis === "y") {
    return direction === 1
      ? { x: (-z as GridCoord), y, z: x as GridCoord }
      : { x: z as GridCoord, y, z: (-x as GridCoord) };
  }

  return direction === 1
    ? { x: y as GridCoord, y: (-x as GridCoord), z }
    : { x: (-y as GridCoord), y: x as GridCoord, z };
}

export function applyTwist(cubelets: CubeletState[], move: TwistMove): CubeletState[] {
  return cubelets.map((cubelet) => {
    if (cubelet.position[move.axis] !== move.layer) return cubelet;
    return {
      ...cubelet,
      position: rotatePosition(cubelet.position, move.axis, move.direction),
    };
  });
}

/** Map face normal + drag direction to a layer twist. */
export function resolveTwist(
  normal: { x: number; y: number; z: number },
  dragX: number,
  dragY: number
): TwistMove | null {
  if (Math.hypot(dragX, dragY) < 12) return null;

  const absX = Math.abs(normal.x);
  const absY = Math.abs(normal.y);
  const absZ = Math.abs(normal.z);

  if (absX >= absY && absX >= absZ) {
    const layer = (Math.sign(normal.x) as 1 | -1) as GridCoord;
    const direction = (
      Math.abs(dragY) >= Math.abs(dragX) ? Math.sign(dragY) : Math.sign(-dragX)
    ) as 1 | -1;
    return {
      axis: "x",
      layer,
      direction: normal.x > 0 ? direction : (-direction as 1 | -1),
    };
  }

  if (absY >= absX && absY >= absZ) {
    const layer = (Math.sign(normal.y) as 1 | -1) as GridCoord;
    const direction = (
      Math.abs(dragX) >= Math.abs(dragY) ? Math.sign(dragX) : Math.sign(dragY)
    ) as 1 | -1;
    return {
      axis: "y",
      layer,
      direction: normal.y > 0 ? direction : (-direction as 1 | -1),
    };
  }

  const layer = (Math.sign(normal.z) as 1 | -1) as GridCoord;
  const direction = (
    Math.abs(dragY) >= Math.abs(dragX) ? Math.sign(-dragY) : Math.sign(dragX)
  ) as 1 | -1;
  return {
    axis: "z",
    layer,
    direction: normal.z > 0 ? direction : (-direction as 1 | -1),
  };
}

export function cubeletKey(id: number) {
  return `cubelet-${id}`;
}

const AXES: Axis[] = ["x", "y", "z"];
const LAYERS: GridCoord[] = [-1, 0, 1];

/** Pick a random layer twist for idle animation. */
export function randomTwistMove(): TwistMove {
  const axis = AXES[Math.floor(Math.random() * AXES.length)];
  const layer = LAYERS[Math.floor(Math.random() * LAYERS.length)];
  const direction = (Math.random() > 0.5 ? 1 : -1) as 1 | -1;
  return { axis, layer, direction };
}
