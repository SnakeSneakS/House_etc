// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#THREE_canvas'),
  //alpha: true,
  //antialias: true  //輪郭滑らか。計算量増加
});
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 1.0);
renderer.setPixelRatio(window.devicePixelRatio); //スマホでぼやけない様に？？

//document.body.appendChild(renderer.domElement); 一番下に表記


// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100 );
//camera.position.set(1, 1, 5); //before (0,1,5)
camera.position.x=0;
camera.position.y=1.5;
camera.position.z=20;
camera.useQuaternion=true;


//const light  = new THREE.AmbientLight(0xffffff, 1);
//scene.add(light);







// OrbitControls の追加
/*
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 5000.0;
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;
*/


// レンダリング
var GLTF_Objects_Clock=new Array();
//GLTF生成時に　clock[numG] = new THREE.Clock();　で定義


const animation = () => {

  renderer.render(scene, camera);
  //controls.update(); //コメントアウト可能

  requestAnimationFrame(animation);

  //Animation Mixerを実行
  for(let i=0; i<GLTF_Objects_mixer.length;i++){
    if(GLTF_Objects_mixer[i]){
      GLTF_Objects_mixer[i].update(GLTF_Objects_Clock[i].getDelta());
    } 
  }

};








animation();


//上はthree.js


//document.getElementById('stage').appendChild(renderer.domElement);

/*renderer.domElement.addEventListener("onTouchStart",function(){
  prevent.default();
});*/