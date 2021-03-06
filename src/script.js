import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { DoubleSide, PointLightHelper } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


// Loading
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/vape.jpg')


// Debug
const gui = new dat.GUI()
// dat.GUI.toggleHide();


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = texture


// GLTF Loader
const gltfLoader = new GLTFLoader()
gltfLoader.load('/textures/chairs.gltf', (gltf) => {

    // display shadow for gltf model
    gltf.scene.traverse(function(node){         
        if(node.isMesh) { 
            node.castShadow = true;
            node.receiveShadow = true;
        }
    })

    scene.add(gltf.scene)

    // const chair = gui.addFolder('Chairs position')
    // chair.add(gltf.scene.rotation, 'x').min(0).max(9).step(0.01)
    // chair.add(gltf.scene.rotation, 'y').min(0).max(9).step(0.01)
    // chair.add(gltf.scene.rotation, 'z').min(0).max(9).step(0.01)
    // chair.add(gltf.scene.position, 'x').min(0).max(9).step(0.01)
    // chair.add(gltf.scene.position, 'y').min(-1.11).max(9).step(0.01)
    // chair.add(gltf.scene.position, 'z').min(-10).max(9).step(0.01)

    gltf.scene.rotation.set(0,1.53,0)
    gltf.scene.position.set(0,-1.11,-1.53)
})

// Objects
const geometry = new THREE.SphereGeometry( 50, 64, 32 );
const boxGeometry = new THREE.BoxGeometry( 7, 1, 20 );

// Materials
const material = new THREE.MeshPhongMaterial()
material.color = new THREE.Color(0xFF162F)
material.flatShading = true
// material.emissive = new THREE.Color(0xFF162F)
material.specular = new THREE.Color(0xFF162F)
material.shininess = 0

const dockMaterial = new THREE.MeshStandardMaterial()
dockMaterial.color = new THREE.Color(0x1C1C1C)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
const box = new THREE.Mesh(boxGeometry, dockMaterial)
scene.add(sphere, box)

// Mesh positioning
sphere.position.set(0, 2, -120)
box.position.set(0, -1.6, 2)

// Mesh shadow collisions
box.castShadow = true
box.receiveShadow = true


// Lights
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xFF165C, 8.03)
pointLight2.position.set(0, .23, -2.98)
scene.add(pointLight2)
pointLight2.castShadow = true

const light2 = gui.addFolder('Light 2')

light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-100).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(20).step(0.01)

const light2Color = { color : 0xFF165C }

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light2Color.color)
    })

// const pointLight2Helper = new THREE.PointLightHelper(pointLight2)
// scene.add(pointLight2Helper)

// Light 3
const pointLight3 = new THREE.PointLight(0x57ABE8, 11)
pointLight3.position.set(.32, .23, 50)
scene.add(pointLight3)

const light3 = gui.addFolder('Light 3')

light3.add(pointLight3.position, 'y').min(-30).max(60).step(0.01)
light3.add(pointLight3.position, 'x').min(-30).max(30).step(0.01)
light3.add(pointLight3.position, 'z').min(-150).max(50).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(20).step(0.01)

const light3Color = { color : 0x57ABE8 }

light3.addColor(light3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light3Color.color)
    })

// const pointLight3Helper = new THREE.PointLightHelper(pointLight3)
// scene.add(pointLight3Helper)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

const camera1 = gui.addFolder('Camera 1')
camera1.add(camera.position, 'z').min(2).max(10).step(0.5)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true //supprime le background 
})
renderer.shadowMap.enabled = true // turn on shadows in the renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * MouseMove
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

/**
 * Scroll animation
 */
// const updatePlane = (event) => {
//     box.position.y = window.scrollY * .001
// }

// window.addEventListener('scroll', updatePlane)


// Time
const clock = new THREE.Clock()

/**
 * Animate
 */
const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // 
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls -> controle de la sc??ne
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()