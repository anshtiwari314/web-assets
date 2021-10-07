
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
const matcapTexture = textureLoader.load("./textures/matcaps/1.png")
 
//add mesh



const geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100 )
const material = new THREE.MeshMatcapMaterial({});
const mesh = new THREE.Mesh(geometry, material);


const sphere = new THREE.Mesh( 
  new THREE.SphereGeometry( 1, 0.3, 10,5 ),
  new THREE.MeshBasicMaterial( { color: 0xff00ff,wireframe:true } ) 
  );

scene.add(mesh);
material.matcap = matcapTexture
//scene.add(sphere);
//material.flatShading=true





const imag="./alpha.jpg"
console.log(imag)
//add camera
const sizes={
    width:800,
    height:600
}
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight); 
camera.position.z = 3;
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
 
  mesh.rotation.y += delta *0.0001 * Math.PI *2
  sphere.rotation.y -= delta *0.0001 * Math.PI *3
  requestAnimationFrame( animate );
    // mesh.rotation.x += Math.PI *0.001
  
  // mesh.rotation.z += Math.PI * 0.9
	renderer.render( scene, camera );
}
animate();




