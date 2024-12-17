import * as THREE from "three";
import App from "../App";
import { inputStore } from "../Utils/Store";

export default class AnimationController {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.avatar = this.app.world.character.avatar;
    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
      this.onInput();
    });

    this.instantiatedAnimations();
  }

  instantiatedAnimations() {
    this.animations = new Map();
    this.mixer = new THREE.AnimationMixer(this.avatar.scene);

    this.avatar.animations.forEach((clip) => {
      this.animations.set(clip.name, this.mixer.clipAction(clip));
    });

    this.currentAction = this.animations.get("idle");
    this.currentAction.play();
  }

  playAnimation(name) {
    if(this.currentAction == this.animations.get(name)) return
    const action = this.animations.get(name);
    action.reset();
    action.play();
    action.crossFadeFrom(this.currentAction, 0.2);

    this.currentAction = action;
  }

  onInput() {
    if (this.forward || this.backward || this.right || this.left) {
      this.playAnimation("run");
    } else {
      this.playAnimation("idle");
    }
  }

  loop(deltaTime) {
    this.mixer.update(deltaTime);
  }
}
