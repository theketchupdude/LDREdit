function renderLDR(lines, scene) {
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
