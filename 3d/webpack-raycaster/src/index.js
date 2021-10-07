import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import * as pinkCircle from "./textures/particles/5.png"


const scene = new THREE.Scene();
const gui = new dat.GUI({width:300})
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}


const camera = new THREE.PerspectiveCamera( 70, sizes.width/sizes.height );
camera.position.set(0,0,5)
scene.add( camera );

window.addEventListener('resize',()=>{
    sizes.width =window.innerWidth
    sizes.height= window.innerHeight

    //update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height )
})

//axes helper

const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

//geometry
const sphereGeometry1 = new THREE.SphereGeometry(1.5,32,32)
const sphereGeometry2 = new THREE.SphereGeometry(1.8,32,32)
const sphereGeometry3 = new THREE.SphereGeometry(1.3,32,32)
const sphereMaterial1 = new THREE.MeshStandardMaterial({color:'pink'})
const sphereMaterial2 = new THREE.MeshStandardMaterial({color:'pink'})
const sphereMaterial3 = new THREE.MeshStandardMaterial({color:'pink'})
const sphere1 = new THREE.Mesh(sphereGeometry1,sphereMaterial1)
const sphere2 = new THREE.Mesh(sphereGeometry1,sphereMaterial2)
const sphere3 = new THREE.Mesh(sphereGeometry1,sphereMaterial3)
sphere1.position.x=-4
sphere3.position.x=4
scene.add(sphere1,sphere2,sphere3)

// raycaster
 const raycaster = new THREE.Raycaster()
 const mouse = new THREE.Vector2()
// const rayOrigin=new THREE.Vector3(-7,0,0)
// const rayDirection=new THREE.Vector3(10,0,0)
// rayDirection.normalize()
// raycaster.set(rayOrigin,rayDirection)

//intersectObject
//intersectsbjects for multiple objects

// const intersectsObjects = raycaster.intersectObject(sphere1)
// console.log(intersectsObjects)

    window.addEventListener('mousemove',(event)=>{
                
       mouse.x= (event.clientX/sizes.width)*2-1
       mouse.y= (event.clientY/sizes.height)*2-1
    })



//lights
const ambientLight = new THREE.AmbientLight(0xff00ff,10)
//const pointLight = new THREE.PointLight(0x124155,2)
scene.add(ambientLight)

//camera.lookAt(new THREE.Vector3(0,0,0))




//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width,sizes.height )


//orbital controls
const controls = new OrbitControls(camera,renderer.domElement)

document.body.appendChild(renderer.domElement)

//animate
const clock =new THREE.Clock()
console.log()
function animate(){





    const elapsedTime =clock.getElapsedTime()
    
    
    sphere1.position.y=Math.sin(elapsedTime*0.5)*5
    sphere2.position.y=Math.sin(elapsedTime*0.8)*5
    sphere3.position.y=Math.sin(elapsedTime*0.3)*5
    renderer.render(scene,camera)

    //cast a ray
//     const raycaster=new THREE.Raycaster()
//     const rayOrigin = new THREE.Vector3(-7,0,0)
//     const rayDirection=new THREE.Vector3(10,0,0)
//     rayDirection.normalize()
//     raycaster.set(rayOrigin,rayDirection)

    const arrayOfobjects = [sphere1,sphere2,sphere3]
    const intersectObjects = raycaster.intersectObjects(arrayOfobjects)

    raycaster.setFromCamera(mouse,camera)
   // console.log(intersectObjects.length)
    for(let mesh of arrayOfobjects){
        mesh.material.color.set('pink')
    }
    for(let intersect of intersectObjects){
       intersect.object.material.color.set('blue')
      // console.log(intersectObjects.length)
    }
    requestAnimationFrame(animate)
    
    

}

animate();


//console.log(OrbitControls())
