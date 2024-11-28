import * as THREE from "three";
import App from "../App";
import { appStateStore } from "../Utils/Store";

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.meshMap = new Map();

    import("@dimforge/rapier3d").then((RAPIER) => {
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);
      this.rapier = RAPIER;

      // three js
      const groundGeometry = new THREE.BoxGeometry(10, 1, 10);
      const groundMaterial = new THREE.MeshStandardMaterial({ color: "aqua" });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.scene.add(this.groundMesh);

      // rapier
      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5);
      this.world.createCollider(groundColliderType, this.groundRigidBody);

      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  add(mesh) {
    const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
    this.rigidBody = this.world.createRigidBody(rigidBodyType);
    this.rigidBody.setTranslation(mesh.position);
    this.rigidBody.setRotation(mesh.quaternion);

    const colliderType = this.rapier.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    this.world.createCollider(colliderType, this.rigidBody);

    this.meshMap.set(mesh, this.rigidBody);
  }

  loop() {
    if (!this.rapierLoaded) return false;

    this.world.step();

    this.meshMap.forEach((rigidBody, mesh) => {
      const position = rigidBody.translation();
      const rotation = rigidBody.rotation();

      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
