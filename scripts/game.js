/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.updateDuration = updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.boxy = undefined;
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.droplets = undefined;

  this.init = function() {
    this.bg.src = 'bg1.png';
    this.boxy = new Box(20,20,myColors.red,20,1);
    this.droplets = [];
    this.droplets.push(new Droplet(500,500,myColors.red,4));
    this.droplets[0].active = false;
    for (let i = 0; i < 3000; i++) {
      this.createRandDroplet();
    }
    this.lastUpdate = performance.now();
  };

  this.createRandDroplet = function() {
    let tmpDroplet = new Droplet( /*   x   */ getRandomIntInclusive(2,998),
                                  /*   y   */ getRandomIntInclusive(2,998),
                                  /* color */ randColor("rgba"),
                                  /* size  */ 2
                                  );
    this.droplets.push(tmpDroplet);
  };

  this.pauseIt = function() {
    myGame.paused = true;
    // this.pausedTxt.show = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
    // this.pausedTxt.show = false;
    // this prevents pac from updating many times after UNpausing
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.checkFreezeDroplet = function() {
    for (let i = 0; i < this.droplets.length; i++) {
      if (this.droplets[i].active) {
        for (let j = 0; j < this.droplets.length; j++) {
          if (this.droplets[j].active === false) {
            if (Math.abs(this.droplets[i].x - this.droplets[j].x) <= this.droplets[j].size) {
              if (Math.abs(this.droplets[i].y - this.droplets[j].y) <= this.droplets[j].size) {
                this.droplets[i].active = false;
              }
            }
          }
        }
      }
    }
  };

  this.drawBG = function() { // display background over canvas
    ctx.imageSmoothingEnabled = false;  // turns off AntiAliasing
    ctx.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {  // draw everything!
    // this.boxy.draw();
    ctx.fillStyle = myColors.red;
    for (let i = 0; i < this.droplets.length; i++) {
      this.droplets[i].draw();
    }
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds
            this.timeGap = performance.now() - this.lastUpdate;

            if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
              let timesToUpdate = this.timeGap / this.updateDuration;
              for (let i=1; i < timesToUpdate; i++) { // update children objects
                // if (timesToUpdate > 2) {
                //   console.log('timesToUpdate = ', timesToUpdate);
                // }
                // general update area
                // this.boxy.update();
                for (let i = 0; i < this.droplets.length; i++) {
                  this.droplets[i].update();
                }
                this.checkFreezeDroplet();
              }
              this.lastUpdate = performance.now();
            } // end if

            // if (this.mode === "draw") { // run this every update cycle regardless of timing
            //   // general draw area
            // } else {
            //   // mode is none
            // }

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
