
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js'



import brickscolor from "./bricks/color.jpg";
import bricksambient from "./bricks/ambientOcclusion.jpg";
import bricksnormal from "./bricks/normal.jpg";
import bricksroughness from "./bricks/roughness.jpg";
import doorcolor from "./door/color.jpg"
import doorroughness from "./door/roughness.jpg"
import doornormal from "./door/normal.jpg"
import doorambient from "./door/ambientOcclusion.jpg"
import doorheight from "./door/height.jpg"
import dooralpha from "./door/alpha.jpg"
import doormetalness from "./door/metalness.jpg"

import grassambient from "./grass/ambientOcclusion.jpg"
import grasscolor from "./grass/color.jpg"
import grassnormal from "./grass/normal.jpg"
import grassroughness from "./grass/roughness.jpg"

import roofcolor from "./textures/roof/roofColor.jpg"
import roofheight from "./textures/roof/roofDisplacement.png"
import roofroughness from "./textures/roof/roofRoughness.jpg"
import roofnormal from "./textures/roof/roofNormal.png"
//console.log(roofcolor)
const scene = new THREE.Scene()

const gui = new dat.GUI();
const parameters={
  colorA:0xff0000,
  colorB:0x57a265
}


//textures
const textureLoader = new THREE.TextureLoader()
const bricksColor = textureLoader.load(brickscolor)
const bricksAmbient = textureLoader.load(bricksambient)
const bricksNormal = textureLoader.load(bricksnormal)
const bricksRoughness = textureLoader.load(bricksroughness)

const doorColor = textureLoader.load(doorcolor)
const doorRoughness = textureLoader.load(doorroughness)
const doorNormal = textureLoader.load(doornormal)
const doorHeight = textureLoader.load(doorheight)
const doorAmbient = textureLoader.load(doorambient)
const doorAlpha = textureLoader.load(dooralpha)
const doorMetalness = textureLoader.load(doormetalness)
 

const grassAmbient = textureLoader.load(grassambient)
const grassColor = textureLoader.load(grasscolor)
const grassNormal = textureLoader.load(grassnormal)
const grassRoughness = textureLoader.load(grassroughness)

const roofColor = textureLoader.load(roofcolor)
const roofHeight = textureLoader.load(roofheight)
const roofRoughness = textureLoader.load(roofroughness)
const roofNormal = textureLoader.load(roofnormal)
//const doorHeight = textureLoader.textureLoader()

//add plane
const planeGeometry = new THREE.PlaneGeometry(30,30) 


const material = new THREE.MeshPhongMaterial({})
const material2 = new THREE.MeshPhongMaterial({color:0xb67b49})



const plane = new THREE.Mesh(planeGeometry, material)
scene.add(plane)
plane.material.map=grassColor
plane.position.set(0,0,0)
plane.rotation.x=-Math.PI/2
plane.receiveShadow = true

grassColor.repeat.set(8,8)
grassNormal.repeat.set(8,8)
grassAmbient.repeat.set(8,8)
grassRoughness.repeat.set(8,8)

grassColor.wrapS =THREE.RepeatWrapping
grassAmbient.wrapS = THREE.RepeatWrapping
grassNormal.wrapS = THREE.RepeatWrapping
grassRoughness.wrapS = THREE.RepeatWrapping

grassColor.wrapT =THREE.RepeatWrapping
grassAmbient.wrapT = THREE.RepeatWrapping
grassNormal.wrapT = THREE.RepeatWrapping
grassRoughness.wrapT = THREE.RepeatWrapping
//add house

const house = new THREE.Group()
scene.add(house)
const cubeGeometry = new THREE.BoxGeometry(5,3,4)
const coneGeometry = new THREE.ConeGeometry(4,0.5,4)

const roofMaterial = new THREE.MeshStandardMaterial({color:0xdec3ae})
const cube = new THREE.Mesh(cubeGeometry,material2)
const roof = new THREE.Mesh(coneGeometry,roofMaterial )


roofMaterial.roughness = 1

house.add(cube,roof)

cube.position.y=plane.position.y+1.5+0.01
cube.material.map = bricksColor
cube.material.normalMap = bricksNormal
cube.material.roughnessMap = bricksNormal
cube.material.normalScale =  new THREE.Vector3(5,5)
cube.material.roughness = 1;
//cube.material.color = 0xf58c0c

roof.position.y=cube.position.y+1.7
roof.rotation.y=Math.PI/4
roof.castShadow = true

roof.material.map = roofColor
roof.material.normalMap = roofNormal
//roof.material.displacementMap = roofHeight
// cone.material.roughnessMap = roofRoughness
//gui.add(roof.material,'displacementScale',-3,3,0.01)


//door
const doorGeometry = new THREE.PlaneGeometry(2,2,100,100)
const doorMaterial = new THREE.MeshStandardMaterial({color:0xaa5353})
const door = new THREE.Mesh(doorGeometry,doorMaterial) 

door.rotation.y=-Math.PI/2

door.position.x=-2.5-0.001
door.position.y =0.9
house.add(door)
door.material.side = THREE.DoubleSide
door.material.map = doorColor
door.material.transparent = 1
door.material.alphaMap = doorAlpha

door.material.roughnessMap = doorRoughness
door.material.roughness = 0.1
door.material.normalMap = doorNormal
door.material.normalScale = new THREE.Vector3(9,9)
door.material.displacementMap = doorHeight
door.material.displacementScale = 0.1

door.material.metalnessMap = doorMetalness
door.metalness = 1
//for ambient occlusion map
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
)
 //bushes


const bushMaterial =new THREE.MeshStandardMaterial({color:parameters.colorB});
const bush1= new THREE.Mesh(new THREE.SphereGeometry(.45,32,32),
                            bushMaterial)
const bush2 = new THREE.Mesh(new THREE.SphereGeometry(.4,32,32),
                            bushMaterial)
const bush3 = new THREE.Mesh(new THREE.SphereGeometry(.3,32,32),
                            bushMaterial)
const bush4 = new THREE.Mesh(new THREE.SphereGeometry(.35,32,32),
                            bushMaterial)
bush1.position.set(-3.29,0.18,2.24)
bush2.position.set(-2.85,0.18,-1.55)
bush3.position.set(-3.18,0.18,-0.79)
bush4.position.set(-2.85,0.18,1.81)
scene.add(bush1,bush2,bush3,bush4)

gui.addColor(parameters,'colorB')
    .onChange(()=>{
      bushMaterial.color.set(parameters.colorB)
    })




//graves
const gravesGeometry = new THREE.BoxGeometry(0.2,0.8,0.6)
const gravesMaterial = new THREE.MeshPhongMaterial()
//const grave = new THREE.Mesh(gravesGeometry,gravesMaterial)
//grave.position.set(-4.8,0.51,1.16)

//scene.add(grave)
for(let i=0;i<50;i++){
    let angle = Math.random()*Math.PI *2
    let radius = Math.random() * (15-5) + 5
    let x = Math.sin(angle) *radius
    let y = Math.cos(angle) * radius
   
    const grave = new THREE.Mesh(gravesGeometry,gravesMaterial)
    grave.position.set(x,0.31,y)
    grave.rotation.y = (Math.random() -0.5)/2
    grave.rotation.z = (Math.random()-0.5)/3
    grave.rotation.x = (Math.random()-0.5)/3
    
    grave.castShadow =true
    scene.add(grave)
}


// gui.add(grave.position,'x',-5,5,0.01)
// gui.add(grave.position,'y',-5,5,0.01)
// gui.add(grave.position,'z',-5,5,0.01)







//lights

//can take help in ambient light color gui
//https://threejsfundamentals.org/threejs/lessons/threejs-lights.html

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}
const color=0x7d7d7d
const ambientLight = new THREE.AmbientLight(color,0.2)
scene.add(ambientLight)
 
const pointLight = new THREE.PointLight(0xfad27a,1.5,4)
pointLight.position.set(-3.72,2.67,0.4)
gui.add(pointLight.position,'x',-5,5,0.01)
gui.add(pointLight.position,'y',-5,5,0.01)
gui.add(pointLight.position,'z',-5,5,0.01)

//const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLight)

gui.addColor(
  new ColorGUIHelper(ambientLight, 'color'), 'value')
  .name('ambient color');
gui.add(ambientLight,'intensity',0,5,0.01).name('intensity')

//fog
const fogCol=0x252525
const fog= new THREE.Fog(fogCol,8,15)
scene.fog=fog

gui.addColor(
  new ColorGUIHelper(fog, 'color'), 'value')
  .name('fog color');


//ghosts

const ghost1 = new THREE.PointLight('#ff00ff',1,3)
const ghost2 = new THREE.PointLight('#00ffff',2,3)
const ghost3 = new THREE.PointLight('#ffff00',2,3)
scene.add(ghost1,ghost2,ghost3)

//shadows
ghost1.castShadow =true
ghost2.castShadow=true
ghost3.castShadow =true

pointLight.castShadow =true

bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

plane.receiveShadow =true

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
renderer.shadowMap.type = THREE.PCFSoftShadowMap
//let prevTime = Date.now(); 
const clock = new THREE.Clock()
function animate() {
	
  // const currTime = Date.now()
  // const delta = currTime - prevTime
  // prevTime = currTime
  const elapsedTime = clock.getElapsedTime()
 
  const ghostAngle = -elapsedTime * 1.5
  
  ghost1.position.x = Math.sin(ghostAngle) *5
  ghost1.position.z = Math.cos(ghostAngle) *5
  ghost1.position.y = Math.sin(ghostAngle *2)

   
  ghost2.position.x = Math.sin(ghostAngle/2) *4
  ghost2.position.z = Math.cos(ghostAngle/2) *4
  ghost2.position.y = Math.sin(ghostAngle *3) +Math.sin(ghostAngle *4)

  
  ghost3.position.x = Math.sin(-ghostAngle) *8
  ghost3.position.z = Math.cos(-ghostAngle) *3
  ghost3.position.y = Math.sin(ghostAngle *2) + Math.sin(ghostAngle * 3) //to get more randomness
  //const z =
  

  requestAnimationFrame( animate );
    // mesh.rotation.x += Math.PI *0.001
  
  // mesh.rotation.z += Math.PI * 0.9
	renderer.render( scene, camera );
}

renderer.setClearColor(0x020202)
animate();




