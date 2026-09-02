import * as THREE from 'three'

type GraphiteTextureSet = {
  colorMap: THREE.DataTexture
  roughnessMap: THREE.DataTexture
  normalMap: THREE.DataTexture
  dispose: () => void
}

export function createGraphiteTextureSet(): GraphiteTextureSet {
  const width = 384
  const height = 240
  const pixelCount = width * height
  const color = new Uint8Array(pixelCount * 4)
  const roughness = new Uint8Array(pixelCount * 4)
  const normal = new Uint8Array(pixelCount * 4)
  const relief = new Float32Array(pixelCount)

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x
      const index = pixel * 4
      const longGrain = fbm(x * 0.12 + y * 0.018, y * 0.022, 3)
      const fineGrain = fbm(x * 0.46 + y * 0.08, y * 0.13, 2)
      const striation = graphiteStriation(x, y)
      const pore = valueNoise(x * 0.92, y * 0.92)
      const reliefValue = clamp(
        0.5 +
          (longGrain - 0.5) * 0.075 +
          (fineGrain - 0.5) * 0.032 +
          striation * 0.038 +
          (pore - 0.5) * 0.013,
        0.36,
        0.64,
      )
      const tone = Math.round(
        38 +
          (longGrain - 0.5) * 15 +
          (fineGrain - 0.5) * 9 +
          striation * 9 +
          (pore - 0.5) * 4,
      )
      const roughnessValue = Math.round(
        clamp(
          0.66 + (fineGrain - 0.5) * 0.11 + (pore - 0.5) * 0.06 - striation * 0.1,
          0.5,
          0.84,
        ) * 255,
      )

      relief[pixel] = reliefValue
      color[index] = clamp(tone - 2, 8, 255)
      color[index + 1] = clamp(tone, 8, 255)
      color[index + 2] = clamp(tone + 2, 8, 255)
      color[index + 3] = 255
      roughness[index] = roughnessValue
      roughness[index + 1] = roughnessValue
      roughness[index + 2] = roughnessValue
      roughness[index + 3] = 255
    }
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4
      const left = relief[y * width + Math.max(0, x - 1)]
      const right = relief[y * width + Math.min(width - 1, x + 1)]
      const above = relief[Math.max(0, y - 1) * width + x]
      const below = relief[Math.min(height - 1, y + 1) * width + x]
      const xNormal = -(right - left) * 3.6
      const yNormal = -(below - above) * 3.6
      const inverseLength = 1 / Math.hypot(xNormal, yNormal, 1)

      normal[index] = Math.round((xNormal * inverseLength * 0.5 + 0.5) * 255)
      normal[index + 1] = Math.round((yNormal * inverseLength * 0.5 + 0.5) * 255)
      normal[index + 2] = Math.round((inverseLength * 0.5 + 0.5) * 255)
      normal[index + 3] = 255
    }
  }

  const colorMap = createDataTexture(color, width, height, THREE.SRGBColorSpace)
  const roughnessMap = createDataTexture(roughness, width, height, THREE.NoColorSpace)
  const normalMap = createDataTexture(normal, width, height, THREE.NoColorSpace)

  return {
    colorMap,
    roughnessMap,
    normalMap,
    dispose: () => {
      colorMap.dispose()
      roughnessMap.dispose()
      normalMap.dispose()
    },
  }
}

function createDataTexture(
  data: Uint8Array,
  width: number,
  height: number,
  colorSpace: THREE.ColorSpace,
) {
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat)
  texture.colorSpace = colorSpace
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

function graphiteStriation(x: number, y: number) {
  const warp = (fbm(x * 0.024, y * 0.024, 2) - 0.5) * 1.9
  const line = Math.abs(Math.sin(x * 0.26 + y * 0.05 + warp))
  const broken = smoothstep(0.42, 0.76, valueNoise(x * 0.055, y * 0.13))
  return Math.pow(smoothstep(0.9, 0.995, line), 1.8) * broken
}

function fbm(x: number, y: number, octaves: number) {
  let value = 0
  let amplitude = 0.5
  let frequency = 1
  let weight = 0

  for (let index = 0; index < octaves; index += 1) {
    value += valueNoise(x * frequency, y * frequency) * amplitude
    weight += amplitude
    frequency *= 2.04
    amplitude *= 0.5
  }

  return value / weight
}

function valueNoise(x: number, y: number) {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const x1 = x0 + 1
  const y1 = y0 + 1
  const tx = fade(x - x0)
  const ty = fade(y - y0)
  const top = lerp(hash2(x0, y0), hash2(x1, y0), tx)
  const bottom = lerp(hash2(x0, y1), hash2(x1, y1), tx)
  return lerp(top, bottom, ty)
}

function hash2(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return value - Math.floor(value)
}

function fade(value: number) {
  return value * value * (3 - 2 * value)
}

function smoothstep(min: number, max: number, value: number) {
  const amount = clamp((value - min) / (max - min), 0, 1)
  return amount * amount * (3 - 2 * amount)
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}
