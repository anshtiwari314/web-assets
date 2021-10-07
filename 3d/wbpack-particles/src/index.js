import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import * as pinkCircle from "./textures/particles/2.png"


const scene = new THREE.Scene();
const gui = new dat.GUI()
const parameters={
    colorA:0xff0000
}

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight );
camera.position.set(6,6,8)
scene.add( camera );

const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

//textures
const loader = new THREE.TextureLoader()
const texture1=loader.load(pinkCircle)


//geometry
const sphereGeometry= new THREE.SphereGeometry(3,32,32)
const particleMaterial = new THREE.PointsMaterial({})
const sphere = new THREE.Points(sphereGeometry,particleMaterial)
particleMaterial.size =5
particleMaterial.sizeAttenuation = true


const planeGeometry = new THREE.PlaneGeometry(15,15)
const planeMaterial = new THREE.MeshStandardMaterial({color:0x3efce3})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = -Math.PI/2
plane.position.y=-3
//scene.add(plane)

const particleGeometry = new THREE.BufferGeometry()
const count =1000
const positions= new Float32Array(count*3)
const colors =  new Float32Array(count*3)
for(let i=0;i<count*3;i++){
    positions[i] = (Math.random()-0.5) *100
    colors[i] = Math.random()
}
particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions,3)
)
particleGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors,3)
)
particleMaterial.map=texture1
particleMaterial.transparent = true
particleMaterial.alphaMap = texture1
//particleMaterial.alphaTest=0.001
//particleMaterial.depthTest=false
particleMaterial.depthWrite = false
particleMaterial.vertexColors = true
particleMaterial.blending=THREE.AdditiveBlending
scene.add(new THREE.Points(particleGeometry,particleMaterial))


//lights
const ambientLight = new THREE.AmbientLight(0xf0f0f0,10)
const pointLight = new THREE.PointLight(0x124155,2)
scene.add(pointLight,ambientLight)
console.log(camera.position)
//camera.lookAt(new THREE.Vector3(0,0,0))

gui.add(camera.position,'x',-50,50,1)
gui.add(camera.position,'y',-50,50,1)
gui.add(camera.position,'z',-50,50,1)
gui.addColor(parameters,'colorA').onChange(()=>{
    pointLight.color.set(parameters.colorA)
})


//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight )


//orbital controls
const controls = new OrbitControls(camera,renderer.domElement)

document.body.appendChild(renderer.domElement)
const clock =new THREE.Clock()
console.log()
function animate(){
    const elapsedTime =clock.getElapsedTime()
    
    for(let i=0;i<count;i++){
        let j=3*i
       const x=particleGeometry.attributes.position.array[j]
        particleGeometry.attributes.position.array[j+1]
        = Math.sin(elapsedTime+x)*10
      
    }
    particleGeometry.attributes.position.needsUpdate =true
    renderer.render(scene,camera)
    requestAnimationFrame(animate)
    
    

}

animate();


//console.log(OrbitControls())
