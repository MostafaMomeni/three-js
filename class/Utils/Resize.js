import { sizesStore } from "./Store";

export default class Resize {
  constructor() {
    this.setState = sizesStore.setState;

    window.addEventListener("resize", () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio),
      });
    });
  }
}
