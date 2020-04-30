import React, {Component} from 'react';
import './App.css';
import * as THREE from "three"

class Light extends Component {

    componentDidMount() {

        let camera, scene, renderer;
        let mesh;
        let AMOUNT = 6;

        init();
        animate();

        function init() {

            let ASPECT_RATIO = window.innerWidth / window.innerHeight;
            let WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio;
            let HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio;

            let cameras = [];

            for (let y = 0; y < AMOUNT; y++) {

                for (let x = 0; x < AMOUNT; x++) {

                    let subcamera = new THREE.PerspectiveCamera(35, ASPECT_RATIO, 0.1, 10);
                    subcamera.viewport = new THREE.Vector4(Math.floor(x * WIDTH), Math.floor(y * HEIGHT), Math.ceil(400), Math.ceil(200));
                    console.log(Math.floor(x * WIDTH) + "," + Math.floor(y * HEIGHT) + "," + Math.ceil(WIDTH) + "," + Math.ceil(HEIGHT));
                    subcamera.position.x = (x / AMOUNT) - 0.5;
                    subcamera.position.y = 0.5 - (y / AMOUNT);
                    subcamera.position.z = 1.5;
                    subcamera.position.multiplyScalar(2);
                    subcamera.lookAt(0, 0, 0);
                    subcamera.updateMatrixWorld();
                    cameras.push(subcamera);

                }

            }

            camera = new THREE.ArrayCamera(cameras);
            camera.position.z = 30;

            scene = new THREE.Scene();

            scene.add(new THREE.AmbientLight(0x222244));

            let light = new THREE.DirectionalLight();
            light.position.set(0.5, 0.5, 1);
            light.castShadow = true;
            light.shadow.camera.zoom = 4;
            scene.add(light);

            let backgroundGeometry = new THREE.PlaneBufferGeometry(100, 100);
            let backgroundMaterial = new THREE.MeshPhongMaterial({color: "#00bcd4"});

            let background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
            background.receiveShadow = true;
            background.position.set(0, 0, -1);
            scene.add(background);

            let geometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 32);


            let material = new THREE.MeshPhongMaterial({color: "#ff5722"});

            mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            document.body.appendChild(renderer.domElement);
        }


        function animate() {
            mesh.rotation.x += 0.06;
            mesh.rotation.z += 0.04;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)}/>
        );
    }

}

export default Light;
