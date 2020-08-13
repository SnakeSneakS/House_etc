var GLTF_Objects=new Array(32);
var GLTF_Objects_isCreated=new Array(32);
var planes=new Array(64);
var textMaterials=new Array(32);
var canvases=new Array(32);
var contexts=new Array(32);
var videoes=new Array(32);
var videoMaterials=new Array(32);
var imageMaterials=new Array(32);




createMaterialText(0,["適当な文字を","表示できます"]);
addPlane(0,textMaterials[0],[0,2,-8]);


createMaterialImage(0,"./images/GirlSayFight.jpeg");
createMaterialVideo(0,"./images/GirlSayFight.mp4");
addPlane(1,imageMaterials[0],[2,2,-8],[1,0.6,1]);


addPlane(2,textMaterials[0],[6.5,2,-4],[1,1,1],[0,-90,0]);


createMaterialText(1,["タッチすると","人が現れます"]);
addPlane(3,textMaterials[1],[4,2,-8],[1,1,1],[0,0,0]);



camera.position.set(0,0,0);



addLight([0,0,0],"white",5,10,1.0);




var material1 = new THREE.MeshLambertMaterial({
    //map: texture, // テクスチャーを指定
    color: "gray", // 色
    transparent: true, // 透明の表示許可
    //blending: THREE.AdditiveBlending, // ブレンドモード
    //side: THREE.DoubleSide, // 表裏の表示設定
   // depthWrite: false // デプスバッファへの書き込み可否
  });
addPlane(4,material1,[0,-1,0],[10,10,10],[-90,0,0]);


















function THREE_ClickObjEvent(obj){
  switch(obj){
      case planes[0]:
      case planes[2]:
          break;
      case planes[1]:
          PlayVideo(0,1);
          break;
      case planes[3]:
          createGLTF_Objects(1,"./GLTF_Objects/SamplePerson.gltf",[4,0.1,-7],[0.25,0.25,0.25],[0,0,0]);
          break;
  }
}


SetCameraRotation(document.querySelector('#THREE_canvas'));
