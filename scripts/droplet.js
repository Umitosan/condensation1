/*jshint esversion: 6 */

function Droplet(x,y,c,s) {
  this.x = x;
  this.y = y;
  this.color = c;
  this.active = true;
  this.size = s;

  this.init = function() {
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.size*2,this.size*2);
  };

  this.update = function() {
    if (this.active) {
      this.x += ( randSign() * getRandomIntInclusive(0,this.size) );
      this.y += ( randSign() * getRandomIntInclusive(0,this.size) );
    }
    if ((this.x - this.size) < 0) {
      this.x += 50;
    }
    if ((this.x + this.size) > 1000) {
      this.x -= 50;
    }
    if ((this.y - this.size) < 0) {
      this.y += 50;
    }
    if ((this.y + this.size) > 1000) {
      this.y -= 50;
    }
  };

}
