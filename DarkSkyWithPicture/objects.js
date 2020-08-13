

//星
const starsGeometry = new THREE.Geometry();
for (let i = 0; i < 1000; i++) {
    var star = new THREE.Vector3();
    star.x=0;star.y=0;star.z=0;
    while(Math.abs(star.x)<10)star.x = THREE.Math.randFloatSpread(200);
    while(Math.abs(star.y)<10)star.y = 30+THREE.Math.randFloatSpread(100);
    while(Math.abs(star.z)<10)star.z = THREE.Math.randFloatSpread(200);
    starsGeometry.vertices.push(star);
}
const starsMaterial = new THREE.PointsMaterial({
    map:new THREE.TextureLoader().load("./images/button/star.png"),
    emissive:"yellow",
    size: 0.775,
    //transparent: true,
});
this.starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(this.starField);

setInterval(function(){
    starField.rotation.y+=0.001;
},30);









  

const lights=new Array();
lights[0] = new THREE.AmbientLight(0xffffff, 1);
//lights[1] = new THREE.SpotLight("white",3,10,10,10,1);
for(let i=0;i<lights.length;i++){
    scene.add(lights[i]);
}







/*
var GLTF_Objects=new Array(32);
var GLTF_Objects_PlayText=new Array(32);
var GLTF_Objects_isCreated=new Array(32);
var GLTF_Objects_Animation=new Array(32);
var GLTF_Objects_AnimationNum=new Array(32);
var GLTF_Objects_mixer= new Array(16);
*/

//house設置
//createGLTF_Objects(0,'./GLTF_Objects/house.gltf',[0,0,0],[1,1,1],[0,0,0]);











var planes=new Array(128);

var textMaterials=new Array(32);
var canvases=new Array(textMaterials.length);
var contexts=new Array(textMaterials.length);
var textures=new Array(textMaterials.length); 

var videoes=new Array(32);
var videoMaterials=new Array(32);
var imageMaterials=new Array(128);


var HTMLs=new Array(16);





/*追加していく*/

//地面
createMaterialText(0,["GroundGround","groundground"]);
addPlane(0,textMaterials[0],[0,-2,0],[8,8,8],[-90,0,0]);
contexts[0].fillStyle="darkgoldenrod";
contexts[0].fillRect(0,0,624,624);


//ボタン 1~8 ボタン表示などはあとで記述
const ButtonGroup=new THREE.Group();
ButtonGroup.position.set(0,0,0);
const ParentButtonGroup=new THREE.Group();
createMaterialImage(1,"./images/button/download.png");//ダウンロード
    imageMaterials[1].transparent=true;
    addPlane(1,imageMaterials[1],[-0.5,-0.2,0.01],[0.2,0.2,0.2]);
    ButtonGroup.add(planes[1]);
createMaterialImage(2,"./images/button/pageMove.png");//ページ遷移
    imageMaterials[2].transparent=true;
    addPlane(2,imageMaterials[2],[0,-0.2,0.01],[0.2,0.2,0.2]);
    ButtonGroup.add(planes[2]);
createMaterialImage(3,"./images/button/start.png");//start
    imageMaterials[3].transparent=true;
    addPlane(3,imageMaterials[3],[0.5,-0.2,0.01],[0.2,0.2,0.2]);
    ButtonGroup.add(planes[3]);
createMaterialImage(4,"./images/button/ArrowLeft.png");//right
    imageMaterials[4].transparent=true;
    addPlane(4,imageMaterials[4],[-0.5,-0.2,0.01],[0.2,0.2,0.2]);
    ButtonGroup.add(planes[4]);
createMaterialImage(5,"./images/button/ArrowRight.png");//left
    imageMaterials[5].transparent=true;
    addPlane(5,imageMaterials[5],[0.5,-0.2,0.01],[0.2,0.2,0.2]);
    ButtonGroup.add(planes[5]);
createMaterialImage(6,"./images/button/OpenHTML.png");//openHTML
    imageMaterials[6].transparent=true;
    addPlane(6,imageMaterials[6],[0,-0.2,0.01],[0.2,0.2,0.2]);
    ButtonGroup.add(planes[6]);

ParentButtonGroup.add(ButtonGroup);
scene.add(ParentButtonGroup);
ParentButtonGroup.position.set(0,-1,0);


//テキスト9~20 
createMaterialText(9,["クリック選択","ドラッグ回転"]);
AddPlanesInSky(9,textMaterials[9],4,[-90,0],{type:"text"});


createMaterialText(10,["いらすとや の","画像に感謝"]);
AddPlanesInSky(10,textMaterials[10],16,[-80,0],{type:"text",page_url:"https://www.irasutoya.com"});


createMaterialText(11,["説明","背景など"]);
AddPlanesInSky(11,textMaterials[11],16,[-100,0],{type:"open_html",page_url:"./about_total_introduction.html",numHTML:0,nowDivNum:7});



//動画　21~49
for(let i=21;i<=29;i++){
    //let num=Math.floor(Math.random()*10 );
    let num=i-21;
    let url="./images/videoes/"+num+".jpeg";
    createMaterialImage(i,url);
    imageMaterials[i].transparent=true;
    AddPlanesInSky(i,imageMaterials[i],32,[Math.random()*360,Math.random()*80],{type:"image",
                                                                                page_url:url,
                                                                                load_url: url,
                                                                                load_name:"picture",
                                                                                video_url:"./images/videoes/"+num+".mp4"
                                                                               },[1,0.7,1]);
}


//画像 32~128
for(let i=50;i<=128;i++){
    let url="./images/FreePictures/"+ Math.floor(Math.random()*20 )+".png";
    createMaterialImage(i,url);
    imageMaterials[i].transparent=true;
    AddPlanesInSky(i,imageMaterials[i],32,[Math.random()*360,Math.random()*80],{type:"image",
                                                                                page_url:url,
                                                                                load_url: url,
                                                                                load_name:"picture"
                                                                               });
}








//タッチイベント
let Clicked_object;
function THREE_ClickObjEvent(obj){//object本体をタッチした時
    switch(obj){
        case planes[0]://ground
            break;
        case planes[1]://download
            if(Clicked_object.type.load_url) downloadImage(Clicked_object.type.load_url,Clicked_object.type.load_name);
            break;
        case planes[2]://page jump
            if(Clicked_object.type.page_url) window.open(Clicked_object.type.page_url);
            break;
        case planes[3]://play video　
            if(Clicked_object.type.video_url){
                let numP=planes.indexOf(Clicked_object);
                if(Clicked_object.type.load_name!="video")createMaterialVideo(numP,Clicked_object.type.video_url);
                PlayVideo(numP,numP);
                Clicked_object.type.load_url=Clicked_object.type.video_url;
                Clicked_object.type.page_url=Clicked_object.type.video_url;
                Clicked_object.type.load_name="video";

                setTimeout(function(){ ButtonGroup.position.y= - planes[numP].scale.y/planes[numP].scale.x; },500);
            }
            break;
        case planes[4]: //arrowLeft(html div back)
            if(Clicked_object.type.nowDivNum>=0){
                document.body.appendChild(HTMLs[Clicked_object.type.numHTML]);
                let divs=HTMLs[Clicked_object.type.numHTML].getElementsByTagName("div");
                let numP=planes.indexOf(Clicked_object);
                if(divs[Clicked_object.type.nowDivNum-1])Clicked_object.type.nowDivNum--;
                else Clicked_object.type.nowDivNum=0;
                CanvasSetHTML(divs[Clicked_object.type.nowDivNum],numP);
                document.body.removeChild(HTMLs[Clicked_object.type.numHTML]);

                setTimeout(function(){ ButtonGroup.position.y= - planes[numP].scale.y/planes[numP].scale.x; },200);
            }
            break;
        case planes[5]: //arrowRight(html div forward)
            if(Clicked_object.type.nowDivNum>=0){
                document.body.appendChild(HTMLs[Clicked_object.type.numHTML]);
                let divs=HTMLs[Clicked_object.type.numHTML].getElementsByTagName("div");
                let numP=planes.indexOf(Clicked_object);
                if(divs[Clicked_object.type.nowDivNum+1])Clicked_object.type.nowDivNum++;
                //else Clicked_object.type.nowDivNum=0;
                CanvasSetHTML(divs[Clicked_object.type.nowDivNum],numP);
                document.body.removeChild(HTMLs[Clicked_object.type.numHTML]);

                setTimeout(function(){ ButtonGroup.position.y= - planes[numP].scale.y/planes[numP].scale.x; },200);
            }
            break;
        case planes[6]: //openHTML
            let numP=planes.indexOf(Clicked_object);
            planes[numP].type.type="html";
            GetHTML_SetCanvas(planes[numP].type.page_url,planes[numP].type.numHTML,numP,Clicked_object.type.nowDivNum);//url,numHTML,numP
            DisplayButton(Clicked_object);
            break;
        case starField:
            break;

        default:
            if(Clicked_object)
                if(obj!=Clicked_object)
                    SetDistanceFromCamera(Clicked_object,32);//違うobjを触ったら元のobjは小さく
                 
            Clicked_object=obj;
            if((obj.position.x**2+obj.position.y**2+obj.position.z**2)<32){//近くにある時
                SetDistanceFromCamera(obj,32);
                ParentButtonGroup.position.set(0,-1,0);
            }else{//遠くにある時
                DisplayButton(obj);
                SetDistanceFromCamera(obj,4);
                ButtonGroup.position.y=-obj.scale.y/obj.scale.x;
                ParentButtonGroup.position.set(obj.position.x,obj.position.y,obj.position.z);
                ParentButtonGroup.rotation.set(obj.rotation.x,obj.rotation.y,obj.rotation.z);
            }   
            break;
    }

    
    

}



//ボタン表示など
function DisplayButton(obj){
    planes[1].scale.set(0,0,0);//download
    planes[2].scale.set(0,0,0);//page jump
    planes[3].scale.set(0,0,0);//play video
    planes[4].scale.set(0,0,0);//arrowLeft
    planes[5].scale.set(0,0,0);//arrowRight
    planes[6].scale.set(0,0,0);//openHTML
    switch(obj.type.type){
        case "image":
            planes[1].scale.set(0.2,0.2,0.2);
            if(obj.type.page_url)planes[2].scale.set(0.2,0.2,0.2);
            if(obj.type.video_url)planes[3].scale.set(0.2,0.2,0.2);
            break;
        case "text":
            if(obj.type.page_url)planes[2].scale.set(0.2,0.2,0.2);
            break;
        case "html":
            planes[2].scale.set(0.2,0.2,0.2);
            planes[4].scale.set(0.2,0.2,0.2);//arrowLeft
            planes[5].scale.set(0.2,0.2,0.2);//arrowRight
            break;
        case "open_html":
            planes[6].scale.set(0.2,0.2,0.2);
            break;
    }
}





//画像ダウンロード
function downloadImage(url,name){

    if(window.navigator.msSaveBlob){//IEなど
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
 
        xhr.onloadend = function() {
            if(xhr.status !== 200) return;
            window.navigator.msSaveBlob(xhr.response, name);
        }
        xhr.send();
    }else{
        let link = document.createElement('a');
        link.href=url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)    
    }
    
}	






SetCameraRotation(document.querySelector('#THREE_canvas'));


