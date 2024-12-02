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
      this.up = state.up;
      this.down = state.down;
      this.rLeft = state.rLeft;
      this.rRight = state.rRight;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: "green" });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 7.5, 0);
    if (appStateStore.getState().physicsReady) {
      this.scene.add(this.character);
      this.characterRigidBody = this.physics.add(
        this.character,
        "kinematic",
        "cuboid"
      );
    }
  }

  loop() {
    //   this.characterRigidBody.setLinvel({x: 0 , y:0 , z:0} , true)
      let {x,y,z} = this.characterRigidBody.translation()
    //   let {rx,ry,rz} = this.characterRigidBody.rotation()

    if (this.forward) {
      z = z - 0.1;
    }
    if (this.backward) {
      z = z + 0.1;
    }
    if (this.left) {
      x = x - 0.1;
    }
    if (this.right) {
      x = x + 0.1;
    }
    if (this.up) {
      y = y + 0.1;
    }
    if (this.down) {
      y = y - 0.1;
    }
    // if (this.rLeft) {
    //   ry = ry - 0.1;
    // }
    // if (this.rRight) {
    //   ry = ry - 0.1;
    // }
    // this.characterRigidBody.applyImpulse({ x, y, z }, true);
    // this.characterRigidBody.applyTorqueImpulse({ x: 0, y: ry, z: 0 }, true);
    this.characterRigidBody.setNextKinematicTranslation({x,y,z})
    // this.characterRigidBody.setNextKinematicRotation({x : x , y : ry , z : rz})
  }
}
