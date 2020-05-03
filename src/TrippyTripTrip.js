import React, { useEffect } from "react";
import * as THREE from "three";
import { AnaglyphEffect } from "three/examples/jsm/effects/AnaglyphEffect";

const TrippyTripTrip = () => {
  let camera, scene, renderer, effect;

  let spheres = [];

  let mouseX = 0;
  let mouseY = 0;

  let { innerWidth, innerHeight } = window;

  let windowHalfX = innerWidth / 2;
  let windowHalfY = innerHeight / 2;

  document.addEventListener("mousemove", onDocumentMouseMove, false);

  useEffect(() => {
    init();
    animate();
  });

  function init() {
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );
    camera.position.z = 3;
    camera.focalLength = 3;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    let path = "http://127.0.0.1:8000/src/images/";

    let sphereUrls = [
      path + "px.png",
      path + "nx.png",
      path + "py.png",
      path + "ny.png",
      path + "pz.png",
      path + "nz.png",
    ];

    let urls = [
      path + "art.jpg",
      path + "art.jpg",
      path + "art.jpg",
      path + "art.jpg",
      path + "art.jpg",
      path + "art.jpg",
    ];

    let loader = new THREE.CubeTextureLoader();
    loader.setCrossOrigin("anonymous");

    let textureCube = loader.load(urls);
    let smallSphereTexture = loader.load(sphereUrls);

    scene = new THREE.Scene();
    scene.background = textureCube;

    let geometry = new THREE.SphereBufferGeometry(0.1, 32, 16);
    let material = new THREE.MeshBasicMaterial({
      envMap: smallSphereTexture,
    });

    for (let i = 0; i < 500; i++) {
      let mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = Math.random() * 10 - 5;
      mesh.position.y = Math.random() * 10 - 5;
      mesh.position.z = Math.random() * 10 - 5;

      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

      scene.add(mesh);
      spheres.push(mesh);
    }

    effect = new AnaglyphEffect(renderer);
    effect.setSize(innerWidth, innerHeight);

    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    windowHalfX = innerWidth / 2;
    windowHalfY = innerHeight / 2;

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize(innerWidth, innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;

    console.log("client", event.clientX);
    console.log("Screen", event.screenX);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  const render = () => {
    let timer = 0.0001 * Date.now();

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    spheres.forEach((sphere, index) => {
      sphere.position.x = 5 * Math.cos(timer + index);
      sphere.position.y = 5 * Math.sin(timer + index * 1.1);
    });

    effect.render(scene, camera);
  };

  return <div />;
};

export default TrippyTripTrip;
