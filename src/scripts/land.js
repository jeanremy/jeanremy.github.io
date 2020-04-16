import * as topojson from 'topojson-client'
import { LineBasicMaterial } from 'three/build/three.module'
import { radius, wireframe } from './utilities'
import land110m from './land-110m.json'

const topology = land110m
const mesh = topojson.mesh(topology, topology.objects.land)
const land = wireframe(mesh, radius, new LineBasicMaterial({ color: 0xc2c2c2 }))

export default land
