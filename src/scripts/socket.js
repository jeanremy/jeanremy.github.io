import { SphereGeometry, MeshBasicMaterial, Mesh, Group } from 'three/build/three.module'
import io from 'socket.io-client'
import { yellow, latLongToVector3, radius } from './utilities'
import cameraControls from './cameraControls'
import { scene, markerGroup } from './scene'
import sphere from './sphere'

const WS_URL = 'https://fast-sands-76087.herokuapp.com/'

const socket = io(WS_URL)

// Socket
// socket.on('users', ({ users, count, message }) => {
//   for (let i = 0, j = users.length; i < j; i++) {
//     const element = users[i]
//     var markerG = new SphereGeometry(0.4, 32, 32)
//     var markerMat = new MeshBasicMaterial({ color: yellow })
//     var marker = new Mesh(markerG, markerMat)
//     let pos = latLongToVector3(element.latitude, element.longitude, radius, 0.5)

//     marker.position.copy(pos)
//     // console.log('camera.position', camera.position)
//     // camera.position.set(pos.x * 2, pos.y * 2, pos.z)
//     // console.log('camera.position', camera.position)
//     // controls.update()
//     var currentPos = cameraControls.getPosition()
//     console.log('pos', currentPos)
//     cameraControls.setPosition(pos.x * 2, pos.y * 2, pos.z, true)

//     scene.add(marker)
//   }

//   document.getElementById('users__count').innerText = `${count} ${count > 1 ? 'users' : 'user'} connected to this page`
//   document.getElementById('users__message').innerText = message
// })
const data = {
  users: [
    {
      ip: '90.27.80.12',
      city: 'Nantes',
      region: 'Pays de la Loire',
      region_code: 'PDL',
      country: 'FR',
      country_code: 'FR',
      country_code_iso3: 'FRA',
      country_capital: 'Paris',
      country_tld: '.fr',
      country_name: 'France',
      continent_code: 'EU',
      in_eu: true,
      postal: '44000',
      latitude: 47.2145,
      longitude: -1.5512,
      timezone: 'Europe/Paris',
      utc_offset: '+0100',
      country_calling_code: '+33',
      currency: 'EUR',
      currency_name: 'Euro',
      languages: 'fr-FR,frp,br,co,ca,eu,oc',
      country_area: 547030,
      country_population: 64768389,
      asn: 'AS3215',
      org: 'Orange',
    },
    {
      ip: '90.27.80.12',
      city: 'Barcelona',
      region: 'Pays de la Loire',
      region_code: 'PDL',
      country: 'FR',
      country_code: 'FR',
      country_code_iso3: 'FRA',
      country_capital: 'Paris',
      country_tld: '.fr',
      country_name: 'France',
      continent_code: 'EU',
      in_eu: true,
      postal: '44000',
      latitude: 40.2145,
      longitude: -1.5512,
      timezone: 'Europe/Paris',
      utc_offset: '+0100',
      country_calling_code: '+33',
      currency: 'EUR',
      currency_name: 'Euro',
      languages: 'fr-FR,frp,br,co,ca,eu,oc',
      country_area: 547030,
      country_population: 64768389,
      asn: 'AS3215',
      org: 'Orange',
    },
  ],
  count: 2,
  message: 'Take that, MySpace.',
}

for (let i = 0, j = data.users.length; i < j; i++) {
  const element = data.users[i]
  var markerG = new SphereGeometry(0.5, 32, 32)
  var markerMat = new MeshBasicMaterial({ color: yellow })
  var marker = new Mesh(markerG, markerMat)
  marker.userData = data.users[i]
  let pos = latLongToVector3(element.latitude, element.longitude, radius + 0.3, 0.5)

  marker.position.copy(pos)
  marker.name = 'pin'
  cameraControls.setPosition(pos.x * 2, pos.y * 2, pos.z, true)

  markerGroup.add(marker)
  scene.remove('markers')
  scene.add(markerGroup)
}

document.getElementById('users__count').innerText = `${data.count} ${data.count > 1 ? 'users' : 'user'} connected to this page`
document.getElementById('users__message').innerText = data.message
