
function AddPlanesInSky(i,material,r,angle,type,scale){//angle[0]:horizontalの角度、angle[1]:verticalの角度
    addPlane(i,material,[r*Math.cos(Math.PI*angle[1]/180)*Math.cos(Math.PI*angle[0]/180),r*Math.sin(Math.PI*angle[1]/180),r*Math.cos(Math.PI*angle[1]/180)*Math.sin(Math.PI*angle[0]/180)]);
    planes[i].lookAt(camera.position);
    if(type)planes[i].type=type;
    if(scale)planes[i].scale.set(scale[0],scale[1],scale[2]);
}

function SetDistanceFromCamera(obj,distance){
    let r=Math.sqrt( (obj.position.x-camera.position.x)**2+(obj.position.y-camera.position.y)**2+(obj.position.z-camera.position.z)**2 );
    obj.position.set(distance*obj.position.x/r,distance*obj.position.y/r,distance*obj.position.z/r);
    //obj.lookAt(camera.position);
}



/*
function addLight(PosArray,color,strength,distance,lightDec){
    var light = new THREE.PointLight(color,strength,distance,lightDec);
    scene.add(light);
    light.position.set(PosArray[0],PosArray[1],PosArray[2]);
}
*/