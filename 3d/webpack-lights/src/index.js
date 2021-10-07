
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
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
plane.position.set(0,-2,0)
plane.rotation.x=-Math.PI/2
scene.add(cube,sphere,plane,torus)


//lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.3)

scene.add(ambientLight)
 
const directionalLight = new THREE.DirectionalLight(0xff00ff,0.4)
const directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
directionalLight.position.set(4,5,0)
//directionalLight.target.position.set(0, 0, 0);


const pointLight = new THREE.PointLight(0xd4912a,0.3) 
pointLight.position.set(0,0,3)
scene.add(directionalLight,directionalHelper,pointLight)

// const hemisphereLight = new THREE.HemisphereLight(0x45b7e3,0x45e360,0.3)
// scene.add(hemisphereLight)

// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff,3,2,2)
// scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00,1,10,Math.PI,0.25,1)
spotLight.position.set(0,3,-2)
spotLight.target.position.x=-1.75
scene.add(spotLight.target)
scene.add(spotLight)
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




