import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three/build/three.module'
import { black, radius } from './utilities'

// Sphere
var geometry = new SphereGeometry(radius, 32, 32)
var material = new MeshBasicMaterial({ color: black, transparent: true, opacity: 1 })
var sphere = new Mesh(geometry, material)

export default sphere
