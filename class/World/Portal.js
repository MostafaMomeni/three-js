import * as THREE from "three"
import App from "../App";
import ModalManager from "../Ui/ModalManager";

export default class Portal{
    constructor(portalMesh , modalInfo){
        this.app = new App()
        this.portalMesh = portalMesh
        this.modalManager = new ModalManager()
        this.modalInfo = modalInfo

        this.portalNearMaterial = new THREE.MeshBasicMaterial({
            color: 0XFFFFFF , 
            transparent: true,
            opacity: 0.8,
        })
        this.portalFarMaterial = new THREE.MeshBasicMaterial({
            color: 0X00FFFF , 
            transparent: true,
            opacity: 0.8,
        })

        this.portalMesh.material = this.portalFarMaterial

        this.prevIsNear = false
    }

    loop(){
        this.character = this.app.world.character.character
        if(this.character){
            const portalPosition = new THREE.Vector3()
            this.portalMesh.getWorldPosition(portalPosition)
            const distance = this.character.position.distanceTo(portalPosition)
            const isNear = distance < 9.5
            if(isNear){
                if(!this.prevIsNear){
                    this.modalManager.openModal(this.modalInfo.title , this.modalInfo.description)
                    this.portalMesh.material = this.portalNearMaterial
                }
                this.prevIsNear = true
            }else{
                if(this.prevIsNear){
                    this.modalManager.closeModal()
                    this.portalMesh.material = this.portalFarMaterial
                }
                this.prevIsNear = false
            }
        }
    }
}