
// 幅、高さ取得
const JoyStickPad_Size  = 200;

const JoyStickPad=document.createElement("div");
document.body.appendChild(JoyStickPad);
JoyStickPad.style.width=JoyStickPad_Size+"px";
JoyStickPad.style.height=JoyStickPad_Size+"px";
JoyStickPad.style.position="fixed";
JoyStickPad.style.zIndex="22222";
JoyStickPad.style.top=window.innerHeight-JoyStickPad_Size-50+"px";
JoyStickPad.style.left=50+"px";
JoyStickPad.style.backgroundColor="white";
JoyStickPad.style.borderRadius=JoyStickPad_Size+"px";

const JoyStickPad_point=document.createElement("div");
JoyStickPad.appendChild(JoyStickPad_point);
JoyStickPad_point.style.width=JoyStickPad_Size/2+"px";
JoyStickPad_point.style.height=JoyStickPad_Size/2+"px";
JoyStickPad_point.style.position="absolute";
JoyStickPad_point.style.zIndex="22223";
JoyStickPad_point.style.top=JoyStickPad_Size/4+"px";
JoyStickPad_point.style.left=JoyStickPad_Size/4+"px";
JoyStickPad_point.style.backgroundColor="black";
JoyStickPad_point.style.borderRadius=JoyStickPad_Size+"px";
JoyStickPad_point.style.pointerEvents="none";


JoyStickPad.addEventListener('touchstart',function(e){
    JoyStickMoveStart();
    const rect = e.target.getBoundingClientRect();
    const offsetX = (e.touches[0].clientX - window.pageXOffset - rect.left);
    const offsetY = (e.touches[0].clientY - window.pageYOffset - rect.top);
    JoyStick_Velocity.x=offsetX-JoyStickPad_Size/2;
    JoyStick_Velocity.z=JoyStickPad_Size/2 - offsetY;
    JoyStickPad_point.style.top=offsetY-JoyStickPad_Size/4+"px";
    JoyStickPad_point.style.left=offsetX-JoyStickPad_Size/4+"px";
});
JoyStickPad.addEventListener('touchmove',function(e){
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const offsetX = (e.touches[0].clientX - window.pageXOffset - rect.left);
    const offsetY = (e.touches[0].clientY - window.pageYOffset - rect.top);
    JoyStick_Velocity.x=offsetX-JoyStickPad_Size/2;
    JoyStick_Velocity.z=JoyStickPad_Size/2 - offsetY;
    JoyStickPad_point.style.top=offsetY-JoyStickPad_Size/4+"px";
    JoyStickPad_point.style.left=offsetX-JoyStickPad_Size/4+"px";
});
JoyStickPad.addEventListener('touchend',function(){
    joyStickMoveStop();
    JoyStick_Velocity.x=0;
    JoyStick_Velocity.z=0;
    JoyStickPad_point.style.top=JoyStickPad_Size/4+"px";
    JoyStickPad_point.style.left=JoyStickPad_Size/4+"px";
});

var JoyStickPad_isDown=false;
JoyStickPad.addEventListener('mousedown',function(e){
    JoyStickMoveStart();
    JoyStickPad_isDown=true;
    JoyStick_Velocity.x=e.offsetX-JoyStickPad_Size/2;
    JoyStick_Velocity.z=JoyStickPad_Size/2 - e.offsetY;
    JoyStickPad_point.style.top=e.offsetY-JoyStickPad_Size/4+"px";
    JoyStickPad_point.style.left=e.offsetX-JoyStickPad_Size/4+"px";
});
JoyStickPad.addEventListener('mousemove',function(e){
    e.preventDefault();
    if(JoyStickPad_isDown==true){
    JoyStick_Velocity.x=e.offsetX-JoyStickPad_Size/2;
    JoyStick_Velocity.z=JoyStickPad_Size/2 - e.offsetY;
    JoyStickPad_point.style.top=e.offsetY-JoyStickPad_Size/4+"px";
    JoyStickPad_point.style.left=e.offsetX-JoyStickPad_Size/4+"px";
    }
});
JoyStickPad.addEventListener('mouseup',function(){
    JoyStickPad_isDown=false;
    joyStickMoveStop();
    JoyStick_Velocity.x=0;
    JoyStick_Velocity.z=0;
    JoyStickPad_point.style.top=JoyStickPad_Size/4+"px";
    JoyStickPad_point.style.left=JoyStickPad_Size/4+"px";
});




/*ここから実際の移動*/





var MoveSpeed=0.001;
var _isMoving=false;


/*JoyStickMove*/
var JoyStick_Velocity=new THREE.Vector3(0,0,0);
var JoyStick_MoveVelocity;
var JoyStickMoveTimeout;
function JoyStickMoveStart(){
    if(_isMoving==false){
        JoyStickMove(camera);
        _isMoving=true;
    }
}

function JoyStickMove(obj){
    JoyStick_MoveVelocity=new THREE.Vector3(JoyStick_Velocity.x*Math.cos(-CameraRotationAngle.H*Math.PI/180) - JoyStick_Velocity.z*Math.sin(-CameraRotationAngle.H*Math.PI/180) , 0 , JoyStick_Velocity.x*Math.sin(-CameraRotationAngle.H*Math.PI/180) + JoyStick_Velocity.z*Math.cos(-CameraRotationAngle.H*Math.PI/180));
    obj.position.x+=JoyStick_MoveVelocity.x*MoveSpeed;
    obj.position.z-=JoyStick_MoveVelocity.z*MoveSpeed;
    JoyStickMoveTimeout=setTimeout(function(){JoyStickMove(obj);},30); 
}
function joyStickMoveStop(){
    _isMoving=false;
    clearTimeout(JoyStickMoveTimeout);
}


/*KeyBoad Move*/
var Key_Velocity=new THREE.Vector3(0,0,0);
var Key_MoveVelocity;
var KeyMoveTimeout;
var KeyPudding={a:0,w:0,s:0,d:0};
function KeyMoveStart(){
    if(_isMoving==false){
        KeyMove(camera);
        _isMoving=true;
    }
}
function KeyMove(obj){
    Key_MoveVelocity=new THREE.Vector3(Key_Velocity.x*Math.cos(-CameraRotationAngle.H*Math.PI/180) - Key_Velocity.z*Math.sin(-CameraRotationAngle.H*Math.PI/180) , 0 , Key_Velocity.x*Math.sin(-CameraRotationAngle.H*Math.PI/180) + Key_Velocity.z*Math.cos(-CameraRotationAngle.H*Math.PI/180));
    obj.position.x+=Key_MoveVelocity.x*MoveSpeed;
    obj.position.z-=Key_MoveVelocity.z*MoveSpeed;
    KeyMoveTimeout=setTimeout(function(){KeyMove(obj);},30); 
}
function KeyMoveStop(){
    _isMoving=false;
    clearTimeout(KeyMoveTimeout);
}

document.body.addEventListener("keydown",function(e){
    switch(e.key){
        case "d":
            KeyPudding.d=1;
            Key_Velocity.x=100;
            break;
        case "a":
            KeyPudding.a=1;
            Key_Velocity.x=-100;
            break;
        case "w":
            KeyPudding.w=1;
            Key_Velocity.z=100;
            break;
        case "s":
            KeyPudding.s=1;
            Key_Velocity.z=-100;
            break;
    }
    if(e.key=="a" || e.key=="w" || e.key=="s" || e.key=="d") KeyMoveStart();
});

document.body.addEventListener("keyup",function(e){
    switch(e.key){
        case "d":
            KeyPudding.d=0;
            Key_Velocity.x=0;
            break;
        case "a":
            KeyPudding.a=0;
            Key_Velocity.x=0;
            break;
        case "w":
            Key_Velocity.z=0;
            KeyPudding.w=0;
            break;
        case "s":
            Key_Velocity.z=0;
            KeyPudding.s=0;
            break;
    }
    if(e.key=="a" || e.key=="w" || e.key=="s" || e.key=="d") if(KeyPudding.d==0 && KeyPudding.a==0 && KeyPudding.w==0 && KeyPudding.s==0) KeyMoveStop();
});
