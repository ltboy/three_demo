import './assets/style/index.css';
import * as THREE from 'three';
import statsJs from 'stats.js';
// https://blog.csdn.net/towrabbit/article/details/80179515

//  创建场景
const scene = new THREE.Scene();
// 创建相机 参数：视角、相机拍摄面长宽比、 近裁剪面、  远裁剪面
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// 添加性能统计
const stats = new statsJs();
document.body.appendChild(stats.dom);
// 渲染场景

camera.position.x = -30;
camera.position.y = 30;
camera.position.z = 30;
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#eee');
document.body.appendChild(renderer.domElement);
//  添加坐标系
const axes = new THREE.AxesHelper(20);
scene.add(axes);
//  创建平台
const planeGeometry = new THREE.PlaneBufferGeometry(60, 30);
const planeMaterial = new THREE.MeshLambertMaterial({ color: '#ccc', side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

// 创建一个模型
// 模型
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
// 材料
const cubeMaterial = new THREE.MeshLambertMaterial({ color: '#f77' });
// 网孔系统
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);

// 球体
const sphereGeometry = new THREE.SphereBufferGeometry(4, 20, 20);
const sphereMeterial = new THREE.MeshLambertMaterial({ color: '#f7f' });
const sphere = new THREE.Mesh(sphereGeometry, sphereMeterial);
sphere.position.x = 18;
sphere.position.y = 4;
sphere.position.z = 2;
scene.add(sphere);

// 添加光源
const spotLight = new THREE.SpotLight('#fff');
spotLight.position.set(-40, 80, -10);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2000;
spotLight.shadow.mapSize.height = 2000;
scene.add(spotLight);

// 添加影子
renderer.shadowMap.enabled = true;
plane.receiveShadow = true;
cube.castShadow = true;
sphere.castShadow = true;

// const controls = new THREE.TrackballControls(camera, renderer.domElement);
// controls.minDistance = 20;
// controls.maxDistance = 200;
// controls.dynamicDampingFactor = 0.1;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  stats.update();
}
render();
