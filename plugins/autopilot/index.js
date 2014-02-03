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
    ,lupspeed=0
,ldownspeed=0
,lbackwardspeed=0
,lforwardspeed=0
,lrightspeed=0
,lleftspeed=0
,lccwspeed=0
,lcwspeed=0
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

                 if(msg[2][1] == 1 && upspeed < 1){ 

                  upspeed = upspeed + 0.001 / (1- upspeed);
                  upspeed = Math.min(1, upspeed);
                  if (lupspeed != upspeed) { lupspeed = upspeed;
                  client.up(upspeed);
                  console.log("up "+upspeed);
                  }
                 }
                 else{
                  upspeed = 0;
                  if (lupspeed != upspeed) { lupspeed = upspeed;
                  client.up(upspeed);
                  console.log("up off");
                  }

                 }
                  if(msg[2][2] == 1){ 
                    downspeed = downspeed + 0.001 / (1- downspeed);
                     downspeed = Math.min(1, downspeed);
if (ldownspeed != downspeed) { ldownspeed = downspeed;

                    client.down(downspeed);
                    console.log("down " +downspeed);
}

                  }
                 else{ 
                  downspeed = 0;
if (ldownspeed != downspeed) { ldownspeed = downspeed;
                  client.down(downspeed);
                    console.log("down off");
}
                 }
                  if(msg[2][3] == 1){ 
                    leftspeed = leftspeed + 0.001 / (1- leftspeed);
                     leftspeed = Math.min(1, leftspeed);
if (lleftspeed != leftspeed) { lleftspeed = leftspeed;
                      client.left(leftspeed);
                    console.log("left "+leftspeed);
}

                  }
                 else{ 
                   leftspeed = 0;
if (lleftspeed != leftspeed) { lleftspeed = leftspeed;
                    client.left(leftspeed);
                    console.log("left off");
}
                  }
                  if(msg[2][4] == 1){ 
                    rightspeed = rightspeed + 0.001 / (1- rightspeed);
                  rightspeed = Math.min(1, rightspeed);
if (lrightspeed != rightspeed) { lrightspeed = rightspeed;
                  client.right(rightspeed);
                  console.log("right " + rightspeed);
}

                  }
                 else{ 
                   rightspeed = 0;
if (lrightspeed != rightspeed) { lrightspeed = rightspeed;
                   client.right(rightspeed);
                  console.log("right off");
}
                  }
                  if(msg[2][5] == 1){ 
                     forwardspeed = forwardspeed + 0.01 / (1- forwardspeed);
                    forwardspeed = Math.min(1, forwardspeed);
if (lforwardspeed != forwardspeed) { lforwardspeed = forwardspeed;
                   client.front(forwardspeed);
                  console.log("forward " + forwardspeed);
}

                  }
                 else{
                  forwardspeed = 0;
if (lforwardspeed != forwardspeed) { lforwardspeed = forwardspeed;
                  client.front(forwardspeed);
                  console.log("forward off");

}
                  }
                if(msg[2][6] == 1){ 
                  backwardspeed = backwardspeed + 0.005 / (1- backwardspeed);
                  backwardspeed = Math.min(1, backwardspeed);
if (lbackwardspeed != backwardspeed) { lbackwardspeed = backwardspeed;
                  client.back(backwardspeed);
                  console.log("backward " + backwardspeed);
}

                }
                 else{
                  backwardspeed = 0;
if (lbackwardspeed != backwardspeed) { lbackwardspeed = backwardspeed;
                 client.back(backwardspeed);
                  console.log("backward off");
}
                  }
                  if(msg[2][7] == 1){ 
                    cwspeed = cwspeed + 0.005 / (1- cwspeed);
                    cwspeed = Math.min(1, cwspeed);
if (lcwspeed != cwspeed) { lcwspeed = cwspeed;
                    client.clockwise(cwspeed);
                    console.log("clockwise " + cwspeed);
}
                  }
                 else{

                  cwspeed = 0;
if (lcwspeed != cwspeed) { lcwspeed = cwspeed;
                  client.clockwise(cwspeed);
                    console.log("clockwise off");
}

                  }
                 if(msg[2][8] == 1){ 
                  ccwspeed = ccwspeed + 0.005 / (1- ccwspeed);
                  ccwspeed = Math.min(1, ccwspeed);
if (lccwspeed != ccwspeed) { lccwspeed = ccwspeed;
                  client.counterClockwise(ccwspeed);
                 console.log("counterclockwise " + ccwspeed);
}

                 }
                 else{ ccwspeed = 0;
if (lccwspeed != ccwspeed) { lccwspeed = ccwspeed;
                 client.counterClockwise(ccwspeed);
                 console.log("counterclockwise off");
}
                  }
                 if(msg[2][9] == 1){ 
                  if (!takeoff)
                {
                    takeoff = 1;
                    console.log("takeoff");
                   client.takeoff();
                }


                 }
                
                 if(msg[2][10] == 1){ 
                    console.log("land");
                  client.land();
                  takeoff = 0;
                 }
                 
                 if(msg[2][11] == 1){ 
                    console.log("stop");
                   client.stop();
                 }
                 
                 if(msg[2][12] ==1){
                  client.disableEmergency()
                   console.log("emergency");
                 }
               

              });
  


      
  
};

module.exports = autoPilot;


