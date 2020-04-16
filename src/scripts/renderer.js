import { WebGLRenderer, Clock } from 'three/build/three.module'
import { getDimensions } from './utilities'

const [width, height] = getDimensions()

// Renderer
const renderer = new WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
const container = document.querySelector('.map__content')
container.appendChild(renderer.domElement)

export default renderer
