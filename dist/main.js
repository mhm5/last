import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Prepare for the grand spectacle
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()

// The moment has come to create separate planes for soil, grass, and water
const soilTexture = new THREE.TextureLoader().load("soil_texture.jpg")
const grassTexture = new THREE.TextureLoader().load("grass_texture.jpg")
const waterTexture = new THREE.TextureLoader().load("water_texture.jpg")

const soilGeometry = new THREE.PlaneGeometry(100, 100, 100, 100)
const grassGeometry = new THREE.PlaneGeometry(100, 100, 100, 100)
const waterGeometry = new THREE.PlaneGeometry(100, 100, 100, 100)

const soilMaterial = new THREE.MeshBasicMaterial({ map: soilTexture })
const grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture })
const waterMaterial = new THREE.MeshBasicMaterial({ map: waterTexture })

const soil = new THREE.Mesh(soilGeometry, soilMaterial)
const grass = new THREE.Mesh(grassGeometry, grassMaterial)
const water = new THREE.Mesh(waterGeometry, waterMaterial)

// Position
soil.position.set(0, 0, 0)
water.position.set(0, -10, 0)
grass.position.set(0, -20, 0)

// Behold the alignment of the planes
soil.rotation.x = -Math.PI / 2
water.rotation.x = -Math.PI / 2
grass.rotation.x = -Math.PI / 2

// Merge the planes with the sky of the sphere
scene.add(soil)
scene.add(grass)
scene.add(water)

// Marvel at the sky sphere
const skyGeometry = new THREE.SphereGeometry(500, 60, 40)
const skyTexture = new THREE.TextureLoader().load("sky_texture.jpg")
const skyMaterial = new THREE.MeshBasicMaterial({
  map: skyTexture,
  side: THREE.BackSide,
})
const sky = new THREE.Mesh(skyGeometry, skyMaterial)
scene.add(sky)

// Take in the panoramic view with the camera
camera.position.set(0, 30, 0)
camera.lookAt(0, 0, 0)

// Activate the renderer for the grand spectacle
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

// Behold, the masterpiece unfolds!
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

