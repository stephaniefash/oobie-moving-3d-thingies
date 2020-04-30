import React, {Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
import './App.css';

class App extends Component {

    componentDidMount() {
        let camera, scene, renderer, controls;
        let mesh, moonMesh, moonGroup, lightGroup;

        init();
        animate();

        function init() {


            //Setting up the camera
            camera = new THREE.PerspectiveCamera(50, 1, 0.01, 500);
            camera.position.set(3, 3, -2);
            camera.lookAt(new THREE.Vector3());

            //Creating the renderer
            renderer = new THREE.WebGLRenderer();

            //Setting the background colour
            renderer.setClearColor("black", 1);
            //Set up camera controls

            controls = new OrbitControls(camera, renderer.domElement);

            //Setting up the scene
            scene = new THREE.Scene();

            //Setting up the geometry
            const geometry = new THREE.SphereGeometry(1, 32, 16);

            //load a texture to a file
            const loader = new THREE.TextureLoader()
            const texture = loader.load("https://blog.playcanvas.com/wp-content/uploads/2016/10/Earth-Color4096.jpg")

            //adding a moon
            const moonTexture = loader.load("https://2.bp.blogspot.com/-oeguWUXEM8o/UkbyhLmUg-I/AAAAAAAAK-E/kSm3sH_f9fk/s1600/elev_bump_4k.jpg")

            //Set up the material
            const material = new THREE.MeshStandardMaterial({map: texture, roughness: 1, metalness: 0})
            const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture, roughness: 1, metalness: 0})

            //Creating a light
            const light = new THREE.PointLight('white', 2)
            light.position.set(4,7,2)

            lightGroup = new THREE.Group();
            lightGroup.add(light)

            scene.add(lightGroup)
            scene.add(new THREE.PointLightHelper(light, 0.15))
            scene.add(new THREE.GridHelper(5, 15))
            scene.add(new THREE.AxesHelper(5))

            //creating the mesh
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            //Creating the moon group
            moonGroup = new THREE.Group();


            //Adding the moonmesh
            moonMesh = new THREE.Mesh(geometry, moonMaterial)
            moonMesh.position.set(2, 0, 0)
            moonMesh.scale.setScalar(0.45);

            //Add the moon mesh to the moon group
            moonGroup.add(moonMesh)

            //Add the group to the scene
            scene.add(moonGroup)

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            camera.aspect = window.innerWidth/window.innerHeight
            camera.updateProjectionMatrix();

        }

        function animate() {
            controls.update();

            //Earth rotates on its own axis
            mesh.rotation.y += 0.02;
            moonMesh.rotation.y += 0.01;
            moonGroup.rotation.y += 0.01;
            lightGroup.rotation.y -= 0.01;

            // mesh.rotate.y += 0.5;


            renderer.render(scene, camera);
            requestAnimationFrame(animate);

        }


    }

    render() {
        return (<div ref={ref => (this.mount = ref)}/>);
    }

}

export default App;
