// Troca de Abas
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');

  if (tabId === 'system' && !window.threeInitialized) {
    init3DScene();
    window.threeInitialized = true;
  }
}

// Resposta do Quiz
function checkAnswer(answer) {
  const resultEl = document.getElementById('quiz-result');
  if (answer === 'Júpiter') {
    resultEl.textContent = 'Correcto! Júpiter é o maior planeta do Sistema Solar.';
    resultEl.style.color = '#4caf50';
  } else {
    resultEl.textContent = 'Incorreto. Tente novamente!';
    resultEl.style.color = '#f44336';
  }
}

// Inicialização do Planeta 3D com Three.js
function init3DScene() {
  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Esfera (Planeta)
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00d2ff,
    wireframe: true
  });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);

  // Luz
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  // Animação de Rotação
  function animate() {
    requestAnimationFrame(animate);
    planet.rotation.y += 0.005;
    planet.rotation.x += 0.002;
    renderer.render(scene, camera);
  }

  animate();
}
