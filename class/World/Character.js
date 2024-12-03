import * as THREE from "three";
import App from "../App";
import { inputStore, appStateStore } from "../Utils/Store";

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
      this.rLeft = state.rLeft;
      this.rRight = state.rRight;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: "green",
      wireframe: true,
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2.5, 0);
    if (appStateStore.getState().physicsReady) {  
      this.characterController =
      this.physics.world.createCharacterController(0.01);
      
      this.rigidBody = this.physics.add(
        this.character,
        "kinematic",
        "cuboid"
      );
      this.scene.add(this.character);
      this.characterController.setApplyImpulsesToDynamicBodies(true)
      this.characterController.enableAutostep(3 , 0.1 , false)
      this.characterController.enableSnapToGround(1)
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
    // if (this.rLeft) {
    //   ry -= 0.1;
    // }
    // if (this.rRight) {
    //   ry += 0.1;
    // }
    // this.characterRigidBody.applyImpulse({ x, y, z }, true);
    // this.characterRigidBody.applyTorqueImpulse({ x: 0, y: ry, z: 0 }, true);
    // this.characterRigidBody.setNextKinematicTranslation({ x, y, z });
    // this.characterRigidBody.setNextKinematicRotation({x : x , y : ry , z : rz})

    movement.normalize().multiplyScalar(deltaTime * 20)
    movement.y = - 1

    this.characterController.computeColliderMovement(this.rigidBody.collider , movement );

    const newPosition = new THREE.Vector3()
      .copy(this.rigidBody.rigidBody.translation())
      .add(this.characterController.computedMovement());

    this.rigidBody.rigidBody.setNextKinematicTranslation(newPosition);
    this.character.position.copy(this.rigidBody.rigidBody.translation())
  }
}
