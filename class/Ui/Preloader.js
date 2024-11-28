import assetStore from "../Utils/AssetStore";

export default class Preloader {
  // constructor() {
  //   this.assetStore = assetStore;

  //   this.overlay = document.querySelector(".overlay");
  //   this.loading = document.querySelector(".loading");
  //   this.startButton = document.querySelector(".start");

  //   this.assetStore.subscribe((state) => {
  //     this.numberOfLoadedAssets = Object.keys(state.loadAssets).length;
  //     this.numberOfAssetsToLoad = state.assetToLoad.length;
  //     this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;

  //     document.querySelector(".progress").innerHTML = Math.trunc(
  //       this.progress * 100
  //     );

  //     if (this.progress === 1) {
  //       this.loading.classList.add("fade");
  //       setTimeout(() => {
  //         this.ready();
  //       }, 500);

  //       setTimeout(() => {
  //         this.loading.remove();
  //       }, 100);
  //     }
  //   });
  // }

  ready() {
    this.startButton.classList.add("fadeIn");

    this.startButton.addEventListener("click", () => {
      this.startButton.classList.remove("fadeIn");
      this.startButton.classList.add("fade");
      this.overlay.classList.add("fade");

      setTimeout(() => {
        this.startButton.remove();
        this.overlay.remove();
      }, 1000);
    });
  }
}
