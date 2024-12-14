import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import assetStore, { assetToLoad }  from "./AssetStore";

export default class AssetLoader {
    constructor(){
        this.assetStore = assetStore.getState()
        this.assetToLoad = assetToLoad
        this.addLoadedAsset = assetStore.addLoadedAsset
        this.createLoader()
        this.startLoading()
    }

    createLoader(){
        const dracoLoader =  new DRACOLoader()
        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(dracoLoader)
        this.textureLoader = new THREE.TextureLoader()
    }

    startLoading(){
        this.assetToLoad.forEach(asset =>{
            if(asset.type === "texture"){
                this.textureLoader.load(asset.path , (loadedAssets)=>{
                    this.assetStore.addLoadedAssets(loadedAssets , asset.id)
                })
            }
            if(asset.type === "model"){
                this.gltfLoader.load(asset.path , (loadedAssets)=>{
                    this.assetStore.addLoadedAssets(loadedAssets , asset.id)
                })
            }
        })
    }
}