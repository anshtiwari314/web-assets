
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'


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
 
//add text
const fontLoader = new THREE.FontLoader()

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
// let textGeometry 


const data ={
          size:2.0,
          height:0.2,
          curveSegments:12,
          bevelEnabled:true,
          bevelThickness:0.03,
          bevelSize:0.0002,
          bevelOffset:0,
          bevelSegments:5
}
const textMaterial = new THREE.MeshNormalMaterial({wireframe:false})
const text = new THREE.Mesh(new THREE.TextBufferGeometry(),textMaterial)
scene.add(text)

function generateGeometry(){
fontLoader.load(
     "./fonts/helvetiker_bold.typeface.json",  
     (fonts) =>{
      const textGeometry = new THREE.TextBufferGeometry(
        "hello world",
        {
          font:fonts,
          size:data.size,
          height:data.height,
          curveSegments:data.curveSegments,
          bevelEnabled:data.bevelEnabled,
          bevelThickness:data.bevelThickness,
          bevelSize:data.bevelSize,
          bevelOffset:data.bevelOffset,
          bevelSegments:data.bevelSegments
        }
       )
         
      text.geometry.dispose()
      text.geometry=textGeometry
      textGeometry.computeBoundingBox()
      
      // textGeometry.translate(
      //   - (textGeometry.boundingBox.max.x - 0.002)*0.5,
      //   - (textGeometry.boundingBox.max.y - 0.002)*0.5,
      //   - (textGeometry.boundingBox.max.z - 0.03)*0.5
      // )  
      textGeometry.center();
      console.log(textGeometry.boundingBox)
      scene.add(text)
     
       
  
    }  
      )
}    
generateGeometry()

function donutGeometry(){
  const torusGeometry = new THREE.TorusGeometry(0.4,0.1,15,50) 
  const torusMaterial = new THREE.MeshMatcapMaterial({color:0xbd6624}) 
  // const torus = new THREE.Mesh(torusGeometry,torusMaterial)
  // scene.add(torus);
  for( let i=0;i<1000;i++){
    const torus = new THREE.Mesh(torusGeometry,torusMaterial)
    torus.position.x =( Math.random() -0.5)*100
    torus.position.y =( Math.random() -0.5)*100
    torus.position.z =( Math.random() -0.5)*100
    torus.rotation.set(Math.random(),Math.random(),Math.random())
    torus.scale.set((Math.random()-0.4)*2,(Math.random()-0.4)*2,(Math.random()-0.4)*2)
    scene.add(torus);   
  }
}

donutGeometry()

const folder = gui.addFolder("properties")
folder.add(data,'size',1,100).onChange(generateGeometry)
folder.add(data,'height',1,100,).onChange(generateGeometry)
folder.add(data,'curveSegments',0,30).onChange(generateGeometry)
folder.add(data,'bevelThickness',0,1).onChange(generateGeometry)
folder.add(data,'bevelSize',0,1).onChange(generateGeometry)
folder.add(data,'bevelOffset',0,1).onChange(generateGeometry)
folder.add(data,'bevelSegments',0,10).onChange(generateGeometry)

//add camera
const sizes={
    width:800,
    height:600
}
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight); 
camera.position.z = 10;
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




