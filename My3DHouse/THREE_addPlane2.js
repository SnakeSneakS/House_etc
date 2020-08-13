




/*
createMaterialText(i,TextArray)で、canvas[i]に文字TextArrayを描き、それをtextMaterials[i]にする
createMaterialVideo(numV,urlPoster)で、videoMaterials[i]に動画テクスチャを作る。(numVはcanvases[numV],numPはplanes[numP]) numPで再生するplanes[numP]指定しなければならない事に注意
createMaterialsImage(numI,url)で、imageMaterials[numI]を作成
PlayVideo(i,numP)で、videoMaterials[i]に設定した動画を再生する。(初回のみnumPによって再生するplanes[numP]を指定する必要あり)
addPlane(i,PosArray,SizeArray,RotationArray)でcanvas[i]をtextureに持ったcubeを追加する(PosArray=[PosX,PosY,PosZ])
*/

function createMaterialText(i,TextArray){
    // キャンバスの作成
    if(!canvases[i])canvases[i] = document.createElement( 'canvas' );
    if(!contexts[i])contexts[i] = canvases[i].getContext( '2d' );
    contexts[i].width = 256;
    contexts[i].height = 256;
    // 文字の描画開始
    //contexts[i].fillStyle="white";
    //contexts[i].fillRect(0,0,300,300);

    contexts[i].beginPath();
    contexts[i].fillStyle = 'lightblue';
    contexts[i].font= '40px sans-serif';
    for(let j=0;j<TextArray.length;j++){
        contexts[i].fillText(TextArray[j], 10, 60*(j+1));
    }
    contexts[i].fill();
    textures[i] = new THREE.Texture( canvases[i] );
    textures[i].needsUpdate = true;// これをやらないとマテリアルは真っ暗
    textMaterials[i]=new THREE.MeshLambertMaterial({map: textures[i]});
}






function createMaterialImage(i,url){
    imageMaterials[i] = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(url)}); 
}



function createMaterialVideo(numV,url){ 
    //videoのtexture作成
    videoes[numV]=document.createElement("video");
    videoes[numV].src=url;
    videoes[numV].preload="none";
    /*VideoDiv.appendChild(videoes[numV]);
    videoes[numV].style.position="absolute";
    videoes[numV].style.zIndex=-100;
    videoes[numV].width=5;
    videoes[numV].height=5;*/
    videoMaterials[numV]=new THREE.MeshLambertMaterial({map: new THREE.VideoTexture(videoes[numV])});
    videoMaterials[numV].minFilter = THREE.LinearFilter;
    videoMaterials[numV].magFilter = THREE.LinearFilter;
    videoMaterials[numV].format = THREE.RGBFormat;

    
    

}
function PlayVideo(numV,numP){
    if(videoes[numV].preload!="auto"){
        videoes[numV].preload="auto";
        videoes[numV].setAttribute('playsinline','');
        //videoes[numV].autoplay=true;

        //video終了時最初の状態に戻る
        videoes[numV].addEventListener('ended',function(){
        videoes[numV].pause();
        videoes[numV].currentTime=0;
        });
        //縦横比調整
        videoes[numV].onloadedmetadata = function () {
            planes[numP].scale.y=planes[numP].scale.x*videoes[numV].videoHeight/videoes[numV].videoWidth;
            planes[numP].material=videoMaterials[numV];
            videoes[numV].play();
        }
    }else{
        videoes[numV].play();
       
    }
}



//外部からhtml取得。その後canvasの中身をそのhtmlに
function GetHTML_SetCanvas(url,numHTML,numP){//HTMLs[numHTML]に格納
    var xhr = new XMLHttpRequest();
    xhr.responseType="document";
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var restxt=xhr.responseXML;
            HTMLs[numHTML]=restxt.documentElement;//完了
            document.body.appendChild(HTMLs[numHTML]);
            CanvasSetHTML(HTMLs[numHTML].getElementsByTagName("div")[0],numP)
            document.body.removeChild(HTMLs[numHTML]);
		}
	};
	xhr.send();
}

//canvasの中身をhtmlに変える
function CanvasSetHTML(HTMLele,numP){
    html2canvas(HTMLele).then(function(canvas){
        canvases[numP].width=canvas.width; 
        canvases[numP].height=canvas.height;
        contexts[numP].width=canvas.width; 
        contexts[numP].height=canvas.height;
        contexts[numP].drawImage(canvas,0,0);
        textures[numP].needsUpdate=true; //これないと変わらない
        planes[numP].scale.set(1,canvas.height/canvas.width,1);
    });
}


function addPlane(numP,material,PosArray,ScaleArray,RotationArray){
    // メッシュの作成と追加
    var geometry  = new THREE.PlaneGeometry(2, 2);
    //material = new THREE.MeshPhongMaterial( { color: '#123454' } );
  
    planes[numP]=new THREE.Mesh(geometry, material);
    planes[numP].position.set(PosArray[0], PosArray[1], PosArray[2]);
    if(ScaleArray)planes[numP].scale.set(ScaleArray[0],ScaleArray[1],ScaleArray[2]);
    if(RotationArray)planes[numP].rotation.set(Math.PI*RotationArray[0]/180,Math.PI*RotationArray[1]/180,Math.PI*RotationArray[2]/180);

    scene.add(planes[numP]);

}