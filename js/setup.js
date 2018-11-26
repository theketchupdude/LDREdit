var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var controls = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshNormalMaterial({
  //color: 0x00ff00,
  side: THREE.DoubleSide
});

var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.recieveShadow = true;
scene.add(cube);

var light = new THREE.SpotLight(0xffffff, 1.0);
light.position.set(0, 500, 0);
light.castShadow = true;
scene.add(light);

var sky = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
scene.add(sky);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
