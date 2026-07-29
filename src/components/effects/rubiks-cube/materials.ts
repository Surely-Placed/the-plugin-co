import * as THREE from "three";

export const BRAND = {
  light: "#9fd4ff",
  mid: "#4a9af5",
  deep: "#2b7ae4",
  navy: "#1b68cf",
  void: "#0f3d7a",
  highlight: "#ffffff",
} as const;

export type FaceFinish = "gloss" | "mid" | "deep" | "navy";

function createBrushedMetalTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.18, BRAND.highlight);
  gradient.addColorStop(0.42, BRAND.light);
  gradient.addColorStop(0.72, BRAND.mid);
  gradient.addColorStop(1, BRAND.deep);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 64; i++) {
    const y = (i / 64) * size;
    ctx.strokeStyle = `rgba(255,255,255,${0.06 + (i % 3) * 0.05})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y + size * 0.025);
    ctx.stroke();
  }

  for (let i = 0; i < 12; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const w = 20 + Math.random() * 60;
    const g = ctx.createLinearGradient(x, y, x + w, y);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const brushedMap = createBrushedMetalTexture();

function metallicFace(
  color: string,
  opts: { metalness?: number; roughness?: number; emissive?: string; emissiveIntensity?: number } = {}
) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: opts.metalness ?? 0.92,
    roughness: opts.roughness ?? 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    reflectivity: 1,
    emissive: new THREE.Color(opts.emissive ?? color),
    emissiveIntensity: opts.emissiveIntensity ?? 0.08,
    map: brushedMap,
  });
}

export const faceMaterials: Record<FaceFinish, THREE.MeshPhysicalMaterial> = {
  gloss: metallicFace(BRAND.light, {
    metalness: 0.95,
    roughness: 0.04,
    emissive: BRAND.mid,
    emissiveIntensity: 0.12,
  }),
  mid: metallicFace(BRAND.mid, {
    metalness: 0.93,
    roughness: 0.06,
    emissive: BRAND.deep,
    emissiveIntensity: 0.1,
  }),
  deep: metallicFace(BRAND.deep, {
    metalness: 0.9,
    roughness: 0.08,
    emissive: BRAND.navy,
    emissiveIntensity: 0.08,
  }),
  navy: metallicFace(BRAND.navy, {
    metalness: 0.88,
    roughness: 0.1,
    emissive: "#1454a8",
    emissiveIntensity: 0.06,
  }),
};

export const innerFaceMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(BRAND.void),
  metalness: 0.55,
  roughness: 0.35,
  clearcoat: 0.4,
  clearcoatRoughness: 0.15,
});

export const edgeMaterial = new THREE.LineBasicMaterial({
  color: new THREE.Color("#020810"),
  transparent: true,
  opacity: 0.45,
});

export function pickFinish(x: number, y: number, z: number, face: number): FaceFinish {
  const finishes: FaceFinish[] = ["gloss", "mid", "deep", "navy"];
  return finishes[(x + y + z + face + 4) % 4];
}

export function getFaceMaterial(x: number, y: number, z: number, face: number) {
  return faceMaterials[pickFinish(x, y, z, face)];
}
