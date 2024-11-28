import { createStore } from "zustand/vanilla";

export const assetToLoad = [
  {
    path: "/brick-wall-bl1/brick-wall_albedo.png",
    id: "earth",
    type: "texture",
  },
  {
    path: "/denim-bl/denim1_albedo.png",
    id: "mars",
    type: "texture",
  },
  {
    path: "/alien-carnivorous-plant-bl/alien-carniverous-plant_albedo.png",
    id: "mercury",
    type: "texture",
  },
  {
    path: "/gray-polished-granite-bl/gray-polished-granite_albedo.png",
    id: "sun",
    type: "texture",
  },
  {
    path: "/layered-planetary-bl/layered-planetary_albedo.png",
    id: "moon",
    type: "texture",
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