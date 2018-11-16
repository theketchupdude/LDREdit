var scene, camera, renderer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 5;

var controls = new THREE.OrbitControls(camera);

renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({
  color: 0xc90000,
  side: THREE.DoubleSide
});
var lineMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2
});

var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.recieveShadow = true;
//scene.add(cube);

var light = new THREE.SpotLight(0xffffff, 1.0);
light.position.set(0, 500, 0);
light.castShadow = true;
scene.add(light);

var sky = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
scene.add(sky);

var linez = [
	"3 16 0 0 0 1 0 0 0.9239 0 0.3827",
  "3 16 0 0 0 0.9239 0 0.3827 0.7071 0 0.7071",
  "3 16 0 0 0 0.7071 0 0.7071 0.3827 0 0.9239",
  "3 16 0 0 0 0.3827 0 0.9239 0 0 1",
  "3 16 0 0 0 0 0 1 -0.3827 0 0.9239",
  "3 16 0 0 0 -0.3827 0 0.9239 -0.7071 0 0.7071",
  "3 16 0 0 0 -0.7071 0 0.7071 -0.9239 0 0.3827",
  "3 16 0 0 0 -0.9239 0 0.3827 -1 0 -0",
  "3 16 0 0 0 -1 0 -0 -0.9239 0 -0.3827",
  "3 16 0 0 0 -0.9239 0 -0.3827 -0.7071 0 -0.7071",
  "3 16 0 0 0 -0.7071 0 -0.7071 -0.3827 0 -0.9239",
  "3 16 0 0 0 -0.3827 0 -0.9239 0 0 -1",
  "3 16 0 0 0 0 0 -1 0.3827 0 -0.9239",
  "3 16 0 0 0 0.3827 0 -0.9239 0.7071 0 -0.7071",
  "3 16 0 0 0 0.7071 0 -0.7071 0.9239 0 -0.3827",
  "3 16 0 0 0 0.9239 0 -0.3827 1 0 0"
];

function renderLDR(lines) {
  var part = new THREE.Geometry();
  var endpts = new THREE.Geometry();

  for (var linen in lines) {

    var line = lines[linen];
    var instruction = line.split(' ').map(Number);

    if (instruction[0] == 2) {
      endpts.vertices.push(new THREE.Vector3(instruction[2], instruction[3], instruction[4]));
      endpts.vertices.push(new THREE.Vector3(instruction[5], instruction[6], instruction[7]));
    } else if (instruction[0] == 3) {
      let triangle = new THREE.Geometry();

      triangle.vertices.push(new THREE.Vector3(instruction[2], instruction[3], instruction[4]));
      triangle.vertices.push(new THREE.Vector3(instruction[5], instruction[6], instruction[7]));
      triangle.vertices.push(new THREE.Vector3(instruction[8], instruction[9], instruction[10]));

      triangle.faces.push(new THREE.Face3(0, 1, 2));
      triangle.computeFaceNormals();

      let mesh = new THREE.Mesh(triangle, new THREE.MeshNormalMaterial());

      part.merge(mesh.geometry, mesh.matrix);
    } else if (instruction[0] == 4) {
      let quad = new THREE.Geometry();

      quad.vertices.push(new THREE.Vector3(instruction[2], instruction[3], instruction[4]));
      quad.vertices.push(new THREE.Vector3(instruction[5], instruction[6], instruction[7]));
      quad.vertices.push(new THREE.Vector3(instruction[8], instruction[9], instruction[10]));
      quad.vertices.push(new THREE.Vector3(instruction[11], instruction[12], instruction[13]));

      quad.faces.push(new THREE.Face3(0, 1, 2));
      quad.faces.push(new THREE.Face3(0, 2, 3));
      quad.computeFaceNormals();

      let mesh = new THREE.Mesh(quad, new THREE.MeshNormalMaterial());
      part.merge(mesh.geometry, mesh.matrix);
    }
  }
	var finalpt = new THREE.Mesh(part, material);
	scene.add(finalpt);

	var geomlines = new THREE.LineSegments(endpts, lineMaterial);
	scene.add(geomlines);
}

renderLDR(linez);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

