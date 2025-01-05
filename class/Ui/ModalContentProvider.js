export default class ModalContentProvider {
    constructor(){
        this.modalContents = {
            aboutMe : {
                title: "About me",
                description : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, sed?",
            },
            projects : {
                title: "Projects",
                description : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, sed?",
            },
            contactMe : {
                title: "Contact me",
                description : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, sed?",
            },
        }
    }

    getModalInfo (portalName){
        return this.modalContents[portalName]
    }
}