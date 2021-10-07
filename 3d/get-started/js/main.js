// let scene,camera,renderer,geometry,material;

// scene = new THREE.Scene();

// camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth/
//     window.innerHeight,
//     0.1,
//     2000);

// renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth,window.innerHeight);
// document.body.appendChild(renderer.domElement);

// camera.position.z = 15;

//  geometry = new THREE.ConeGeometry( 5,5,32,true );
//  material = new THREE.MeshBasicMaterial( { color: 0x39d1ff } );
//  cone = new THREE.Mesh( geometry, material );
 
// scene.add(cone);



// function animate() {
// 	requestAnimationFrame( animate );
//     cone.rotation.x += 0.01;
//     cone.rotation.y += 0.01;

    
// 	renderer.render( scene, camera );
// }
// animate();

const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( .5, 20, 20);

// Materials


// Mesh and Materials



const texture = new THREE.TextureLoader().load('./NormalMap.png');
const material = new THREE.MeshStandardMaterial({normalMap:texture,roughness:0.01,metalness:0.9031});

const sphere = new THREE.Mesh(geometry,material)

scene.add(sphere)

// Light 1


const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
pointLight.intensity = 3;
scene.add(pointLight)

// Light 2

const Light2= gui.addFolder('Light 2');
const pointLight2 = new THREE.PointLight(0xeb321a)
pointLight2.position.set(-3.9,2.52,-1.31);
pointLight2.intensity = 2.7;
scene.add(pointLight2);


Light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
Light2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
Light2.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)
Light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// Light 3
const Light3= gui.addFolder('Light 3');

const pointLight3 = new THREE.PointLight(0x3c90d2)
pointLight3.position.set(6,-4.36,-2.9);
pointLight3.intensity=4.46;
scene.add(pointLight3);

Light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
Light3.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
Light3.add(pointLight3.position, 'z').min(-6).max(6).step(0.01)
Light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light3Color = {
    color : 0xff0000,
}

Light3.addColor(light3Color,'color').onChange(()=>{
    pointLight3.color.set(light3Color.color);
})
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener("mousemove",rotationEffect)

const windowX = window.innerWidth/2 
const windowY = window.innerHeight/2
let mouseX=0,mouseY=0;

function rotationEffect(event){
     mouseX = (event.clientX-windowX)
     mouseY = (event.clientY-windowY)
  
}

const clock = new THREE.Clock()

const tick = () =>
{
    let targetX= mouseX * 0.001
    let targetY= mouseY * 0.001
    const elapsedTime = clock.getElapsedTime()
    
    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    
    sphere.rotation.x =  .5 * (targetY - sphere.rotation.x)
    sphere.rotation.y =  -.5 * (targetX - sphere.rotation.y)
    sphere.rotation.z =  -.5 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    //controls.update()

    // Render
   
    renderer.render(scene, camera)
    // Call tick again on the next frame    
    window.requestAnimationFrame(tick)
}

 tick()