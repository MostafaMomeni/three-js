import * as THREE from "three";
import App from "../App";
import { inputStore, appStateStore } from "../Utils/Store";
import assetStore from "../Utils/AssetStore";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.assetStore = assetStore.getState();
    this.avatar = this.assetStore.loadAssets.avatar;

    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    const geometry = new THREE.BoxGeometry(4, 7.5, 2);
    const material = new THREE.MeshStandardMaterial({
      color: "green",
      wireframe: true,
      visible: false
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 7, 0);
    if (appStateStore.getState().physicsReady) {
      this.characterController =
        this.physics.world.createCharacterController(0.01);

      this.rigidBody = this.physics.add(this.character, "kinematic", "cuboid");
      this.scene.add(this.character);
      this.characterController.setApplyImpulsesToDynamicBodies(true);
      this.characterController.enableAutostep(3, 0.1, false);
      this.characterController.enableSnapToGround(1);
    }

    if (this.avatar) {
      const avatar = this.avatar.scene;
      avatar.rotation.y = Math.PI;
      avatar.position.y = -3.75;
      avatar.scale.set(4, 4, 4);
      this.character.add(avatar);
    }
  }

  loop(deltaTime) {
    //   this.characterRigidBody.setLinvel({x: 0 , y:0 , z:0} , true)
    // let { x, y, z } = this.characterRigidBody.translation();
    const movement = new THREE.Vector3();

    if (this.forward) {
      movement.z -= 1;
    }
    if (this.backward) {
      movement.z += 1;
    }
    if (this.left) {
      movement.x -= 1;
    }
    if (this.right) {
      movement.x += 1;
    }
    // this.characterRigidBody.applyImpulse({ x, y, z }, true);
    // this.characterRigidBody.applyTorqueImpulse({ x: 0, y: ry, z: 0 }, true);
    // this.characterRigidBody.setNextKinematicTranslation({ x, y, z });
    // this.characterRigidBody.setNextKinematicRotation({x : x , y : ry , z : rz})

    if (movement.length()) {
      const angle = Math.atan2(movement.x, movement.z) + Math.PI;
      // this.character.rotation.y = angle
      const characterRotation = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        angle
      );
      this.character.quaternion.slerp(characterRotation, 1);
    }
    
    movement.normalize().multiplyScalar(deltaTime * 20);
    movement.y = -1;

    this.characterController.computeColliderMovement(
      this.rigidBody.collider,
      movement
    );

    const newPosition = new THREE.Vector3()
      .copy(this.rigidBody.rigidBody.translation())
      .add(this.characterController.computedMovement());

    this.rigidBody.rigidBody.setNextKinematicTranslation(newPosition);
    this.character.position.lerp(this.rigidBody.rigidBody.translation() , 1);
  }
}
