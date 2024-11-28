import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { Pane } from "tweakpane";

const pane = new Pane();

const scene = new THREE.Scene();
const canvas = document.querySelector(".canvas");

let geometry = new THREE.SphereGeometry(0.6, 50 , 50);
let planeGeometry = new THREE.PlaneGeometry(10 , 10);
let cubeGeometry = new THREE.BoxGeometry(1,1,1);

const cubeMaterial = new THREE.MeshStandardMaterial();
// cubeMaterial.shininess = 100

// const textureLoader = new THREE.TextureLoader()
// const testAlbedo = textureLoader.load("/brick-wall-bl1/brick-wall_albedo.png")
// const testAo = textureLoader.load("/brick-wall-bl1/brick-wall_ao.png")
// const testHeight = textureLoader.load("/brick-wall-bl1/brick-wall_height.png")
// const testMetallic = textureLoader.load("/brick-wall-bl1/brick-wall_metallic.png")
// const testNormal = textureLoader.load("/brick-wall-bl1/brick-wall_normal-ogl.png")
// const testRoughness = textureLoader.load("/brick-wall-bl1/brick-wall_roughness.png")

// testTexture.repeat.set(5,5)
// testTexture.wrapS = THREE.MirroredRepeatWrapping
// testTexture.wrapT = THREE.MirroredRepeatWrapping

// cubeMaterial.map = testAlbedo
// cubeMaterial.roughnessMap = testRoughness
// cubeMaterial.roughness = 1

// cubeMaterial.metalnessMap = testMetallic
// cubeMaterial.metalness = 1

// cubeMaterial.normalMap = testNormal

// cubeMaterial.displacementMap = testHeight
// cubeMaterial.displacementScale = 0.1

// cubeMaterial.aoMap = testAo
// cubeMaterial.aoMapIntensity = 1.5

// pane.addBinding(cubeMaterial , "aoMapIntensity" , {
//   min:0 ,
//   max:5, 
//   step:0.1,
// })

const sphereMesh = new THREE.Mesh(geometry, cubeMaterial);
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const planeMesh = new THREE.Mesh(planeGeometry, cubeMaterial);
sphereMesh.position.set(2,3,0)
planeMesh.position.set(-2,0,0)
planeMesh.rotation.set(0,2,0)
cubeMesh.castShadow = true
sphereMesh.castShadow = true
planeMesh.receiveShadow = true
scene.add(cubeMesh , sphereMesh , planeMesh);

// const fog = new THREE.Fog("black",1 , 10)
// scene.fog = fog


const spotLight = new THREE.SpotLight("lightGreen" , 15)
spotLight.position.set(5,3,0)
spotLight.target.position.set(0,2,0)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 4096
spotLight.shadow.mapSize.height = 4096
scene.add(spotLight)

// const rectAreaLight = new THREE.RectAreaLight("blue" , 1.5 , 50 , 3)
// rectAreaLight.position.set(0,2,0)
// scene.add(rectAreaLight)

// const directionalLight = new THREE.DirectionalLight("white" , 0.5)
// directionalLight.position.set(1,0,0)
// directionalLight.castShadow = true
// scene.add(directionalLight)

// const hemisphereLight = new THREE.HemisphereLight("red" , "blue" , 0.5)
// scene.add(hemisphereLight)

const light = new THREE.AmbientLight("gray" , 0.1)
// light.position.set(1,1,1)
scene.add(light)

// const light2 = new THREE.PointLight("white" , 1)
// light2.position.set(2,2,0)
// light2.castShadow = true
// scene.add(light2)

const helper = new THREE.SpotLightHelper(spotLight)
scene.add(helper)

// const vertices = new Float32Array([0,0,0,0,2,0,2,0,0])
// const bufferAttribute = new THREE.BufferAttribute(vertices ,3)

// const bufferGeometry = new THREE.BufferGeometry()
// bufferGeometry.setAttribute("position" , bufferAttribute)

// const cubeMesh = new THREE.Mesh(bufferGeometry, cubeMaterial);
// scene.add(cubeMesh);


// cubeMesh.rotation.x = Math.PI * 0.3
// const tempVector = new THREE.Vector3(0,1,0)
// cubeMesh.position.copy(tempVector)

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)

const aspectRatio = window.innerWidth / window.innerHeight;

// const camera = new THREE.OrthographicCamera(
//  -1 * aspectRatio, // left
//   1 * aspectRatio, // right
//   1 * aspectRatio, // top
//   -1 * aspectRatio, // bottom
//   0.1, // near
//   1000 // far
// );

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

renderer.setSize(window.innerWidth, window.innerHeight);

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const clock = new THREE.Clock();
let previousTime = 0;

const renderLoop = () => {
  // const curentTime = clock.getElapsedTime()
  // const delta = curentTime - previousTime
  // previousTime = curentTime

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
