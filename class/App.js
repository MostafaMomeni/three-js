import * as THREE from "three";
import Camera from "./Camera";
import Loop from "./Utils/Loop";
import Render from "./Render";
import World from "./World/World";
import Resize from "./Utils/Resize";
import AssetLoader from "./Utils/Assetloader";
import Preloader from "./Ui/Preloader";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector(".canvas");
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Render();
    this.world = new World();
    this.loop = new Loop();
    this.resize = new Resize();
    this.assetLoader = new AssetLoader()
    this.preloader = new Preloader()
  }
}
