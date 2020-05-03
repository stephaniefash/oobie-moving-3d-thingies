import React from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const Playground = () => {
  let scene, renderer, controls, camera, mesh, group;
  let path = "http://127.0.0.1:8000/src/models/warthog_skull/scene.gltf";

  init();
  animate();

  function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color("black"));

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    camera.position.z = 40; //change to 400
    camera.lookAt(new THREE.Vector3());
    group = new THREE.Group();

    scene = new THREE.Scene();
    scene.add(camera);

    let loader = new GLTFLoader();
    loader.load(path, (event) => {
      mesh =
        event.scene.children[0].children[0].children[0].children[0].children[0]
          .children[0];

      let wireframe = new THREE.WireframeGeometry(mesh.geometry);
      let line = new THREE.LineSegments(wireframe);
      line.material.depthTest = false;
      line.material.opacity = 0.25;
      line.material.transparent = true;
      line.material.color = new THREE.Color("magenta");
      group.add(line);

      group.scale.multiplyScalar(30);
      group.rotateX(180);
      scene.add(group);
    });

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    let time = performance.now() * 0.0009;

    camera.position.x = 420 * Math.cos(time);
    camera.position.z = 420 * Math.sin(time);
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  return <div />;
};

export default Playground;
