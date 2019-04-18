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
      this.x += ( randSign() * getRandomIntInclusive(0,3) );
      this.y += ( randSign() * getRandomIntInclusive(0,3) );
    }
  };

}
