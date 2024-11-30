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
    const group = new THREE.Group()
    group.position.y = 10
    group.rotation.x = 90
    this.scene.add(group)

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "blue" });

    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.y = 10;
    this.cubeMesh.rotation.x = 0.5;
    this.cubeMesh.rotation.z = 0.5;
    this.cubeMesh.scale.set(3,3,3)
    this.physics.add(this.cubeMesh , "dynamic")
    
    this.cubeMesh2 = new THREE.Mesh(geometry, material);
    this.cubeMesh2.position.y = 10;
    this.cubeMesh2.position.x = 4;
    this.cubeMesh2.rotation.x = 0.5;
    this.cubeMesh2.rotation.z = 0.5;
    this.physics.add(this.cubeMesh2 , "dynamic")
    
    group.add(this.cubeMesh, this.cubeMesh2);
    
    const groundGeometry = new THREE.BoxGeometry(10, 1, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: "aqua" });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh , "fixed")
    
  }
}
