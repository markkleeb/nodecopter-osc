var channel = 0;

var osc = require('node-osc/lib/osc.js')
  , util = require('util')
  ;


var oscServer = new osc.Server(10000, '/drone');

var up = 0;
message = '';

//var oscTimer = setInterval(checkOsc, 100);


function autoPilot(name, deps) {
    deps.io.sockets.on('connection', function (socket) {

      oscServer.on("message", function (msg, rinfo) {
              
               
                console.log("Message:");
                console.log(msg);  
                console.log(msg[2][1]);

                message = msg[2][1]
               
                deps.client.clockwise(0.5);
              });


        socket.on('/pilot/move', function (cmd) {
            var _name;
            console.log("move", cmd);
            return typeof deps.client[_name = cmd.action] === "function" ? deps.client[_name](cmd.speed) : void 0;
        });
        socket.on('/pilot/drone', function (cmd) {
           var _name;
           console.log("drone", cmd);
           return typeof deps.client[_name = cmd.action] === "function" ? deps.client[_name]() : void 0;
        });
        socket.on('/pilot/calibrate', function (cmd) {
           console.log("calibrate", cmd);
           return deps.client.calibrate(cmd.device_num);
        });
        socket.on('/pilot/ftrim', function () {
           console.log("flat trim");
           return deps.client.ftrim();
        });
        socket.on('/pilot/animate', function (cmd) {
           console.log("animate", cmd);
           return deps.client.animate(cmd.action, 500);
        });
        socket.on('/pilot/channel', function (cmd) {
           channel = (channel == 0) ? 1 : 0;
           console.log("switching to channel %d", channel);
           return deps.client.config('video:video_channel', channel);
        });
    });
};

module.exports = autoPilot;


