
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { SpotLight } from "three";
// console.log(RectAreaLightHelper)
const scene = new THREE.Scene()

const gui = new dat.GUI();

const textureLoader = new THREE.TextureLoader()
const albedo = textureLoader.load("./color.jpg");
const height = textureLoader.load("./height.jpg");
const metalness = textureLoader.load("./metalness.jpg");
const normal = textureLoader.load("./normal.jpg");
const roughness = textureLoader.load("./roughness.jpg");
const ambient = textureLoader.load("./ambientOcclusion.jpg");
const alpha = textureLoader.load("./alpha.jpg");
const matcapTexture = textureLoader.load("./textures/matcaps/1.png")
 

//add objects
const torusGeometry = new THREE.TorusGeometry(0.5,0.1,16,50)
const planeGeometry = new THREE.PlaneGeometry(15,15) 
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const sphereGeometry = new THREE.SphereGeometry(.5,32,32)

const material = new THREE.MeshStandardMaterial({})
const material2 = new THREE.MeshStandardMaterial({})
material.side = THREE.DoubleSide
material.roughness=0.4
const torus = new THREE.Mesh(torusGeometry,material2)
const plane = new THREE.Mesh(planeGeometry, material)
const cube = new THREE.Mesh(cubeGeometry,material2)
const sphere= new THREE.Mesh(sphereGeometry,material2)

sphere.position.set(-3,0 ,0)
torus.position.set(3,0,0)
cube.position.set(0,0,0)
plane.position.set(0,-0.5,0)
plane.rotation.x=-Math.PI/2


scene.add(cube,sphere,plane)

sphere.castShadow = true
cube.castShadow = true
plane.receiveShadow = true


//lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.3)

scene.add(ambientLight)


let spotlight = new THREE.SpotLight(0xfdf8d8, 0.3, 400, 0.8, 0.5, 1);
spotlight.target.position.set(0,0,0)
scene.add(spotlight.target) 
spotlight.shadow = new THREE.SpotLightShadow(new THREE.PerspectiveCamera(20, 1, 1, 250));
spotlight.castShadow = true;
scene.add(spotlight)









//add camera
const sizes={
    width:800,
    height:600
}
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight); 
camera.position.set(-5,3,6)

//camera.lookAt(new THREE.Vector3(1,0,3)) ;


scene.add(camera);

//add renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement )
renderer.shadowMap.enabled = true
//renderer.shadowMap.type = THREE.PCFSoftShadowMap
let prevTime = Date.now(); 

function animate() {
	
  const currTime = Date.now()
  const delta = currTime - prevTime
  prevTime = currTime
 

  requestAnimationFrame( animate );
    // mesh.rotation.x += Math.PI *0.001
  
  // mesh.rotation.z += Math.PI * 0.9
	renderer.render( scene, camera );
}
animate();
