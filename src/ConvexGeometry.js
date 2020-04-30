import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ConvexGeometry = () => {
  let group, camera, scene, renderer, boxArray;

  useEffect(() => {
    init();
    animate();
  });

  const init = () => {
    scene = new THREE.Scene();
    group = new THREE.Group();
    boxArray = [];

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(15, 20, 140);
    scene.add(camera);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10000;
    controls.maxPolarAngle = Math.PI;


    scene.add(new THREE.AmbientLight("red"));
    const light = new THREE.PointLight("green", 2);
    camera.add(light);

    generateBoxes();
    window.addEventListener("resize", onWindowResize, false);
  };

  const generateBoxes = () => {
    [...Array(400)].fill().forEach((value, index) => {
        let boxGeometry = new THREE.BoxGeometry(10, 16, 16);
        let boxMaterial = new THREE.MeshBasicMaterial({
            color: getRandomColor()
        });

      let box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(
        getRandomPosition(),
        getRandomPosition(),
        getRandomPosition()
      );
      group.add(box);
      boxArray.push(box);
    });
    scene.add(group);
  };

  const getRandomPosition = () =>
    Math.floor(Math.random() * (20 + 20 + 1)) - 20;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const  onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.y += 0.01;
    render();
  }

  const render= () =>  {
    renderer.render(scene, camera);
  }

  return <div />;
};

export default ConvexGeometry;
