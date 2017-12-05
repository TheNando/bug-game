var scaleX = 101;
var scaleY = 83.5;
var offsetY = (0.5 * scaleY);

var Entity = function (x, y) {
    this.x = x;
    this.y = y;
}

// Draw the entity on the screen, required method for game
Entity.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Inheritance
    Entity.call(this, x, y);

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this
};

// Don't need this. Inherited from Entity
// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    // Inheritance
    Entity.call(this, x * scaleX, (y * scaleY) - (0.5 * scaleY));

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this
};

Player.prototype.handleInput = function (dir) {
    var newX;
    var newY;

    switch (dir) {
        case 'left':
            newX = this.x - scaleX;

            // math.max will return the parameter that is higher so the player can't go into a negative position
            this.x = Math.max(newX, 0);
            break;
        case 'up':
            newY = this.y - scaleY;
            this.y = Math.max(newY, -offsetY);
            break;
        case 'right':
            newX = this.x + scaleX;
            this.x = Math.min(newX, 4 * scaleX);
            break;
        case 'down':
            newY = this.y + scaleY;
            this.y = Math.min(newY, 5 * scaleY - offsetY);
            break;

        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
window.allEnemies = [];
window.player = new Player(2, 5);

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