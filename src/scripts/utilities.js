import { Vector3, Geometry, Color, LineSegments } from 'three/build/three.module'

export const latLongToVector3 = (latitude, longitude, radius, height) => {
  var phi = (latitude * Math.PI) / 180
  var theta = ((longitude - 180) * Math.PI) / 180

  var x = -(radius + height) * Math.cos(phi) * Math.cos(theta)
  var y = (radius + height) * Math.sin(phi)
  var z = (radius + height) * Math.cos(phi) * Math.sin(theta)

  return new Vector3(x, y, z)
}

export const vertex = ([longitude, latitude], radius) => {
  const lambda = (longitude * Math.PI) / 180
  const phi = (latitude * Math.PI) / 180
  return new Vector3(radius * Math.cos(phi) * Math.cos(lambda), radius * Math.sin(phi), -radius * Math.cos(phi) * Math.sin(lambda))
}

export const wireframe = (multilinestring, radius, material) => {
  const geometry = new Geometry()
  for (const P of multilinestring.coordinates) {
    for (let p0, p1 = vertex(P[0], radius), i = 1; i < P.length; ++i) {
      geometry.vertices.push((p0 = p1), (p1 = vertex(P[i], radius)))
    }
  }
  return new LineSegments(geometry, material)
}

// Colors
const blackString = getComputedStyle(document.documentElement).getPropertyValue('--black').substring(1)
const yellowString = getComputedStyle(document.documentElement).getPropertyValue('--yellow').substring(1)
export const black = new Color(blackString)
export const yellow = new Color(yellowString)

// Heights
export const radius = 15

export const getDimensions = () => {
  const root = document.querySelector('.map__content')
  return [root.offsetWidth, root.offsetHeight]
}

const toScreenPosition = (obj, camera, renderer) => {
  var vector = new Vector3()

  var widthHalf = 0.5 * renderer.getContext().canvas.offsetWidth
  var heightHalf = 0.5 * renderer.getContext().canvas.offsetHeight

  obj.updateMatrixWorld()
  vector.setFromMatrixPosition(obj.matrixWorld)
  vector.project(camera)

  vector.x = vector.x * widthHalf + widthHalf
  vector.y = -(vector.y * heightHalf) + heightHalf

  return {
    x: vector.x + (window.innerWidth - widthHalf * 2) / 2,
    y: vector.y + 5,
  }
}

const setMarkerInfos = (obj, position) => {
  const markerInfos = document.getElementById('marker__infos')
  const markerInfosCity = document.getElementById('marker__infos__city')
  const markerInfosCountry = document.getElementById('marker__infos__country')
  markerInfos.style.opacity = 1
  markerInfos.style.visibility = 'visible'
  markerInfos.style.top = `${position.y}px`
  markerInfos.style.left = `${position.x}px`
  markerInfosCity.innerText = obj.userData.city

  markerInfosCountry.innerText = obj.userData.country_name
}

const resetMarkerInfos = () => {
  const markerInfos = document.getElementById('marker__infos')
  const markerInfosCity = document.getElementById('marker__infos__city')
  const markerInfosCountry = document.getElementById('marker__infos__country')
  markerInfos.style.top = '0px'
  markerInfos.style.left = '0px'
  markerInfos.style.opacity = 0
  markerInfos.style.visibility = 'hidden'
  markerInfosCity.innerText = ''
  markerInfosCountry.innerText = ''
}

export { toScreenPosition }
export { setMarkerInfos }
export { resetMarkerInfos }

export default { black, yellow, radius, latLongToVector3, vertex, wireframe, getDimensions }
