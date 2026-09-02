import * as THREE from 'three'

type Point2D = [number, number]

export function createWireCurves() {
  return {
    topLeft: createRoundedElbow(
      [-4.65, 1.95],
      [-4.65, 2.62],
      [-4.65, 3.15],
      [-4.12, 3.15],
      [-2.03, 3.15],
    ),
    topRight: createRoundedElbow(
      [2.03, 3.15],
      [4.12, 3.15],
      [4.65, 3.15],
      [4.65, 2.62],
      [4.65, 1.85],
    ),
    bottomRight: createRoundedElbow(
      [4.65, -1.95],
      [4.65, -2.62],
      [4.65, -3.15],
      [4.12, -3.15],
      [1.52, -3.15],
    ),
    bottomLeft: createRoundedElbow(
      [-1.52, -3.15],
      [-4.12, -3.15],
      [-4.65, -3.15],
      [-4.65, -2.62],
      [-4.65, -1.95],
    ),
  }
}

export function createFlowCurve() {
  const path = new THREE.CurvePath<THREE.Vector3>()
  const point = ([x, y]: Point2D) => new THREE.Vector3(x, y, 0.16)
  const line = (from: Point2D, to: Point2D) =>
    path.add(new THREE.LineCurve3(point(from), point(to)))
  const corner = (from: Point2D, control: Point2D, to: Point2D) =>
    path.add(new THREE.QuadraticBezierCurve3(point(from), point(control), point(to)))

  line([-4.65, 1.95], [-4.65, 2.62])
  corner([-4.65, 2.62], [-4.65, 3.15], [-4.12, 3.15])
  line([-4.12, 3.15], [-2.03, 3.15])
  line([-2.03, 3.15], [2.03, 3.15])
  line([2.03, 3.15], [4.12, 3.15])
  corner([4.12, 3.15], [4.65, 3.15], [4.65, 2.62])
  line([4.65, 2.62], [4.65, 1.85])
  line([4.65, 1.85], [4.65, -1.95])
  line([4.65, -1.95], [4.65, -2.62])
  corner([4.65, -2.62], [4.65, -3.15], [4.12, -3.15])
  line([4.12, -3.15], [1.52, -3.15])
  line([1.52, -3.15], [-1.52, -3.15])
  line([-1.52, -3.15], [-4.12, -3.15])
  corner([-4.12, -3.15], [-4.65, -3.15], [-4.65, -2.62])
  line([-4.65, -2.62], [-4.65, -1.95])
  line([-4.65, -1.95], [-4.65, 1.95])

  return path
}

export function createFilamentGeometry() {
  const points: THREE.Vector3[] = []

  for (let index = 0; index <= 64; index += 1) {
    const amount = index / 64
    const angle = amount * Math.PI * 6
    points.push(
      new THREE.Vector3(
        Math.sin(angle) * 0.19,
        (amount - 0.5) * 0.54,
        Math.cos(angle) * 0.04,
      ),
    )
  }

  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, 0.022, 8, false)
}

function createRoundedElbow(
  start: Point2D,
  cornerStart: Point2D,
  control: Point2D,
  cornerEnd: Point2D,
  end: Point2D,
) {
  const point = ([x, y]: Point2D) => new THREE.Vector3(x, y, 0.16)
  const path = new THREE.CurvePath<THREE.Vector3>()

  path.add(new THREE.LineCurve3(point(start), point(cornerStart)))
  path.add(new THREE.QuadraticBezierCurve3(point(cornerStart), point(control), point(cornerEnd)))
  path.add(new THREE.LineCurve3(point(cornerEnd), point(end)))

  return path
}

