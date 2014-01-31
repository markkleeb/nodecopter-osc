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
    , stop = 0
    , emergency = 0
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
    
     
      oscServer.on("message", function (msg, rinfo) {

                //console.log("Message:");
                //console.log(msg);  

                 if(msg[2][1] == 1){ 

                  upspeed = upspeed + 0.005 / (1- upspeed);
                  upspeed = Math.min(1, upspeed);
                  client.up(upspeed);
                  console.log("up");

                 }
                 else{
                  upspeed = 0;
                  client.up(upspeed);

                 }
                  if(msg[2][2] == 1){ 
                    downspeed = downspeed + 0.005 / (1- downspeed);
                     downspeed = Math.min(1, downspeed);
                    client.down(downspeed);
                    console.log("down");

                  }
                 else{ 
                  downspeed = 0;
                  client.down(downspeed);
                 }
                  if(msg[2][3] == 1){ 
                    leftspeed = leftspeed + 0.005 / (1- leftspeed);
                     leftspeed = Math.min(1, leftspeed);
                      client.left(leftspeed);
                    console.log("left");

                  }
                 else{ 
                   leftspeed = 0;
                    client.left(leftspeed);
                  }
                  if(msg[2][4] == 1){ 
                    rightspeed = rightspeed + 0.005 / (1- rightspeed);
                  rightspeed = Math.min(1, rightspeed);
                  client.right(rightspeed);
                  console.log("right");

                  }
                 else{ 
                   rightspeed = 0;
                   client.right(rightspeed);
                  }
                  if(msg[2][5] == 1){ 
                     forwardspeed = forwardspeed + 0.005 / (1- forwardspeed);
                    forwardspeed = Math.min(1, forwardspeed);
                   client.front(forwardspeed);
                  console.log("forward");

                  }
                 else{
                  forwardspeed = 0;
                  client.front(forwardspeed);

                  }
                if(msg[2][6] == 1){ 
                  backwardspeed = backwardspeed + 0.005 / (1- backwardspeed);
                  backwardspeed = Math.min(1, backwardspeed);
                  client.back(backwardspeed);
                  console.log("backward");

                }
                 else{
                  backwardspeed = 0;
                 client.back(backwardspeed);

                  }
                  if(msg[2][7] == 1){ 
                    cwspeed = cwspeed + 0.005 / (1- cwspeed);
                    cwspeed = Math.min(1, cwspeed);
                    client.clockwise(cwspeed);
                    console.log("clockwise");

                  }
                 else{

                  cwspeed = 0;
                  client.clockwise(cwspeed);

                  }
                 if(msg[2][8] == 1){ 
                  ccwspeed = ccwspeed + 0.005 / (1- ccwspeed);
                  ccwspeed = Math.min(1, ccwspeed);
                  client.counterClockwise(ccwspeed);
                 console.log("counterclockwise");

                 }
                 else{ ccwspeed = 0;
                 client.counterClockwise(ccwspeed);
                  }
                 if(msg[2][9] == 1){ 
                   client.takeoff();

                 }
                
                 if(msg[2][10] == 1){ 
                  client.land();
                 }
                 
                 if(msg[2][11] == 1){ 
                   client.stop();
                 }
                 
                 if(msg[2][12] ==1){
                  client.disableEmergency()
                   console.log("emergency");
                 }
               

              });


      
  
};

module.exports = autoPilot;


