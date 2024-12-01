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

    const ballGeometry = new THREE.SphereGeometry(1,32,32);
    const material = new THREE.MeshBasicMaterial({ color: "blue" });
    
    this.cubeMesh = new THREE.Mesh(ballGeometry, material);
    this.cubeMesh.position.y = 10;
    this.cubeMesh.rotation.x = 0.5;
    this.cubeMesh.rotation.z = 0.5;
    group.add(this.cubeMesh);
    this.physics.add(this.cubeMesh , "dynamic" , "ball")
    
    const boxGeometry = new THREE.BoxGeometry(1,1,1);
    this.cubeMesh2 = new THREE.Mesh(boxGeometry, material);
    this.cubeMesh2.position.y = 10;
    this.cubeMesh2.position.x = 4;
    this.cubeMesh2.rotation.x = 0.5;
    this.cubeMesh2.rotation.z = 0.5;
    group.add(this.cubeMesh2);
    this.physics.add(this.cubeMesh2 , "dynamic" , "cuboid")

    const torusKnotGeometry = new THREE.TorusKnotGeometry(1 , 0.3 , 100 , 16);
    this.cubeMesh3 = new THREE.Mesh(torusKnotGeometry, material);
    this.cubeMesh3.position.y = 10;
    this.cubeMesh3.position.x = -3;
    this.cubeMesh3.rotation.x = 0.5;
    this.cubeMesh3.rotation.z = 0.5;
    this.cubeMesh3.scale.set(1,2,3)

    group.add(this.cubeMesh3);
    this.physics.add(this.cubeMesh3 , "dynamic" , "trimesh")
    
    
    const groundGeometry = new THREE.BoxGeometry(20, 1, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: "turquoise" });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh , "fixed" , "cuboid")
    
  }
}
