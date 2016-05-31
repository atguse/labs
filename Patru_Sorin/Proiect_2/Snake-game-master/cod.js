var
//Constante
COLS = 26,
ROWS = 26,
EMPTY = 0,
SNAKE = 1,
FRUIT = 2,
LEFT  = 0,
UP    = 1,
RIGHT = 2,
DOWN  = 3,
KEY_LEFT  = 37,
KEY_UP    = 38,
KEY_RIGHT = 39,
KEY_DOWN  = 40,

canvas,
ctx,	  // CanvasRenderingContext2d
keystate, // Object pentru imput de la tastatura
frames,
score;
//Matricea in care se desfasoara jocul
grid = {
	width: null,
	height: null,
	_grid: null,  //valori

  //Initializazare matrice
	init: function(d, c, r) {
		this.width = c;
		this.height = r;
		this._grid = [];
		for (var x=0; x < c; x++) {
			this._grid.push([]);
			for (var y=0; y < r; y++) {
				this._grid[x].push(d);
			}
		}
	},

  //Schimba valoarea din matrice aflata la pozitia x si y
	set: function(val, x, y) {
		this._grid[x][y] = val;
	},
	//Metoda get pentru valoarea de la x si y
	get: function(x, y) {
		return this._grid[x][y];
	}
}

//snake=coada cu prioritati
snake = {
	direction: null,
	last: null,		//ultimul obiect din lista
	_queue: null,	 //valori

  //Initializare coada
	init: function(d, x, y) {
		this.direction = d;
		this._queue = [];
		this.insert(x, y);
	},

  //Adauga element
	insert: function(x, y) {
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},

  //Elimina si returneaza primul element
	remove: function() {
		return this._queue.pop();
	}
};

//Pune mancarea intr-un punct aleatoriu din matrice
function setFood() {
	var empty = [];

	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			if (grid.get(x, y) === EMPTY) {
				empty.push({x:x, y:y});
			}
		}
	}


	var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
	grid.set(FRUIT, randpos.x, randpos.y);
}
//-----------------------------------------MAIN--------------------------------------------
function main() {
	// Creere si initializare canvas
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	// Setare font pentru scor
	ctx.font = "12px Helvetica";
	frames = 0;
	keystate = {};


	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	init();
	loop();
}

//Resetare obiecte
function init() {
	score = 0;
	grid.init(EMPTY, COLS, ROWS);
	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);
	setFood();
}

function loop() {
	update();
	draw();
	window.requestAnimationFrame(loop, canvas);
}

function update() {
	frames++;
	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
		snake.direction = LEFT;
	}
	if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}
	if (frames%5 === 0) {
		var nx = snake.last.x;
		var ny = snake.last.y;
		switch (snake.direction) {
			case LEFT:
				nx--;
				break;
			case UP:
				ny--;
				break;
			case RIGHT:
				nx++;
				break;
			case DOWN:
				ny++;
				break;
		}
		// Verificam daca jocul sa terminat
		if (0 > nx || nx > grid.width-1  ||
			0 > ny || ny > grid.height-1 ||
			grid.get(nx, ny) === SNAKE
		) {
			return init();
		}
		// Verificam daca am ajuns la fruct
		if (grid.get(nx, ny) === FRUIT) {
			score++;
			setFood();
		} else {
			var tail = snake.remove();
			grid.set(EMPTY, tail.x, tail.y);
		}
		grid.set(SNAKE, nx, ny);
		snake.insert(nx, ny);
	}
}

//Grafica
function draw() {
  // Calculam dimensiunea celulelor
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// Parcurgem matricea si desenam celulele
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {

			switch (grid.get(x, y)) {
				case EMPTY:
					ctx.fillStyle = "#fff";
					break;
				case SNAKE:
					ctx.fillStyle = "#02f";
					break;
				case FRUIT:
					ctx.fillStyle = "#f00";
					break;
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}

	ctx.fillStyle = "#000";
	ctx.fillText("SCORE: " + score, 10, canvas.height-10);
}
