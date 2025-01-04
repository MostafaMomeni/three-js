import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const canvas = document.querySelector(".canvas");

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
// cubeTextureLoader.setPath("/bg")

const sunTexture = textureLoader.load("/denim-bl/denim1_albedo.png")
const earthTexture = textureLoader.load("/solar-system-textures/8k_earth_daymap.jpg")
const moonTexture = textureLoader.load("/brick-wall-bl1/brick-wall_albedo.png")
const marsTexture = textureLoader.load("/layered-planetary-bl/layered-planetary_albedo.png")

const backgroundTexture = cubeTextureLoader.load([
  "/bg/px.png",
  "/bg/nx.png",
  "/bg/py.png",
  "/bg/ny.png",
  "/bg/pz.png",
  "/bg/nz.png"
])

scene.background = backgroundTexture

const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map:earthTexture});
const moonMaterial = new THREE.MeshStandardMaterial({ map:moonTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map:marsTexture });


const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);

const planets = [
  {
    name:"Earth",
    radius: 0.5 ,
    distance: 7,
    speed: 0.005,
    material: earthMaterial,
    moon:[
      {
        name:"Moon",
        radius: 0.3 ,
        distance: 3,
        speed: 0.015,
      }
    ]
  },
  {
    name:"Mars",
    radius: 0.2 ,
    distance: 3,
    speed: 0.01,
    material: marsMaterial,
    moon:[]
  }
]

const planetMesh = planets.map(item => {
  const planetMesh = new THREE.Mesh(sphereGeometry , item.material)
  planetMesh.scale.setScalar(item.radius);
  planetMesh.position.x = item.distance;
  
  item.moon.forEach(moon => {
    const moonMesh = new THREE.Mesh(sphereGeometry , moonMaterial)
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    planetMesh.add(moonMesh)
  })

  sun.add(planetMesh)

  return planetMesh
})

scene.add(sun);

const ambientLight = new THREE.AmbientLight(0xffffff , 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffff00 , 1500)
scene.add(pointLight)

const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 1000);
camera.position.z = 100;
camera.position.y = 5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(window.innerWidth, window.innerHeight);

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const renderLoop = () => {

    planetMesh.forEach((planet , index)=>{
      planet.rotation.y += planets[index].speed
      planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance
      planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance
      planet.children.forEach((moon , moonIndex) => {
        moon.rotation.y += planets[index].moon[moonIndex].speed
        moon.position.x = Math.sin(moon.rotation.y) * planets[index].moon[moonIndex].distance
        moon.position.z = Math.cos(moon.rotation.y) * planets[index].moon[moonIndex].distance
      })
    })

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(renderLoop);
};

renderLoop();
 