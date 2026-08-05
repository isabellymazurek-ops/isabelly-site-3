// Configuração da cena, câmera e renderizador Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('space-canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Adicionando um Planeta 3D no centro
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: false });
const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

// Iluminação
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(10, 10, 10);
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(pointLight, ambientLight);

// Fundo de estrelas
function addStar() {
  const starGeo = new THREE.SphereGeometry(0.05, 24, 24);
  const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeo, starMat);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(300).fill().forEach(addStar);

camera.position.z = 8;

// Loop de Animação
function animate() {
  requestAnimationFrame(animate);
  planet.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Ajuste automático de tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
