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

	// Identifying the starting point for Enemy
	// using this.x and this.y
	// This variable is being called in the render engine.
	this.x = 0;

	// Using a random function to make each instance of Enemy in a random row
	// The rows are 83 pixels tall in render functions
	// Through trial and error we have determined value of 60 as a starting buffer.
	this.y = 60 + (getRandomInt(0,3) * 83);

	// Using the random function to assign varying speed to each instance of Enemy.
	this.speed = getRandomInt(100, 300);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

	// Logging the initial value of each Enemy for coding collision function!
	// console.log(this.x + " " + this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

	// Moving the position of the Enemy by adding the new distance to the original position.
	// The distance is calculated by the speed of that instance * the delta ticks.
	this.x += (this.speed * dt);

	// Monitoring the position of the object after move
	// If the position is outside the canvas then we re-initialize the object.
	if(this.x > ctx.canvas.width) {

		// Calling the constructor of the specific instance of enemy that went outside the canvas.
		this.constructor();
	}
	// Since we are already calling this function for position each time we iterate through the 'allEnemies' array
    // the collision logic should be called from here to avoid iterating through the same array.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Defining the Player class with it's variables.
var Player = function(){

	// Using the sprite as defined in Resources.
	this.sprite = 'images/char-boy.png';

	// Starting from the center by using column width from Engine.
	this.x = 101 * 2;

	// Starting from 200 pixels above from the bottom of the canvas.
	this.y = 60 + (4 * 83);
};

// Creating a fallback to Enemy methods for Player, where a Player method does not exist - like render().
Player.prototype = Object.create(Enemy.prototype);

// Pointing the Player constructor back to Player instead of Enemy.
Player.prototype.constructor = Player;

// Creating a separate update() method for Player instead of using Enemy's method.
Player.prototype.update = function(){
    /* Can't seem to find a reason to call this method */
};

// Creating a new handle method for Player - this will be unique to Player.
Player.prototype.handleInput = function(dir) {

// This is refactoring of a switch based code that I wrote earlier
// This code creates a JSON object for each acceptable direction
//	bound -- this object has the lowest and highest acceptable value for the canvas.
//			the up/down value is based on the height of the image object. 101x171.
//	move -- this object has the value of movement
//			the value number is obtained from values used in Engine object to paint the screen.
//	xy -- this object is used to access the appropriate "this" variable for movement.

	var movement = {
		'left' : {
			'bound' : [ -1, ctx.canvas.width],
			'move'  : -101,
			'xy'  : 'x'
		},
		'right' : {
			'bound' : [ -1, ctx.canvas.width],
			'move'  : 101,
			'xy'  : 'x'
		},
		'up' : {
			'bound' : [-1, (ctx.canvas.height - 171 + 1 )],
			'move'  : -83,
			'xy'  : 'y'
		},
		'down' : {
			'bound' : [-1, (ctx.canvas.height - 171 + 1 )],
			'move'  : 83,
			'xy'  : 'y'
		}
	};

	// The first check is to make sure that we are not firing our code for any undefined values.
	// While using the "switch" based code, this was easily handled by the "case"

	if (dir !== undefined) {

		// In this variable we are taking the current X or Y value based on the direction translation in JSON
		// We are then adding or subtracting it based on the sign value of the move object in JSON
		// we are storing the value in finalValue variable.
		var finalValue = this[movement[dir].xy] + movement[dir].move;

		// After the final value is calculated we are making sure the value is within the bound
		// set for each direction in the JSON
		// If the value is within the bounds then we update the X or Y value to the new value;
		if(finalValue > movement[dir].bound[0] && finalValue < movement[dir].bound[1]) {
			this[movement[dir].xy] = finalValue;
		}
	}

	// Use the logging to determine the value after move.
//	console.log('player: '+this.x +' '+ this.y);
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
