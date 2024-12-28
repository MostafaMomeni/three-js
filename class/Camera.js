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
    this.character = this.app.world.character?.rigidBody.rigidBody
    // this.character = this.app.world.characterController?.rigidBody?.rigidBody
    if(this.character){
      
      const characterPosition = this.character.translation()
      const characterRotation = this.character.rotation()

      const cameraOffset = new THREE.Vector3(0 , 30 ,55)
      cameraOffset.applyQuaternion(characterRotation)
      cameraOffset.add(characterPosition)
 
      const targetOffset = new THREE.Vector3(0 , 8 , 0)
      targetOffset.applyQuaternion(characterRotation)
      targetOffset.add(characterPosition)

      // this.instance.lookAt(targetOffset)
      this.instance.position.lerp(cameraOffset , 0.1)
      this.controls.target.lerp(targetOffset , 0.1)

    }
  }

  setResizeListener(){
    this.sizesStore.subscribe((event)=>{
      this.instance.aspect = event.width / event.height
      this.instance.updateProjectionMatrix()
    })
  }
}
