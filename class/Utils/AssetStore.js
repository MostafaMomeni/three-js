import { createStore } from "zustand/vanilla";

export const assetToLoad = [
  {
    path: "/model/avatar.glb",
    id: "avatar",
    type: "model",
  },
  {
    path: "/model/enviroment.glb",
    id: "environment",
    type: "model",
  },
];

const assetStore = createStore((set) => ({
    assetToLoad,
    loadAssets : {},
    addLoadedAssets : (asset ,id) => 
      set((state) => ({
        loadAssets : {
          ...state.loadAssets,
          [id] : asset
        }
    }))
}));

export default assetStore