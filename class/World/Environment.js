import * as THREE from "three";
import App from "../App";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.loadEnvironment();
    this.addGround();
    this.addWalls();
    this.addStairs();
    this.addMeshes();
  }

  loadEnvironment() {
    const pointLight = new THREE.AmbientLight("white", 2);

    this.directionalLight = new THREE.DirectionalLight("white", 1);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;

    this.scene.add(pointLight, this.directionalLight);
  }

  addGround() {
    const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "turquoise",
    });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed", "cuboid");
  }

  addWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "lightGreen",
    });

    const wallGeometry = new THREE.BoxGeometry(100, 10, 1);

    const wallPosition = [
      { x: 0, y: 5, z: 50 },
      { x: 0, y: 5, z: -50 },
      { x: 50, y: 5, z: 0, rotation: { y: Math.PI / 2 } },
      { x: -50, y: 5, z: 0, rotation: { y: Math.PI / 2 } },
    ];

    wallPosition.forEach((position) => {
      const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
      wallMesh.position.copy(position);
      if (position.rotation) {
        wallMesh.rotation.set(
          position.rotation.x || 0,
          position.rotation.y || 0,
          position.rotation.z || 0
        );
      }
      this.scene.add(wallMesh);
      this.physics.add(wallMesh, "fixed", "cuboid");
    });
  }

  addStairs() {
    const stairsMaterial = new THREE.MeshStandardMaterial({
      color: "orange",
    });

    const stairsGeometry = new THREE.BoxGeometry(10, 1, 100);

    const stairsPosition = [
      { x: 5, y: 1, z: 0 },
      { x: 15, y: 2, z: 0 },
      { x: 25, y: 3, z: 0 },
      { x: 35, y: 4, z: 0 },
      { x: 45, y: 5, z: 0 },
    ];

    stairsPosition.forEach((position) => {
      const stairsMesh = new THREE.Mesh(stairsGeometry, stairsMaterial);
      stairsMesh.position.copy(position);
      this.scene.add(stairsMesh);
      this.physics.add(stairsMesh, "fixed", "cuboid");
    });
  }

  addMeshes() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: "blue" });

    for (let i = 0; i < 100; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 5, Math.random()  + 20, Math.random());
      mesh.scale.setScalar(Math.random() + 0.5);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.scene.add(mesh);
      this.physics.add(mesh, "dynamic", "cuboid");
    }

    const group = new THREE.Group();
    group.position.y = 10;
    group.rotation.x = 90;
    this.scene.add(group);

    // const ballGeometry = new THREE.SphereGeometry(1,32,32);
    // const material = new THREE.MeshBasicMaterial({ color: "blue" });

    // this.cubeMesh = new THREE.Mesh(ballGeometry, material);
    // this.cubeMesh.position.y = 10;
    // this.cubeMesh.rotation.x = 0.5;
    // this.cubeMesh.rotation.z = 0.5;
    // this.physics.add(this.cubeMesh , "dynamic" , "ball")

    // const boxGeometry = new THREE.BoxGeometry(1,1,1);
    // this.cubeMesh2 = new THREE.Mesh(boxGeometry, material);
    // this.cubeMesh2.position.y = 10;
    // this.cubeMesh2.position.x = 4;
    // this.cubeMesh2.rotation.x = 0.5;
    // this.cubeMesh2.rotation.z = 0.5;
    // this.physics.add(this.cubeMesh2 , "dynamic" , "cuboid")

    // const torusKnotGeometry = new THREE.TorusKnotGeometry(1 , 0.3 , 80 , 16);
    // this.cubeMesh3 = new THREE.Mesh(torusKnotGeometry, material);
    // this.cubeMesh3.position.y = 20;
    // this.cubeMesh3.position.x = 0;
    // this.cubeMesh3.rotation.x = 0.5;
    // this.cubeMesh3.rotation.z = 0.5;
    // this.physics.add(this.cubeMesh3 , "dynamic" , "trimesh")
    // group.add(this.cubeMesh3 , this.cubeMesh2 , this.cubeMesh);
  }
}
