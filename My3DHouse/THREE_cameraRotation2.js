var CameraRotation=camera.quaternion; //cameraのQuaternion
var CameraRotationAngle={
    H:0, //並行の回転角度
    V:0, //垂直の回転角度(60など)
    AddH:0,
    AddV:0
}
var AxisH=new THREE.Vector3(0,1,0);　//並行軸
var AxisV=new THREE.Vector3(1,0,0);　//垂直軸
var CameraRotation_QuaternionH=new THREE.Quaternion();
CameraRotation_QuaternionH.setFromAxisAngle(AxisH,-CameraRotationAngle.H*Math.PI/(180));
var CameraRotation_QuaternionV=new THREE.Quaternion();
CameraRotation_QuaternionV.setFromAxisAngle(AxisV,CameraRotationAngle.V*Math.PI/(180));


var CameraRotationTouch={
    x:0,
    y:0,
}



var Camera_isRotating=false;
var Camera_SetTimeout;
const StartCameraSetQuaternion=function(){
    if(Camera_isRotating==true){return;}
    CameraSetQuaternion();
}
const CameraSetQuaternion=function(){
    Camera_isRotating=true;
    CameraRotationAngle.H-=CameraRotationAngle.AddH;
    CameraRotationAngle.V-=CameraRotationAngle.AddV;
    if(CameraRotationAngle.H>360)CameraRotationAngle.H-=360;
    else if(CameraRotationAngle.H<-360)CameraRotationAngle.H+=360;
    if(CameraRotationAngle.V>360)CameraRotationAngle.V-=360;
    else if(CameraRotationAngle.V<-360)CameraRotationAngle.V+=360;
    CameraRotation_QuaternionH.setFromAxisAngle(AxisH,-CameraRotationAngle.H*Math.PI/(180));
    CameraRotation_QuaternionV.setFromAxisAngle(AxisV,CameraRotationAngle.V*Math.PI/(180));
    CameraRotation.multiplyQuaternions(CameraRotation_QuaternionH,CameraRotation_QuaternionV);
    Camera_SetTimeout=setTimeout(function(){
        CameraSetQuaternion();
        },30);
}
const Camera_ClearTimeout=function(){
    clearTimeout(Camera_SetTimeout);
    Camera_isRotating=false;
}




/*カメラ回転追加*/
var CameraRotationTouch_isDown=false;
const CameraRotationSpeed=0.01;
const SetCameraRotation = function(canvas){
    canvas.addEventListener('touchstart',function(e){
        StartCameraSetQuaternion();
        CameraRotationTouch.x=e.touches[0].clientX;
        CameraRotationTouch.y=e.touches[0].clientY;
    });
    canvas.addEventListener('touchmove',function(e){
        e.preventDefault();
        CameraRotationAngle.AddH=+(-(e.touches[0].clientX-CameraRotationTouch.x)*CameraRotationSpeed);
        CameraRotationAngle.AddV=-(-(e.touches[0].clientY-CameraRotationTouch.y)*CameraRotationSpeed);
    });
    canvas.addEventListener('touchend',function(e){
        Camera_ClearTimeout();
        CameraRotationAngle.AddH=0;
        CameraRotationAngle.AddV=0;
    });
    canvas.addEventListener('mousedown',function(e){
        CameraRotationTouch_isDown=true;
        StartCameraSetQuaternion();
        CameraRotationTouch.x=e.x;
        CameraRotationTouch.y=e.y;
    });
    canvas.addEventListener('mousemove',function(e){
        if( CameraRotationTouch_isDown==true){
            e.preventDefault();
            CameraRotationAngle.AddH=+(-(e.x-CameraRotationTouch.x)*CameraRotationSpeed);
            CameraRotationAngle.AddV=-(-(e.y-CameraRotationTouch.y)*CameraRotationSpeed);
        }
    });
    canvas.addEventListener('mouseup',function(e){
        CameraRotationTouch_isDown=false;
        Camera_ClearTimeout();
        CameraRotationAngle.AddH=0;
        CameraRotationAngle.AddV=0;
    });
};

SetCameraRotation(document.querySelector('#THREE_canvas'));
















//自動でobjectをみる
