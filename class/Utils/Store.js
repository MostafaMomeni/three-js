import { createStore } from "zustand/vanilla";

export const sizesStore = createStore(()=> ({
    width : window.innerWidth,
    height : window.innerHeight,
    pixelRatio : Math.min(window.devicePixelRatio),
}))

export const appStateStore = createStore(()=>({
    physicsReady : false,
    AssetsReady : false
}))

export const inputStore = createStore(()=>({
    forward : false,
    backward : false,
    left : false,
    right : false,
    rLeft : false,
    rRight : false,
}))