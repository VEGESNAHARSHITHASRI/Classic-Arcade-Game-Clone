var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
		Score = doc.createElement('div');
		Life = doc.createElement('div');
        canvas.width = 505;
        canvas.height = 606;
        doc.body.appendChild(canvas);
	    doc.body.appendChild(Score);
	    doc.body.appendChild(Life);
	    Scorecontent = doc.createTextNode('Score = ');
	    Scoreupdate = doc.createTextNode(player.win);
	    Score.appendChild(Scorecontent);
	    Score.appendChild(Scoreupdate);
	    Lifecontent = doc.createTextNode('Life = ');
	    Lifeupdate = doc.createTextNode(player.life);
	    Life.appendChild(Lifecontent);
	    Life.appendChild(Lifeupdate);
        function main() {
        var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
		Scoreupdate.nodeValue = player.win;
		Lifeupdate.nodeValue = player.life;
        lastTime = now;
        win.requestAnimationFrame(main);
    }
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }
    function update(dt) {
        updateEntities(dt);
        //checkCollisions();
    }
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',   
                'images/stone-block.png',   
                'images/stone-block.png',   
                'images/grass-block.png',   
                'images/grass-block.png'    
            ],
            numRows = 6,
            numCols = 5,
            row, col;
            for (row = 0; row < numRows; row++) {
                for (col = 0; col < numCols; col++) {
                    ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                }
            }
            renderEntities();
        }
        function renderEntities() {
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            player.render();
        }
        function reset() {
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
        ]);
    Resources.onReady(init);
    global.ctx = ctx;
})
(this);
