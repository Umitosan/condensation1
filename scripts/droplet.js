/*jshint esversion: 6 */

function Droplet(x,y,c) {
  this.x = x;
  this.y = y;
  this.color = c;

  this.init = function() {
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,2,2);
  };

  this.update = function() {
  };

}
