import * as THREE from "three";
import App from "../App";
import Physics from "./Physics";
import Environment from "./Environment";
import { appStateStore } from "../Utils/Store";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.physics = new Physics();

    appStateStore.subscribe((state) => {
      if (state.physicsReady) {
        this.environment = new Environment();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
  }
}
