var channel = 0;

var osc = require('node-osc/lib/osc.js')
  , util = require('util')
  ;


var oscServer = new osc.Server(10000, '/drone');

var up = 0
    ,down =0
    , left =0
    , right=0
    , clockwise = 0
    , counterclockwise = 0
    , forward = 0
    , backward = 0
    , takeoff = 0
    , land = 0
    ;

var upspeed = 0
    ,downspeed = 0
    , leftspeed = 0
    , rightspeed = 0
    , cwspeed = 0
    , ccwspeed = 0
    , forwardspeed = 0
    , backwardspeed = 0
    ;

message = '';

//var oscTimer = setInterval(, 100);





function autoPilot(name, deps) {
    var client = deps.client;
    
      var oscTime = setInterval( sendOsc, 100);
      oscServer.on("message", function (msg, rinfo) {

                //console.log("Message:");
                //console.log(msg);  

                 if(msg[2][1] == 1){ up = 1;}
                 else{ up = 0; }
                  if(msg[2][2] == 1){ down = 1;}
                 else{ down = 0; }
                  if(msg[2][3] == 1){ left = 1;}
                 else{ left = 0; }
                  if(msg[2][4] == 1){ right = 1;}
                 else{ right = 0; }
                  if(msg[2][5] == 1){ forward = 1;}
                 else{ forward = 0; }
                if(msg[2][6] == 1){ backward = 1;}
                 else{ backward = 0; }
                  if(msg[2][7] == 1){ clockwise = 1;}
                 else{ clockwise = 0; }
                 if(msg[2][8] == 1){ counterclockwise = 1;}
                 else{ counterclockwise = 0; }
                 if(msg[2][9] == 1){ takeoff = 1;}
                 else{ takeoff = 0; }
                 if(msg[2][10] == 1){ land = 1;}
                 else{ land = 0; }

              });
function sendOsc(){

    if(up == 1){
      upspeed = upspeed + 0.005 / (1- upspeed);
      upspeed = Math.min(1, upspeed);
      deps.client.up(upspeed);
      console.log("up");
      }

    else{
      console.log("not up");
      upspeed = 0;
      deps.client.up(upspeed);
      }

if(down == 1){
  downspeed = downspeed + 0.005 / (1- downspeed);
  downspeed = Math.min(1, downspeed);
  deps.client.down(downspeed);
  console.log("down");
}

else{
  downspeed = 0;
  deps.client.down(downspeed);
}

if(left == 1){
  leftspeed = leftspeed + 0.005 / (1- leftspeed);
  leftspeed = Math.min(1, leftspeed);
  deps.client.left(leftspeed);
  console.log("left");
}

else{
  leftspeed = 0;
  deps.client.left(leftspeed);
}

if(right == 1){
  rightspeed = rightspeed + 0.005 / (1- rightspeed);
  rightspeed = Math.min(1, rightspeed);
  deps.client.right(rightspeed);
  console.log("right");
}

else{
  rightspeed = 0;
  deps.client.right(rightspeed);
}

if(forward == 1){
  forwardspeed = forwardspeed + 0.005 / (1- forwardspeed);
  forwardspeed = Math.min(1, forwardspeed);
  deps.client.front(forwardspeed);
  console.log("forward");
}

else{
  forwardspeed = 0;
  deps.client.front(forwardspeed);
}

if(backward == 1){
  backwardspeed = backwardspeed + 0.005 / (1- backwardspeed);
  backwardspeed = Math.min(1, backwardspeed);
  deps.client.back(backwardspeed);
  console.log("backward");
}

else{
  backwardspeed = 0;
  deps.client.back(backwardspeed);
}

if(clockwise == 1){
  cwspeed = cwspeed + 0.005 / (1- cwspeed);
  cwspeed = Math.min(1, cwspeed);
  deps.client.clockwise(cwspeed);
  console.log("clockwise");
}

else{
  cwspeed = 0;
  deps.client.clockwise(cwspeed);
}

if(counterclockwise == 1){
  ccwspeed = ccwspeed + 0.005 / (1- ccwspeed);
  ccwspeed = Math.min(1, ccwspeed);
  deps.client.counterClockwise(ccwspeed);
  console.log("counterclockwise");
}

else{
  ccwspeed = 0;
  deps.client.counterClockwise(ccwspeed);
}
if(takeoff ==1) {
  deps.client.takeoff();
}

if(land == 1){
  deps.client.land();
}

});

      
  
};

module.exports = autoPilot;


