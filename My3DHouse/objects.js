const light  = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);







var GLTF_Objects=new Array(32);
var GLTF_Objects_PlayText=new Array(32);
var GLTF_Objects_isCreated=new Array(32);
var GLTF_Objects_Animation=new Array(32);
var GLTF_Objects_AnimationNum=new Array(32);
var GLTF_Objects_mixer= new Array(16);



//house設置
createGLTF_Objects(0,'./GLTF_Objects/house.gltf',[0,0,0],[1,1,1],[0,0,0]);









var planes=new Array(64);
var textMaterials=new Array(32);
var canvases=new Array(32);
var contexts=new Array(32);
var textures=new Array(32); 
var videoes=new Array(32);
var videoMaterials=new Array(32);
var imageMaterials=new Array(32);




var HTMLs=new Array(8);



createMaterialText(0,["適当な文字を","表示できます"]);
createMaterialText(1,["適当な文字を","表示できます"]);
addPlane(0,textMaterials[0],[-1.2,2,-8]);
addPlane(1,textMaterials[1],[6.5,2,-4],[1,1,1],[0,-90,0]);
GetHTML_SetCanvas("./sample.html",0,0);
GetHTML_SetCanvas("./drawHTML.html",1,1);



createMaterialImage(0,"./images/GirlSayFight.jpeg");
createMaterialVideo(0,"./images/GirlSayFight.mp4");
addPlane(2,imageMaterials[0],[1.2,2,-8],[1,0.6,1]);




createMaterialText(3,["タッチすると","人が現れます"]);
addPlane(3,textMaterials[3],[4,2,-8],[1,1,1],[0,0,0]);



createMaterialText(4,["クリックすると","ドラゴン登場"]);
addPlane(4,textMaterials[4],[-4,2,-8],[1,1,1],[0,0,0]);











function THREE_ClickObjEvent(obj){//object本体をタッチした時
    switch(obj){
        case planes[0]:
        case planes[1]:
            break;
        case planes[2]:
            PlayVideo(0,2);
            break;
        case planes[3]:
            createGLTF_Objects(1,"./GLTF_Objects/SamplePerson.gltf",[4,0.1,-7],[0.25,0.25,0.25],[0,0,0],true);
            break;
        case planes[4]:
            createGLTF_Objects(2,'./GLTF_Objects/dragon_A.gltf',[-3,0.2,-5],[0.2,0.2,0.2],[0,0,0],true);
            break;
        


        case GLTF_Objects_PlayText[1]:
            GLTF_PlayAnimation(1);
            break;
        case GLTF_Objects_PlayText[2]:
            GLTF_PlayAnimation(2);
            break;
    }





    /*
    switch(obj.parent.parent){//meshをタッチした時
        case GLTF_Objects[0]:
            console.log(0);
            break;
        case GLTF_Objects[1]:
            console.log(1);
            break;
        case GLTF_Objects[2]:
            console.log(2);
            break;
    }
    
    if(typeof(obj.parent.parent.parent) == "undefined")console.log("A");
    switch(obj.parent.parent.parent){//armatureをタッチした時
        case GLTF_Objects[0]:
            console.log(0);
            break;
        case GLTF_Objects[1]:
            console.log(1);
            break;
        case GLTF_Objects[2]:
            console.log(2);
            break;
    }*/
    
   

   //console.log(obj);
}





SetCameraRotation(document.querySelector('#THREE_canvas'));


