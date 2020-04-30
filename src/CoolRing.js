import React, {Component} from "react";
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'


export default class CoolRing extends Component {


    componentDidMount() {

        let camera, lightGroup1, lightGroup2, renderer, mesh, material, controls, scene, light1, light2;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(70, 1, 0.01, 500);
            camera.position.set(3, 3, -2);
            camera.lookAt(new THREE.Vector3());

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor("white", 0.1);

            //helpers
            scene = new THREE.Scene();
            scene.add(new THREE.AxesHelper(5));


            const geometry = new THREE.TorusGeometry(2, 0.3, 12, 64);
            material = new THREE.MeshStandardMaterial({color: "green", wireframe: false, roughness: 1, metalness: 0})
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0)
            scene.add(mesh)


            lightGroup1 = new THREE.Group()
            lightGroup2 = new THREE.Group()
            light1 = new THREE.PointLight("yellow", 5, 0);
            light2 = new THREE.PointLight("red", 5, 0);

            lightGroup1.add(light1)
            lightGroup2.add(light2)

            scene.add(lightGroup1)
            scene.add(lightGroup2)

            scene.add(new THREE.PointLightHelper(light1, 0.5, "green"))
            scene.add(new THREE.PointLightHelper(light2, 0.5, "orange"))


            const triangleGeometry = new THREE.Geometry();
            geometry.vertices = [
                new THREE.Vector3(-0.5, 0.5, 0),
                new THREE.Vector3(0.5, -0.5, 0),
                new THREE.Vector3(-0.5, -0.5, 0),
                new THREE.Vector3(0.5, 0.5, 0),
            ]

            triangleGeometry.faces = [
                new THREE.Face3(0,1,3, )
            ]

            const triangleMesh = new THREE.Mesh(triangleGeometry, new THREE.MeshBasicMaterial({color:'red', side: THREE.DoubleSide}))
            scene.add(triangleMesh);


            controls = new OrbitControls(camera, renderer.domElement);


            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();


        }

        function animate() {
            controls.update();

            light1.position.set(2, 1, 1);
            light2.position.set(2, 1, 1);


            lightGroup1.rotation.x += 0.04;
            lightGroup2.rotation.x -= 0.04;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }


    }

    render() {
        return <div/>;

    }

}