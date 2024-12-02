import { inputStore } from "../Utils/Store";

export default class InputController {
  constructor() {
    this.startListening();
    this.inputStore = inputStore;
  }

  startListening() {
    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));
  }

  onKeyDown(event) {
    switch (event.code) {
      case "KeyW":
        inputStore.setState({ forward: true });
        break;
      case "KeyS":
        inputStore.setState({ backward: true });
        break;
      case "KeyD":
        inputStore.setState({ right: true });
        break;
      case "KeyA":
        inputStore.setState({ left: true });
        break;
      case "ArrowUp":
        inputStore.setState({ up: true });
        break;
      case "ArrowDown":
        inputStore.setState({ down: true });
        break;
      case "ArrowLeft":
        inputStore.setState({ rLeft: true });
        break;
      case "ArrowRight":
        inputStore.setState({ rRight: true });
        break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case "KeyW":
        inputStore.setState({ forward: false });
        break;
      case "KeyS":
        inputStore.setState({ backward: false });
        break;
      case "KeyD":
        inputStore.setState({ right: false });
        break;
      case "KeyA":
        inputStore.setState({ left: false });
        break;
      case "ArrowUp":
        inputStore.setState({ up: false });
        break;
      case "ArrowDown":
        inputStore.setState({ down: false });
        break;
      case "ArrowLeft":
        inputStore.setState({ rLeft: false });
        break;
      case "ArrowRight":
        inputStore.setState({ rRight: false });
        break;
    }
  }
}
