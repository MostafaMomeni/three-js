import * as THREE from "three";
import App from "../App";
import Physics from "./Physics";
import Environment from "./Environment";
import { appStateStore } from "../Utils/Store";
import Character from "./Character";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.physics = new Physics();

    const unSub = appStateStore.subscribe((state) => {
      if (state.physicsReady && state.AssetsReady) {
        this.environment = new Environment();
        this.character = new Character();
        unSub();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
     if(this.character) this.character.loop(deltaTime);
    // if (this.characterController) this.characterController.loop(deltaTime);
  }
}
