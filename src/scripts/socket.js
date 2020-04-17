import { SphereGeometry, MeshBasicMaterial, Mesh, Group } from 'three/build/three.module'
import io from 'socket.io-client'
import { yellow, latLongToVector3, radius } from './utilities'
import cameraControls from './cameraControls'
import { scene, markerGroup } from './scene'

const socket = io(process.env.WS_URL)

socket.on('users', ({ users, count, message }) => {
  for (let i = 0, j = users.length; i < j; i++) {
    const element = users[i]
    var markerG = new SphereGeometry(0.7, 32, 32)
    var markerMat = new MeshBasicMaterial({ color: yellow })
    var marker = new Mesh(markerG, markerMat)
    marker.userData = users[i]
    let pos = latLongToVector3(element.latitude, element.longitude, radius + 0.5, 0.5)

    marker.position.copy(pos)
    marker.name = 'pin'
    cameraControls.setPosition(pos.x * 2, pos.y * 2, pos.z, true)

    markerGroup.add(marker)
    scene.remove('markers')
    scene.add(markerGroup)
  }

  document.getElementById('users__count').innerText = `${count} ${count > 1 ? 'users' : 'user'} connected to this page`
  document.getElementById('users__message').innerText = message
})
