import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const particleTexture = textureLoader.load('/textures/particles/2.png');


/**
 * Particles
 */
// const particlesGeometry = new THREE.SphereBufferGeometry(1,32,32);


const particlesGeometry = new THREE.BufferGeometry();
const countParticles = 20000;

const positions = new Float32Array(countParticles * 3);
const colors = new Float32Array(countParticles * 3);

for (let i = 0; i < countParticles * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute(
  'color',
  new THREE.BufferAttribute(colors, 3)
)


const particlesMaterial = new THREE.PointsMaterial({
    size: 0.09,
    sizeAttenuation: true,
    // color: '#ff88cc',
    transparent: true,
    alphaMap: particleTexture,
    alphaTest: 0.001,
    // depthTest: false //This is an option, but will cause a bug if you have another geometry in the scene
    // depthWrite: false,
    // blending: THREE.AdditiveBlending,
    vertexColors: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particles);



/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
//
// scene.add(cube)

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
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // particles.rotation.x = elapsedTime * 0.03;
    // particles.rotation.y = Math.sin(elapsedTime) * 0.03;

    // for (let i = 0; i < countParticles; i++) {
    //     let i3 = i * 3;
    //     const positionX = particlesGeometry.attributes.position.array[i3];

    //     particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + positionX);
    // }

    // particlesGeometry.attributes.position.needsUpdate = true;

    camera.position.x = Math.cos(elapsedTime * 0.5) * (7 + Math.sin(elapsedTime * .32));
    camera.position.y = Math.cos(elapsedTime * 0.5) * (7 + Math.sin(elapsedTime * .32));
    camera.position.z = Math.sin(elapsedTime * 0.18) * (7 + Math.sin(elapsedTime * .5));

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}



tick()