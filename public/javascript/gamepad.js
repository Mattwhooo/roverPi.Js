var haveEvents = 'ongamepadconnected' in window;
var controllers = {};
var socket = io();

function connecthandler(e) {
    addgamepad(e.gamepad);
    showOverlay();
}

function showOverlay(){
    if (typeof controllers[0] !== 'undefined' ){
        $('.overlay').fadeOut();
    }else{
        $('.overlay').fadeIn();
    }
}

function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;

    for (var i = 0; i < 4; i++) {
        var p = document.createElement("progress");
        var s = document.createElement("span");
        var d = document.createElement('div');
        s.setAttribute('id', 'axes' + i)
        d.innerText='Axis ' + i;
        p.className = "axis";
        if(i==1 || i==3 || i == 5) {
           p.className = "axis vertical-axis"
        }
        p.setAttribute("max", "2");
        p.setAttribute("value", "1");
        //p.innerHTML = i;

        s.appendChild(p)
        s.appendChild(d)

        document.getElementById('axes').appendChild(s);
    }

    requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
    showOverlay();
}

function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
}

function updateStatus() {
    if (!haveEvents) {
        scangamepads();
    }

    var i = 0;
    var j;

    for (j in controllers) {
        var controller = controllers[j];
        var d = document.getElementById("controller");

        var axes = d.getElementsByClassName("axis");
        for (i = 0; i < 4; i++) {
            var a = axes[i];
            a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
            a.setAttribute("value", controller.axes[i] + 1);
            if (controller.axes[i] > 0.1 || controller.axes[i] < -0.1){
                socket.emit('gamepadUpdate', i.toString() + '=' + controller.axes[i]);
            }

        }
    }

    requestAnimationFrame(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (gamepads[i].index in controllers) {
                controllers[gamepads[i].index] = gamepads[i];
                showOverlay();
            } else {
                addgamepad(gamepads[i]);
            }
        }
    }
}


window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
    setInterval(scangamepads, 500);
}
showOverlay();
