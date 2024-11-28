import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("public/bg/");

const backGroundCubeMap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
scene.background = backGroundCubeMap;
// scene.environment = backGroundCubeMap

const gltfLoader = new GLTFLoader();

// gltfLoader.load("public/glTF-Sample-Models-main/2.0/BoomBox/glTF/BoomBox.gltf" , (gltf)=>{
//     const sceneGltf = gltf.scene
//     sceneGltf.scale.setScalar(50)
//     const material = sceneGltf.children[0].material
//     material.envMap = backGroundCubeMap
//     material.envMapIntensity = 1
//     scene.add(sceneGltf)
// })

 const model = await gltfLoader.loadAsync(
  "public/glTF-Sample-Models-main/2.0/BoomBox/glTF/BoomBox.gltf"
);
const sceneGltf = model.scene;
sceneGltf.scale.setScalar(50);
const material = sceneGltf.children[0].material;
material.envMap = backGroundCubeMap;
material.envMapIntensity = 1;
scene.add(sceneGltf);

const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 5);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

camera.position.z = 3;

const canvas = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({ canvas });

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
