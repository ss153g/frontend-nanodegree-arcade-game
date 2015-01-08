// random generator between intervals
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = 0;
	this.y = 60 + (getRandomInt(0,3) * 83);
	this.speed = getRandomInt(100, 300);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
		console.log(this.x + " " + this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += (this.speed * dt);
	if(this.x > ctx.canvas.width) {
		Enemy.call(this);
	}
//	console.log(this.y);
	if(this.x === player.x ){
		console.log('Collision');
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = 101 * 2;
	this.y = ctx.canvas.height - 200;
};
Player.prototype.update = function() {

};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
	switch(dir){
		case "left":
		if(this.x - 101 > -1) {
			this.x -= 101;
		}
		break;
		case "up":
		if(this.y - 83 > -10) {
			this.y -= 83;
		}
		break;
		case "right":
		if(this.x + 101 < ctx.canvas.width) {
			this.x += 101;
		}
		break;
		case "down":
		if(this.y + 83 < (ctx.canvas.height - 200 + 1)) {
			this.y += 83;
		}
		break;
	}
	console.log(this.x +" "+ this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
