PILOT_ACCELERATION = 0.04;


var up = 0;

(function(window, document, $, undefined) {
        'use strict';


        /*
         * Constructuor
         */
        var autoPilot = function autoPilot(cockpit, oscServer) {


                console.log("Loading autopilot plugin.");
                this.cockpit = cockpit;
                this.speed = 0;
                this.moving = false;
                this.list = {}
               
                // Register the various event handlers
                this.listen();

                // Setup a timer to send motion command
                var self = this;
                setInterval(function(){self.sendCommands()},100);

                
        };

        /*
         * Register keyboard event listener
         */
        autoPilot.prototype.listen = function listen() {
                var pilot = this;
                $(document).keydown(function(ev) {
                        //pilot.keyDown(ev);
                });

                $(document).keyup(function(ev) {
                        //pilot.keyUp(ev);
                });

        };

       

        

        /*
         * Triggered by a timer, check for active keys
         * and send the appropriate motion commands
         */
        autoPilot.prototype.sendCommands = function() {
                for (var k in this.list) {
                    var cmd = Keymap[k];
                    // Send the command
                    this.cockpit.socket.emit("/pilot/" + "move", {
                        action : cmd.action,
                        speed : this.list[k]
                    });

                    // Update the speed
                    this.list[k] = this.list[k] + PILOT_ACCELERATION / (1 - this.list[k]);
                    this.list[k] = Math.min(1, this.list[k]);
                }
        }

    


        window.Cockpit.plugins.push(autoPilot);

}(window, document, jQuery));
