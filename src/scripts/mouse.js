import { Vector2, Raycaster, Box3, Vector3 } from 'three/build/three.module'
import { camera, scene, markerGroup } from './scene'
import renderer from './renderer'
import { toScreenPosition, setMarkerInfos, resetMarkerInfos } from './utilities'

var mouse = new Vector2()
var raycaster = new Raycaster()
var canvasContainer = document.querySelector('.map__content')
var canvas = document.querySelector('.map__content canvas')

window.addEventListener('mousemove', onMouseMove, false)
canvas.addEventListener('mousedown', onDocumentMouseDown, false)
canvas.addEventListener('touchend', onDocumentMouseDown, false)

function setMousePosition(eventX, eventY) {
  const xMargin = (window.innerWidth - canvas.offsetWidth) / 2
  // window.innerHeight
  mouse.x = ((eventX - xMargin) / canvas.offsetWidth) * 2 - 1
  mouse.y = -((eventY - canvasContainer.offsetTop + window.scrollY) / canvas.offsetHeight) * 2 + 1
}

function onMouseMove(event) {
  setMousePosition(event.clientX, event.clientY)
}

function onDocumentMouseDown(event) {
  event.preventDefault()
  if (event.type == 'touchend') {
    var touch = event.touches[0] || event.changedTouches[0]
    setMousePosition(touch.pageX, touch.pageY)
  } else if (event.type == 'mousedown') {
    setMousePosition(event.clientX, event.clientY)
  }

  raycaster.setFromCamera(mouse, camera)
  var intersects = raycaster.intersectObjects(markerGroup.children, true)
  if (intersects.length > 0) {
    const obj = intersects[0].object
    const position = toScreenPosition(intersects[0].object, camera, renderer)
    setMarkerInfos(obj, position)
  } else {
    resetMarkerInfos()
  }
}
