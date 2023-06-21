import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
/* import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'  
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import chroma from "chroma-js" */

 function init() {

        
        var scene = new THREE.Scene();
        //\scene.fog = new THREE.Fog(0xaaaaaa, 0.010, 200);

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        //renderer.setClearColor(new THREE.Color(0xaaaaff, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;       

        // create the ground plane
        var textureGrass = new THREE.TextureLoader().load("FB_IMG.jpg");
        textureGrass.offset.x = 90/(300*Math.PI);
        textureGrass.offset.y = 90/(300*Math.PI);

        
        var planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 5);
        
        var planeMaterial = new THREE.MeshLambertMaterial({map: textureGrass });

        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        //plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;  


        // add the plane to the scene
        scene.add(plane);
        var planeGeometry2 = new THREE.PlaneGeometry(100, 30, 10, 10);
        var pavementTexture = new THREE.TextureLoader().load("pavement-texture-png.jpg");
        var plane2 = new THREE.Mesh(planeGeometry2, new THREE.MeshPhongMaterial({map: pavementTexture,color: 0x8b4513
        }));
        plane2.receiveShadow = true;
        var jsonloader = require('jsonloader');
        plane2.rotation.x = -0.5 * Math.PI;
        plane2 .position.x = 15;
        plane2 .position.y = -50;
        plane2 .position.z = 15;
        scene.add(plane2 );
        
       // var file = new jsonloader('./house.json');
        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
        const tankTexture = new THREE.TextureLoader().load("brick-wall.jpg")
        //color: 0xff3333
        var cubeMaterial = new THREE.MeshLambertMaterial({map: tankTexture,color: 0xff4433});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.x = -30;
        cube.position.y = -47;
        cube.position.z = 10;
        // add the cube to the scene
        scene.add(cube);

         var clock = new THREE.Clock();
   

        var fpControls = new FirstPersonControls(camera,document.body);
        fpControls.lookSpeed = 0.01;
        fpControls.movementSpeed = 20;
        fpControls.lookVertical = true;
        fpControls.constrainVertical = true;
        fpControls.verticalMin = 1.0;
        fpControls.verticalMax = 2.0;
        fpControls.lon = -150;
        fpControls.lat = 120; 

        var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.x = 70;
        sphere.position.y = -47;
        sphere.position.z = 10;
        sphere.castShadow = true;

        // add the sphere to the scene 
        //scene.add(sphere);
        addHouseAndTree(scene)

        // position and point the camera to the center of the scene
        camera.position.x = 10;
        camera.position.y = -10;
        camera.position.z = 10;
        camera.lookAt(new THREE.Vector3(5, -5, -5));


        // add spotlight for a bit of light
        var spotLight0 = new THREE.SpotLight(0xcccccc);
        spotLight0.shadow.mapSize.set(2048, 2048);
        spotLight0.position.set(0, 1000, -10);
        spotLight0.lookAt(plane);
        scene.add(spotLight0);


        var target = new THREE.Object3D();
        target.position = new THREE.Vector3(15, -5, 0);

      
        var pointColor = "#ffffff";
      //var dirLight = new THREE.SpotLight( pointColor);
        var dirLight = new THREE.DirectionalLight(pointColor);
        dirLight.position.set(30, 10, -20);
        dirLight.castShadow = true;
        dirLight.target = plane;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 200;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        dirLight.shadow.mapSize.idth = 2048;
        dirLight.shadow.mapSize.height = 2048;


        scene.add(dirLight);
        var clock = new THREE.Clock();

        // add the output of the renderer to the html element
        document.body.append(renderer.domElement);

        // call the render function
        var step = 0;

        // used to determine the switch point for the light animation
        var invert = 1;
        var phase = 0;

        var controls = new function () {
            this.rotationSpeed = 0.03;
            this.bouncingSpeed = 0.03;

            this.hemisphere = true;
            this.color = 0x00ff00;
            this.skyColor = 0x0000ff;
            this.intensity = 0.6;

        };
          // add subtle ambient lighting
          var ambientLight = new THREE.AmbientLight("#0c0c0c");
          scene.add(ambientLight);

          // the point light where working with
          var pointColor = "#ccffcc";
          var pointLight = new THREE.PointLight(pointColor);
          pointLight.decay = 0.1

          pointLight.castShadow = true;

          scene.add(pointLight);


          // add a small sphere simulating the pointlight
          var sphereLight = new THREE.SphereGeometry(0.2);
          var sphereLightMaterial = new THREE.MeshBasicMaterial({
            color: 0xac6c25
          });
          var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
          sphereLightMesh.position = new THREE.Vector3(3, 0, 5);
          scene.add(sphereLightMesh);

          // call the render function
          var step = 0;

          // used to determine the switch point for the light animation
          var invert = 1;
          var phase = 0;
          function setupControls() {
            var controls = new function () {
            this.rotationSpeed = 0.01;
            this.bouncingSpeed = 0.03;
            this.ambientColor = ambientLight.color.getStyle();;
            this.pointColor = pointLight.color.getStyle();;
            this.intensity = 1;
            this.distance = pointLight.distance;
            };


            return controls;
        }

        var controls = setupControls();
        render();

        function render() {
            
            pointLight.position.copy(sphereLightMesh.position);

            // bounce the sphere up and down
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + ( 10 * (Math.cos(step)));
            sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));
            fpControls.update(clock.getDelta());
            
            
            // move the light simulation
            if (phase > 2 * Math.PI) {
              invert = invert * -1;
              phase -= 2 * Math.PI;
            } else {
              phase += controls.rotationSpeed;
            }
            sphereLightMesh.position.z = +(25 * (Math.sin(phase)));
            sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
            sphereLightMesh.position.y = 5;

            if (invert < 0) {
              var pivot = 14;
              sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
            }

            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        
    }
    function addHouseAndTree(scene) {

    
    createHouse(scene);
    createTree(scene);

   

    function createHouse(scene) {
     // create the ground plane
        var textureGrass = new THREE.TextureLoader().load("../stone.jpg");
        textureGrass.wrapS = THREE.RepeatWrapping;
        textureGrass.wrapT = THREE.RepeatWrapping;
        textureGrass.repeat.set(1, 1);
        textureGrass.offset.x = 90/(50*Math.PI);
        
        
        var textureGras = new THREE.TextureLoader().load("../RooftilesWood0005_2_S.jpg");
        textureGras.wrapS = THREE.RepeatWrapping;
        textureGras.wrapT = THREE.RepeatWrapping;
        textureGras.repeat.set(1, 1);
        textureGras.offset.x = 90/(50*Math.PI);
        var roof = new THREE.ConeGeometry(9, 6);
        var base = new THREE.CylinderGeometry(8, 8, 4);

        // create the mesh
        var roofMesh = new THREE.Mesh(roof, new THREE.MeshPhongMaterial({map: textureGras,
            
        }));
        var baseMesh = new THREE.Mesh(base, new THREE.MeshPhongMaterial({
    map: textureGrass,
            
        }));

        roofMesh.position.set(55, -42, 10);
        baseMesh.position.set(55, -47, 10);

        roofMesh.receiveShadow = true;
        baseMesh.receiveShadow = true;
        roofMesh.castShadow = true;
        baseMesh.castShadow = true;

        scene.add(roofMesh);
        scene.add(baseMesh);
    }

    /**
     * Add the tree to the scene
     */
    function createTree(scene) {
        var trunk = new THREE.CylinderGeometry(1, 1, 8);
        var leaves = new THREE.SphereGeometry(4);

        // create the mesh
        var trunkMesh = new THREE.Mesh(trunk, new THREE.MeshPhongMaterial({
            color: 0x8b4513
        }));
        var textureGrass = new THREE.TextureLoader().load("../Screenshot.png");
        var leavesMesh = new THREE.Mesh(leaves, new THREE.MeshPhongMaterial({map: textureGrass,
            color: 0x00ff00
        }));

        /// position the trunk. Set y to half of height of trunk
        trunkMesh.position.set(55, -47, 25);
        leavesMesh.position.set(55, -39, 25);

        trunkMesh.castShadow = true;
        trunkMesh.receiveShadow = true;
        leavesMesh.castShadow = true;
        leavesMesh.receiveShadow = true;

        scene.add(trunkMesh);
        scene.add(leavesMesh);
    }
    
}
    window.onload = init;
