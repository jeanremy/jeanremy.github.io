import { Scene, PerspectiveCamera, Group } from 'three/build/three.module'
import { black, getDimensions, radius } from './utilities'
import land from './land'
import sphere from './sphere'

const [width, height] = getDimensions()

export const markerGroup = new Group()
markerGroup.name = 'markers'

// Scene
export let scene = new Scene()
scene.background = black

const aspect = width / height

// Camera
export let camera = new PerspectiveCamera(88, aspect, 0.1, 30)
camera.lookAt(sphere)
camera.position.set(0, 0, radius * 2)

scene.add(camera)
scene.add(land)
scene.add(sphere)

export default { camera, scene, markerGroup }
