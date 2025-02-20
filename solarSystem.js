import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const loader = new THREE.TextureLoader();
loader.load("/solar-system-textures/8k_stars_milky_way.jpg", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture; 
});

const textureLoader = new THREE.TextureLoader();

const sunTexture = textureLoader.load("/solar-system-textures/8k_sun.jpg");
const marsTexture = textureLoader.load("/solar-system-textures/8k_mars.jpg");
const mercuryTexture = textureLoader.load(
  "/solar-system-textures/8k_mercury.jpg"
);
const venusTexture = textureLoader.load(
  "/solar-system-textures/4k_venus_atmosphere.jpg"
);
const earthTexture = textureLoader.load(
  "/solar-system-textures/8k_earth_daymap.jpg"
);
const moonTexture = textureLoader.load("/solar-system-textures/8k_moon.jpg");
const jupiterTexture = textureLoader.load(
  "/solar-system-textures/8k_jupiter.jpg"
);
const neptuneTexture = textureLoader.load(
  "/solar-system-textures/2k_neptune.jpg"
);
const uranusTexture = textureLoader.load(
  "/solar-system-textures/2k_uranus.jpg"
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
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
sun.rotation.y = 20;
scene.add(sun);

const planets = [
  {
    name: "mercury",
    radius: 0.4,
    distance: 10,
    speed: 0.01415,
    material: mercuryMaterial,
    moons: [],
    type: "texture",
  },
  {
    name: "venus",
    radius: 0.6,
    distance: 18.7,
    speed: 0.010162,
    material: venusMaterial,
    moons: [],
    type: "texture",
  },
  {
    name: "earth",
    radius: 0.8,
    distance: 25.8,
    speed: 0.0091,
    material: earthMaterial,
    type: "texture",
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
    radius: 0.5,
    distance: 39,
    speed: 0.0085,
    type: "texture",
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
  {
    name: "Jupiter",
    radius: 2,
    distance: 60,
    speed: 0.006044,
    type: "texture",
    material: jupiterMaterial,
    moons: [
      {
        name: "io",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Europa",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Uranus",
    radius: 1,
    distance: 100,
    speed: 0.004023,
    type: "texture",
    material: uranusMaterial,
    moons: [
      {
        name: "Miranda",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Ariel",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Neptune",
    radius: 1,
    distance: 120,
    speed: 0.003018,
    type: "texture",
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Naiad",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "saturn",
    radius: 1.7,
    distance: 80,
    speed: 0.005032,
    url: "/solar-system-textures/saturn.glb",
    type: "model",
    moons: [
      {
        name: "Titan",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Enceladus",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
];

let planetsArray = [];

planets.map((item) => {
  if (item.type == "texture") {
    const planeMesh = new THREE.Mesh(sphereGeometry, item.material);

    planeMesh.scale.setScalar(item.radius);
    planeMesh.position.x = item.distance;

    item.moons.forEach((moon) => {
      const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);

      moonMesh.scale.setScalar(moon.radius);
      moonMesh.position.x = moon.distance;

      planeMesh.add(moonMesh);
    });

    scene.add(planeMesh);
    planetsArray.push(planeMesh);
  } else {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(item.url, (loadedModel) => {
      const sceneGltf = loadedModel.scene;
      sceneGltf.position.x = item.distance;
      sceneGltf.scale.setScalar(item.radius);
      const material = sceneGltf.children[0].material;
      material.envMapIntensity = 1;

      item.moons.forEach((moon) => {
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);

        moonMesh.scale.setScalar(moon.radius);
        moonMesh.position.x = moon.distance;

        sceneGltf.add(moonMesh);
      });

      scene.add(sceneGltf);
      planetsArray.push(sceneGltf);
    });
  }
});

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 700);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);

camera.position.y = 60;
camera.position.x = -40;

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
  planetsArray?.forEach((planet, index) => {
    if (planet) {
      planet.rotation.y += planets[index].speed;
      planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
      planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;

      if (planet.type !== "Group") {
        planet.children.forEach((moon, moonIndex) => {
          moon.rotation.y += planets[index].moons[moonIndex]?.speed;
          moon.position.x =
            Math.sin(moon.rotation.y) *
            planets[index].moons[moonIndex]?.distance;
          moon.position.z =
            Math.cos(moon.rotation.y) *
            planets[index].moons[moonIndex]?.distance;
        });
      } else {
        let modelIndexCounter = 0;
        planet.children.forEach((moon) => {
          if (!moon.name) {
            moon.rotation.y += planets[index].moons[modelIndexCounter]?.speed;
            moon.position.x =
              Math.sin(moon.rotation.y) *
              planets[index].moons[modelIndexCounter]?.distance;
            moon.position.z =
              Math.cos(moon.rotation.y) *
              planets[index].moons[modelIndexCounter]?.distance;
            modelIndexCounter++;
          }
        });
      }
    }
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
