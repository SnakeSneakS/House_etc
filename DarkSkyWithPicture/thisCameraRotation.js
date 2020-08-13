// 加速度センサーイベント処理
window.addEventListener("deviceorientation", function(e){
    // alpha, beta, gammaの値を取得
    let alpha = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;

    camera.rotation.z=alpha;
    camera.rotation.x=beta;
    camera.rotation.y=gamma;
}, false);
