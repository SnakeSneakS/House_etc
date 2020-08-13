






function addLight(PosArray,color,strength,distance,lightDec){
    var light = new THREE.PointLight(color,strength,distance,lightDec);
    scene.add(light);
    light.position.set(PosArray[0],PosArray[1],PosArray[2]);
}