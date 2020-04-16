import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { camera, scene } from './scene'
import renderer from './renderer'
import { Clock } from 'three/build/three.module'
import { getDimensions } from './utilities'

CameraControls.install({ THREE: THREE })

const cameraControls = new CameraControls(camera, renderer.domElement)
cameraControls.minDistance = 31
cameraControls.maxDistance = 31
cameraControls.mouseButtons.middle = CameraControls.ACTION.NONE
cameraControls.mouseButtons.right = CameraControls.ACTION.NONE
cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE
cameraControls.touches.two = CameraControls.ACTION.NONE
cameraControls.azimuthRotateSpeed = 0.5
cameraControls.polarRotateSpeed = 0.5

const clock = new Clock()

function anim() {
  // snip
  const delta = clock.getDelta()
  const hasControlsUpdated = cameraControls.update(delta)
  // cameraControls.rotate(0.005, 0, true) for future loop

  window.requestAnimationFrame(anim)

  renderer.render(scene, camera)
}

window.requestAnimationFrame(anim)

window.addEventListener(
  'resize',
  function () {
    const [width, height] = getDimensions()
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  },
  false
)

export default cameraControls
