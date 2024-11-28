import * as THREE from "three";
import App from "../App";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics

    this.loopEnvironment();
    this.addMeshes();
  }

  loopEnvironment() {
    const pointLight = new THREE.AmbientLight("white", 2);

    this.directionalLight = new THREE.DirectionalLight("white", 1);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;

    this.scene.add(pointLight, this.directionalLight);
  }

  addMeshes() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "blue" });

    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.y = 10;
    this.cubeMesh.rotation.x = 0.5;
    this.cubeMesh.rotation.z = 0.5;
    this.physics.add(this.cubeMesh)
    
    this.cubeMesh2 = new THREE.Mesh(geometry, material);
    this.cubeMesh2.position.y = 10;
    this.cubeMesh2.position.x = 4;
    this.cubeMesh2.rotation.x = 0.5;
    this.cubeMesh2.rotation.z = 0.5;
    this.physics.add(this.cubeMesh2)

    this.scene.add(this.cubeMesh, this.cubeMesh2);

  }
}
