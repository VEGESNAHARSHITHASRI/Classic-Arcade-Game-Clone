'use strict';
var getRandomPosition = function() {
		var number = Math.floor((Math.random() * 3) + 1);
		return number;
};

var Enemy = function() {
	this.sprite = 'images/enemy-bug.png';
	this.x = 0;
	this.y = (getRandomPosition())*70;
	this.speed = (getRandomPosition())*150;
};

Enemy.prototype.update = function(dt) {
	if(this.x >= 505){
		this.x = 0;
		this.y = (getRandomPosition())*70;
	}
	this.x += this.speed * dt;
};

Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 410;
	this.speed = 20;
	this.win = 0;
	this.life = 5;
	this.game = true;
};

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
Player.prototype.reset = function() {
		this.x = 200;
		this.y = 410;
};

Player.prototype.gameReset = function() {
		this.life = 5;
		this.win = 0;
		this.game = true;
		this.reset();
};

Player.prototype.score_win = function() {
	this.win += 1;
	alert('YOU WIN');
	this.reset();
};

Player.prototype.score_lost = function() {
	this.win -= 1;
	this.life -= 1;
};

Player.prototype.checkCollisions = function(){
	var len = 	 allEnemies.length;
		 for (var i = 0; i < len; i++) {
        if ((allEnemies[i].x) <= this.x + 30 &&
            (allEnemies[i].x + 30) >= (this.x) &&
            (allEnemies[i].y)<= this.y + 30 &&
            (allEnemies[i].y + 30) >= (this.y)) {
					this.score_lost();
					alert('YOU LOSE');
					this.reset();
        }
    }

};

Player.prototype.checkBorder_for_winner = function(){
	if (this.y <=10)
	{
				this.score_win();
	}
};

Player.prototype.checkBorder = function(){
	if (this.x <= 0 || this.x >= 420 || this.y <=0 || this.y >=430)
	{
			this.reset();
	}
};

Player.prototype.update = function() {
	this.checkCollisions();
	this.checkBorder();
	this.checkBorder_for_winner();
	if (this.game == true){
		this.checkGameOver();
	}
	if(this.y <= 5){
		this.reset();
		this.score()
			
	}
};

Player.prototype.checkGameOver = function(){
	if (this.life == 0){
		alert('Game Over!!!');
		this.game = false;
		this.gameReset();
	}
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(action_p) {
	if(action_p == 'left'){
		this.x -= this.speed;
	}
	if(action_p == 'right'){
		this.x += this.speed;
	}
	if(action_p == 'up'){
		this.y -= this.speed;
	}
	if(action_p == 'down'){
		this.y += this.speed;
	}
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

