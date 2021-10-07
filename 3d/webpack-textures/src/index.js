
import * as THREE from "three";


const scene = new THREE.Scene()


const manager = new THREE.LoadingManager()
  manager.onStart=()=>{
    console.log("start")
  }
  manager.onLoaded=()=>{
    console.log("onloaded")
  }
  manager.onProgress=(url,itemsLoaded)=>{
    console.log("progress")
  }
  manager.onError=(url)=>{
    console.log("loaded")
  }



const textureLoader = new THREE.TextureLoader()
const albedo = textureLoader.load("./color.jpg");
const height = textureLoader.load("./height.jpg");
const metalness = textureLoader.load("./metalness.jpg");
const normal = textureLoader.load("./normal.jpg");
const roughness = textureLoader.load("./roughness.jpg");
const ambient = textureLoader.load("./ambientOcclusion.jpg");
const alpha = textureLoader.load("./alpha.jpg");

 albedo.repeat.x=2;
albedo.repeat.y=3
// albedo.wrapS=THREE.RepeatWrapping
// albedo.wrapT=THREE.RepeatWrapping
albedo.wrapS=THREE.MirrorRepeatWrapping
albedo.wrapT=THREE.MirrorRepeatWrapping
//albedo.offset.x = 0.5
//albedo.rotation=1 * Math.PI/2
albedo.center.x=0.5
albedo.center.y=0.5
//add mesh

//console.log(texture2)
//color:0xffffff

//albedo.minFilter=THREE.NearestFilter
albedo.minFilter=THREE.LinearFilter
//NearestMipmapNearestFilter
//NearestMipmapLinearFilter
//LinearMipmapNearestFilter
//LinearMipmapLinearFilter

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({map:albedo});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.y=Math.PI*.25
mesh.rotation.x=Math.PI*.25
scene.add(mesh);

const imag="./alpha.jpg"
console.log(imag)
//add camera
const sizes={
    width:800,
    height:600
}
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight); 
camera.position.z = 1;
//camera.lookAt(new THREE.Vector3(1,0,3)) ;


scene.add(camera);

//add renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild( renderer.domElement );

let prevTime = Date.now(); 

function animate() {
	
  const currTime = Date.now()
  const delta = currTime - prevTime
  prevTime = currTime

  //mesh.rotation.y += delta *0.0001 * Math.PI *2
  // albedo.offset.x += 0.01
  //albedo.rotation=0.01
  requestAnimationFrame( animate );
    // mesh.rotation.x += Math.PI *0.001
  
  // mesh.rotation.z += Math.PI * 0.9
	renderer.render( scene, camera );
}
animate();




