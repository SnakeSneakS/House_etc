var planes=new Array(16);
var textures=new Array(16);
var canvases=new Array(16);
var contexts=new Array(16);
var videoes=new Array(16);
var videoSetTimeout=new Array(16);
var videoTextures=new Array(16);



createTextureText(0,["動画再生テスト","（クリック）"]);
addPlane(0,0,2,-8);
document.body.appendChild(canvases[0]);


/*
createTextureText(i,TextArray)で、canvas[i]に文字TextArrayを描く
addPlane(i,posX,posY,posZ)でcanvas[i]をtextureに持ったcubeを追加する
*/

function createTextureText(i,TextArray){
    // キャンバスの作成
    if(!canvases[i])canvases[i] = document.createElement( 'canvas' );
    if(!contexts[i])contexts[i] = canvases[i].getContext( '2d' );
    contexts[i].width = 256;
    contexts[i].height = 256;
    // 文字の描画開始
    contexts[0].fillStyle="white";
    contexts[i].fillRect(0,0,300,300);

    contexts[i].beginPath();
    contexts[i].fillStyle = 'black';
    contexts[i].font= '40px sans-serif';
    for(let j=0;j<TextArray.length;j++){
        contexts[i].fillText(TextArray[j], 10, 60*(j+1));
    }
    contexts[i].fill();
}




function addPlane(i,posX,posY,posZ){

    // メッシュの作成と追加
    var geometry  = new THREE.PlaneGeometry(2, 2);
    //material = new THREE.MeshPhongMaterial( { color: '#123454' } );
    textures[i] = new THREE.Texture( canvases[i] );
    textures[i].needsUpdate = true;// これをやらないとマテリアルは真っ暗
    var material = new THREE.MeshBasicMaterial({map: textures[i]});
  
    planes[i]=new THREE.Mesh(geometry, material);
    planes[i].position.set(posX, posY, posZ);
    
    scene.add(planes[i]);

}



function AddVideo(i,url){
    videoes[i]=document.createElement("video");
    videoes[i].src=url;
    videoes[i].preload="none";
    videoes[i].addEventListener('ended',function(){
        videoes[i].pause();
        videoes[i].currentTime=0;
        clearTimeout(videoSetTimeout[i]);
        //console.log("ended");
    });
    document.getElementById("movies").appendChild(videoes[i]);
    videoes[i].style.position="absolute";
    videoes[i].style.zIndex=-100;
}

function PlayVideo(i){
    if(videoes[i].preload!="auto")videoes[i].preload="auto";
    if(videoes[i].autoplay!=true)videoes[i].autoplay=true;
    else videoes[i].play();
    PlayVideoLoop(i);
}

function PlayVideoLoop(i){
    contexts[i].drawImage(videoes[i],0,0,canvases[i].width,canvases[i].height);
    textures[i].needsUpdate = true;
    videoSetTimeout[i]=setTimeout(function(){
        PlayVideoLoop(i);
    },60);
}

AddVideo(0,"./images/GirlSayFight.mp4");
PlayVideo(0);
setTimeout(function(){PlayVideo(0);},10000);
setTimeout(function(){PlayVideo(0);},20000);