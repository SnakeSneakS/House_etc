




/*
createGLTF_Objects(1,"./GLTF_Objects/SamplePerson.gltf",[-3,0.1,1],[0.25,0.25,0.25],[0,30,0]);
createGLTF_Objects(2,"./GLTF_Objects/SamplePerson.gltf",[0,0.1,1],[0.25,0.25,0.25],[0,0,0]);
createGLTF_Objects(3,"./GLTF_Objects/SamplePerson.gltf",[3,0.1,1],[0.25,0.25,0.25],[0,-30,0]);
*/


/*
createGLTF_Objects(numG,url,PosArray,ScaleArray,RotationArray)でGLTFオブジェクトをダウンロード→設置
*/




var loader;
function createGLTF_Objects(numG,url,PosArray,ScaleArray,RotationArray,PlayTextBool){
    if(GLTF_Objects_isCreated[numG]==true){return;}

    GLTF_Objects_isCreated[numG]=true;

    loader = new THREE.GLTFLoader();

    loader.load(url, function(data){//読み込み時
        GLTF_Objects[numG] = data.scene;
        if(data.animations.length>0){
            GLTF_Objects_Clock[numG] = new THREE.Clock();
            GLTF_Objects_Animation[numG]=data.animations;
            GLTF_Objects_AnimationNum[numG]=0;
            GLTF_Objects_mixer[numG]=new THREE.AnimationMixer(GLTF_Objects[numG]);
        }

       
  
       
        GLTF_Objects[numG].position.set(PosArray[0],PosArray[1],PosArray[2]);
        if(ScaleArray)GLTF_Objects[numG].scale.set(ScaleArray[0],ScaleArray[1],ScaleArray[2]);
        if(RotationArray)GLTF_Objects[numG].rotation.set(Math.PI*RotationArray[0]/180,Math.PI*RotationArray[1]/180,Math.PI*RotationArray[2]/180);
        scene.add(GLTF_Objects[numG]);

        if(PlayTextBool==true){
        let canvas = document.createElement( 'canvas' );
        context = canvas.getContext( '2d' );
        context.width = 256;
        context.height = 256;
        // 文字の描画開始
        context.fillStyle="yellow";
        context.fillRect(0,0,300,300);
        context.beginPath();
        context.fillStyle = 'black';
        context.font= '80px sans-serif';
        context.fillText("play", 10, 60);
        context.fill();
        var texture = new THREE.Texture( canvas );
        texture.needsUpdate = true;// これをやらないとマテリアルは真っ暗
        var material=new THREE.MeshLambertMaterial({map: texture});
        // メッシュの作成と追加
        var geometry  = new THREE.PlaneGeometry(1, 1);
        //material = new THREE.MeshPhongMaterial( { color: '#123454' } );
        GLTF_Objects_PlayText[numG]=new THREE.Mesh(geometry, material);
        GLTF_Objects_PlayText[numG].position.set(PosArray[0], PosArray[1]+0.1, PosArray[2]);
        if(ScaleArray)GLTF_Objects_PlayText[numG].scale.set(ScaleArray[0]*10,ScaleArray[1]*10,ScaleArray[2]*10);
        if(RotationArray)GLTF_Objects_PlayText[numG].rotation.set(Math.PI*(-70)/180,Math.PI*RotationArray[1]/180,Math.PI*RotationArray[2]/180);
        scene.add(GLTF_Objects_PlayText[numG]);
        }


    },function(){//onProgress
        
    },function(){//error
        alert("load failed.");
        GLTF_Objects_isCreated[numG]=false;;
    });

}






//animationさせる
function GLTF_PlayAnimation(numG) {
  GLTF_Objects_mixer[numG].stopAllAction();
  var anime = GLTF_Objects_mixer[numG].clipAction(GLTF_Objects_Animation[numG][GLTF_Objects_AnimationNum[numG]]);
// anime.setLoop(THREE.LoopOnce)  //これあるとループしない
  anime.clampWhenFinished = true;
  anime.play();

  GLTF_Objects_AnimationNum[numG]++;
 // console.log(GLTF_Objects_Animation[numG][GLTF_Objects_AnimationNum[numG]]);
  if(GLTF_Objects_AnimationNum[numG]>=GLTF_Objects_Animation[numG].length) GLTF_Objects_AnimationNum[numG]=0;
}

















/*　これだと、CameraRotationAngleが変わってないため、移動の向きや解除後のカメラの向きが異なる

var _isLookingAtObject=false;
var LookAtObject_setTimeout;
function Start_LookAtObject(object){
    if(_isLookingAtObject==false){
        setTimeout_LookAtObject(object);
        _isLookingAtObject=true; 
    }else{
        clearTimeout(LookAtObject_setTimeout);
        _isLookingAtObject=false;
    }
}

function setTimeout_LookAtObject(object){
    camera.lookAt(object.position);
    LookAtObject_setTimeout=setTimeout(function(){
        setTimeout_LookAtObject(object);
    },30);
}




setTimeout(function(){
    Start_LookAtObject(GLTF_Objects[1]);
    Start_LookAtObject(GLTF_Objects[1]); 
},1000);
*/