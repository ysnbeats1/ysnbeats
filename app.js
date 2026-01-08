// app.js
// Basic Three.js setup for a 3D Moving Particle Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create Particles
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 5000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x00f2ff, size: 2 });
const stars = new THREE.Points(geometry, material);
scene.add(stars);

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
}

// Interaction with Scroll
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
animate();

// GSAP Animations for sections
gsap.from(".video-card", {
    scrollTrigger: ".video-card",
    duration: 1,
    opacity: 0,
    y: 100,
    stagger: 0.2
});