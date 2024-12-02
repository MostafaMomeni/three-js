import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import App from "./App";
import { sizesStore } from "./Utils/Store";

export default class Camera {
  constructor() {

    this.app = new App()

    this.canvas = this.app.canvas 
    this.scene = this.app.scene

    this.sizesStore = sizesStore

    this.sizes = this.sizesStore.getState()

    this.setInstance();
    this.setControls();
    this.setResizeListener();

  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      2000
    );
    this.instance.position.z = 80;
    this.instance.position.y = 30;
    this.scene.add(this.instance)
  }

  setControls(){
    this.controls = new OrbitControls(this.instance , this.canvas)
    this.controls.enableDamping = true
  }

  loop(){
    this.controls.update()
  }

  setResizeListener(){
    this.sizesStore.subscribe((event)=>{
      this.instance.aspect = event.width / event.height
      this.instance.updateProjectionMatrix()
    })
  }
}
