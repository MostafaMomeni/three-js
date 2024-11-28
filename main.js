import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { Pane } from "tweakpane";

const scene = new THREE.Scene();
// const pane = new Pane();

const textureLoader = new THREE.TextureLoader();

// const geometry = new THREE.BoxGeometry(1, 1, 1);

const sphereGeometry = new THREE.SphereGeometry(0.5, 35, 35);

// const geometry = new THREE.SphereGeometry(1, 52, 52 );

let planeGeometry = new THREE.PlaneGeometry(1, 1, 4, 4);
const uv2 = new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2);
planeGeometry.setAttribute("uv2", uv2);

// const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);

// const bufferAttribute = new THREE.BufferAttribute(vertices , 3)

// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute("position" , bufferAttribute)

const loaderTest = textureLoader.load(
  "./public/brick-wall-bl/brick-wall_albedo.png"
);
const grassAo = textureLoader.load("./public/brick-wall-bl/brick-wall_ao.png");

loaderTest.repeat.set(20, 20);
loaderTest.wrapS = THREE.RepeatWrapping;
loaderTest.wrapT = THREE.RepeatWrapping;

const material = new THREE.MeshPhongMaterial({
  // color: "limeGreen",
  // wireframe: true,
  // transparent:true,
  // opacity:0.5,
  // side:THREE.FrontSide
  side: THREE.DoubleSide,
});
material.map = loaderTest;
material.aoMap = grassAo;
material.aoMapIntensity = 1;

const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.receiveShadow = true
planeMesh.scale.set(5,5,5)
// const cubeMesh = new THREE.Mesh(geometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.castShadow = true

sphereMesh.position.y = 1;
sphereMesh.position.z = 1;


// planeMesh.rotation.x = -Math.PI * 0.5
// planeMesh.scale.set(100 , 100)

scene.add(planeMesh, sphereMesh);

// const PointLight = new THREE.PointLight(
//   "white",
//   0.5,
// )
// scene.add(PointLight)
// PointLight.position.x = 3
// PointLight.position.y = 3

// const directionalLight = new THREE.DirectionalLight(
//   "white",
//   0.9
// )
// scene.add(directionalLight)

// const HemisphereLight = new THREE.HemisphereLight(
//   "red",
//   "blue",
//   0.5
// )
// scene.add(HemisphereLight)

const light = new THREE.AmbientLight("white", 0.1);
scene.add(light); 

const directionalLight = new THREE.DirectionalLight("white" , 0.7)
directionalLight.position.set(2,2,4)
directionalLight.castShadow = true
scene.add(directionalLight)

const spotLight = new THREE.SpotLight( "white" , 10 );
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.radius = 10
spotLight.position.set( 2, 2, 4 );
scene.add(spotLight)


// const spotLightHelper = new THREE.SpotLightHelper(
//   spotLight,
//   0.5
// )
// scene.add(spotLightHelper)

// const pointLight = new THREE.PointLight(
//   0xffffff,
//    0.7,
//    10
// );
// pointLight.position.set(2, 2, 2);
// scene.add(pointLight);

// const fog = new THREE.Fog(0xffffff , 1 , 5)
// scene.fog = fog
// scene.background = new THREE.Color(0xffffff)

// const planeParameter = {
//   width: 1,
//   height: 1,
//   widthSegments: 4,
//   heightSegments: 4,
// };

// const segmentsFolder = pane.addFolder({
//   title:"segments"
// })
// const widthAndHeight = pane.addFolder({
//   title:"width - height"
// })

// widthAndHeight.addBinding(planeParameter, "width", {
//   min: 1,
//   max: 10,
//   step: 0.1,
//   label: "width",
// })
// .on("change",()=>{
// geometry = new THREE.PlaneGeometry(planeParameter.width , planeParameter.height , planeParameter.widthSegments , planeParameter.height);
// cubeMesh.geometry = geometry;
// })

// widthAndHeight.addBinding(planeParameter, "height", {
//   min: 1,
//   max: 10,
//   step: 0.1,
//   label: "height",
// })
// .on("change",()=>{
// geometry = new THREE.PlaneGeometry( planeParameter.width , planeParameter.height , planeParameter.widthSegments , planeParameter.height);
// cubeMesh.geometry = geometry;
// })

// segmentsFolder.addBinding(planeParameter, "widthSegments", {
//   min: 1,
//   max: 10,
//   step: 0.1,
//   label: "widthSegments",
// })
// .on("change",()=>{
// geometry = new THREE.PlaneGeometry( planeParameter.width , planeParameter.height , planeParameter.widthSegments , planeParameter.height);
// cubeMesh.geometry = geometry;
// })

// segmentsFolder.addBinding(planeParameter, "heightSegments", {
//   min: 1,
//   max: 10,
//   step: 0.1,
//   label: "heightSegments",
// })
// .on("change",()=>{
// geometry = new THREE.PlaneGeometry( planeParameter.width , planeParameter.height , planeParameter.widthSegments , planeParameter.heightSegments);
// cubeMesh.geometry = geometry;
// })

// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

camera.position.z = 2;
camera.position.y = 5;

const canvas = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true

const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.enableDamping = true;

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
// const maxPixelRatio = Math.min(window.devicePixelRatio , 1)
renderer.setPixelRatio(window.devicePixelRatio);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// const clock = new THREE.Clock();
// let previousTime = 0;

const renderLoop = () => {
  // const currentTime = clock.getElapsedTime();
  // const delta = currentTime - previousTime;
  // previousTime = currentTime;

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;

  // cubeMesh.scale.x = Math.sin(currentTime) * 2;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
