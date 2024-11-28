import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const sphereGeometry = new THREE.SphereGeometry(1 , 32 , 32);

const textureLoader = new THREE.TextureLoader();

const sunTexture = textureLoader.load(
  "public/layered-planetary-bl/layered-planetary_albedo.png"
);
const marsTexture = textureLoader.load(
  "public/alien-carnivorous-plant-bl/alien-carniverous-plant_albedo.png"
);
const mercuryTexture = textureLoader.load(
  "public/brick-wall-bl1/brick-wall_albedo.png"
);
const venusTexture = textureLoader.load("public/denim-bl/denim1_albedo.png");
const earthTexture = textureLoader.load(
  "public/gray-polished-granite-bl/gray-polished-granite_albedo.png"
);
const moonTexture = textureLoader.load(
  "public/planet_surface_Normal-bl/planet_surface_Height.png"
);

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

const planets = [
  {
    name: "mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
];

const planetMeshes = planets.map((item) => {
  const planeMesh = new THREE.Mesh(sphereGeometry, item.material);

  planeMesh.scale.setScalar(item.radius);
  planeMesh.position.x = item.distance;

  const moonsMeshes = item.moons.forEach((moon) => {
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);

    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;

    planeMesh.add(moonMesh);
  });

  scene.add(planeMesh);
  return planeMesh;
});

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 700);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

camera.position.z = 50;

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
  planetMeshes.forEach((planet, index) => {
    planet.rotation.y += planets[index].speed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;

    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[index].moons[moonIndex].speed;
      moon.position.x =
        Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
