import * as THREE from "three";
import App from "./App";
import { sizesStore } from "./Utils/Store";

export default class Render {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.scene = this.app.scene;
    this.camera = this.app.camera;

    this.sizesStore = sizesStore
    this.sizes = this.sizesStore.getState();

    this.setInstance();
    this.setResizeListener();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  setResizeListener() {
    sizesStore.subscribe((event) => {
      this.instance.setSize(event.width, event.height);
      this.instance.setPixelRatio(event.pixelRatio);
    });
  }

  loop() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
