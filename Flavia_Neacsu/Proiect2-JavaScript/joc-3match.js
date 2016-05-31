window.onload = function(){ //apeleaza functia cand pagina e incarcata complet  
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");
    
    var lastframe = 0;  // Timing and frames per second
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
    var drag = false;  // Mouse dragging
    
    // Level object
    var level = {
        x: 250,         
        y: 113,         
        columns: 9,     
        rows: 9,        
        tilewidth: 40,  // Visual width of a tile
        tileheight: 40, // Visual height of a tile
        tiles: [],      // The two-dimensional tile array
        selectedtile: { selected: false, column: 0, row: 0 }
    };

    var tilecolors = [[255, 102, 102],
                      [255, 178, 102],
                      [102, 255, 102],
                      [102, 178, 255],
                      [178, 102, 255],
                      [255, 204, 255],
                      [51, 51, 255]];
    
    // Clusters and moves that were found
    var clusters = [];  // { column, row, length, horizontal }
    var moves = [];     // { column1, row1, column2, row2 }

    var currentmove = { column1: 0, row1: 0, column2: 0, row2: 0 }; // Current move
    
    // Game states
    var gamestates = { init: 0, ready: 1, resolve: 2 };
    var gamestate = gamestates.init;
    
    var score = 0;
    
    // Animation variables
    var animationstate = 0;
    var animationtime = 0;
    var animationtimetotal = 0.3;
    
    var showmoves = false;  // Show available moves
    var gameover = false;  // Game Over
    
    var buttons = [ { x: 30, y: 240, width: 150, height: 50, text: "New Game"},
                    { x: 30, y: 300, width: 150, height: 50, text: "Show Moves"}];
    
    // Initializare
    function init() {
        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);
        
        // Initialize the tile array
        for (var i=0; i<level.columns; i++) {
            level.tiles[i] = [];
            for (var j=0; j<level.rows; j++) {
                level.tiles[i][j] = { type: 0, shift:0 } // Define a tile type and a shift parameter for animation
            }
        }
        
        newGame();
        main(0); // Enter main loop
    }
    
    // Main loop
    function main(tframe) {
        window.requestAnimationFrame(main); // Request animation frames
        update(tframe);  // Update and render the game
        render();
    }
    
    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        
        updateFps(dt);  // Update the fps counter
        
        if (gamestate == gamestates.ready) { // Game is ready for player input
            // Check for game over
            if (moves.length <= 0) {
                gameover = true;
            }
        } else if (gamestate == gamestates.resolve) { // Game is busy resolving and animating clusters
            animationtime += dt;
            
            if (animationstate == 0) {
                // Clusters need to be found and removed
                if (animationtime > animationtimetotal) {
                    findClusters();
                    
                    if (clusters.length > 0) {
                        // Add points to the score
                        for (var i=0; i<clusters.length; i++) {
                            score += 100 * (clusters[i].length - 2);  // Add extra points for longer clusters
                        }
                    
                        removeClusters(); // Clusters found, remove them
                        
                        animationstate = 1;  // Tiles need to be shifted
                    } else {
                        gamestate = gamestates.ready; // No clusters found, animation complete
                    }
                    animationtime = 0;
                }
            } else if (animationstate == 1) {  // Tiles need to be shifted
                if (animationtime > animationtimetotal) {
                    shiftTiles();
                    // New clusters need to be found
                    animationstate = 0;
                    animationtime = 0;
                    
                    findClusters(); // Check if there are new clusters
                    if (clusters.length <= 0) {
                        gamestate = gamestates.ready; // Animation complete
                    }
                }
            } else if (animationstate == 2) { // Swapping tiles animation
                if (animationtime > animationtimetotal) {
                    swap(currentmove.column1, currentmove.row1, currentmove.column2, currentmove.row2);  // Swap the tiles

                    findClusters(); // Check if the swap made a cluster
                    if (clusters.length > 0) {
                        // Valid swap, found one or more clusters
                        // Prepare animation states
                        animationstate = 0;
                        animationtime = 0;
                        gamestate = gamestates.resolve;
                    } else {
                        // Invalid swap, Rewind swapping animation
                        animationstate = 3;
                        animationtime = 0;
                    }
                    
                    // Update moves and clusters
                    findMoves();
                    findClusters();
                }
            } else if (animationstate == 3) {
                // Rewind swapping animation
                if (animationtime > animationtimetotal) {
                    // Invalid swap, swap back
                    swap(currentmove.column1, currentmove.row1, currentmove.column2, currentmove.row2);
                    gamestate = gamestates.ready;  // Animation complete
                }
            }
            
            // Update moves and clusters
            findMoves();
            findClusters();
        }
    }
    
    function updateFps(dt) {
        if (fpstime > 0.25) {
            fps = Math.round(framecount / fpstime);  // Calculate fps
            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }
        
        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }
    
    // Draw text that is centered
    function drawCenterText(text, x, y, width) {
        var textdim = context.measureText(text);
        context.fillText(text, x + (width-textdim.width)/2, y);
    }
    
    // Render the game
    function render() {
        drawFrame(); // Draw the frame
        
        // Draw score
        context.fillStyle = "#000000";
        context.font = "24px Verdana";
        drawCenterText("Score:", 30, level.y+40, 150);
        drawCenterText(score, 30, level.y+70, 150);

        drawButtons();  // Draw buttons
        
        // Draw level background
        var levelwidth = level.columns * level.tilewidth;
        var levelheight = level.rows * level.tileheight;
        context.fillStyle = "#000000";
        context.fillRect(level.x - 4, level.y - 4, levelwidth + 8, levelheight + 8);

        renderTiles(); // Render tiles
        renderClusters();  // Render clusters
        
        if (showmoves && clusters.length <= 0 && gamestate == gamestates.ready) {
            renderMoves();   // Render moves, when there are no clusters
        }
        
        // Game Over overlay
        if (gameover) {
            context.fillStyle = "rgba(0, 0, 0, 0.8)";
            context.fillRect(level.x, level.y, levelwidth, levelheight);
            
            context.fillStyle = "#ffffff";
            context.font = "24px Verdana";
            drawCenterText("Game Over!", level.x, level.y + levelheight / 2 + 10, levelwidth);
        }
    }

    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#d0d0d0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#e8eaec";
        context.fillRect(1, 1, canvas.width-2, canvas.height-2);
        
        // Draw header
        context.fillStyle = "#303030";
        context.fillRect(0, 0, canvas.width, 65);
        
        // Draw title
        context.fillStyle = "#ffffff";
        context.font = "24px Verdana";
        context.fillText("Match3 Game", 10, 30);
        
        /*// Display fps
        context.fillStyle = "#ffffff";
        context.font = "12px Verdana";
        context.fillText("Fps: " + fps, 13, 50);*/
    }

    function drawButtons() {
        for (var i=0; i<buttons.length; i++) {
            // Draw button shape
            context.fillStyle = "#000000";
            context.fillRect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
            
            // Draw button text
            context.fillStyle = "#ffffff";
            context.font = "18px Verdana";
            var textdim = context.measureText(buttons[i].text);
            context.fillText(buttons[i].text, buttons[i].x + (buttons[i].width-textdim.width)/2, buttons[i].y+30);
        }
    }

    function renderTiles() {
        for (var i=0; i<level.columns; i++) {
            for (var j=0; j<level.rows; j++) {
                var shift = level.tiles[i][j].shift;   // Get the shift of the tile for animation
                var coord = getTileCoordinate(i, j, 0, (animationtime / animationtimetotal) * shift); // Calculate the tile coordinates
                
                // Check if there is a tile present
                if (level.tiles[i][j].type >= 0) {
                    var col = tilecolors[level.tiles[i][j].type];  // Get the color of the tile
                    drawTile(coord.tilex, coord.tiley, col[0], col[1], col[2]); // Draw the tile using the color
                }
                
                // Draw the selected tile
                if (level.selectedtile.selected) {
                    if (level.selectedtile.column == i && level.selectedtile.row == j) {
                        drawTile(coord.tilex, coord.tiley, 255, 0, 0); // Draw a red tile
                    }
                }
            }
        }
        
        // Render the swap animation
        if (gamestate == gamestates.resolve && (animationstate == 2 || animationstate == 3)) {
            // Calculate the x and y shift
            var shiftx = currentmove.column2 - currentmove.column1;
            var shifty = currentmove.row2 - currentmove.row1;

            // First tile
            var coord1 = getTileCoordinate(currentmove.column1, currentmove.row1, 0, 0);
            var coord1shift = getTileCoordinate(currentmove.column1, currentmove.row1, (animationtime / animationtimetotal) * shiftx, (animationtime / animationtimetotal) * shifty);
            var col1 = tilecolors[level.tiles[currentmove.column1][currentmove.row1].type];
            
            // Second tile
            var coord2 = getTileCoordinate(currentmove.column2, currentmove.row2, 0, 0);
            var coord2shift = getTileCoordinate(currentmove.column2, currentmove.row2, (animationtime / animationtimetotal) * -shiftx, (animationtime / animationtimetotal) * -shifty);
            var col2 = tilecolors[level.tiles[currentmove.column2][currentmove.row2].type];
            
            // Draw a black background
            drawTile(coord1.tilex, coord1.tiley, 0, 0, 0);
            drawTile(coord2.tilex, coord2.tiley, 0, 0, 0);
            
            // Change the order, depending on the animation state
            if (animationstate == 2) {
                // Draw the tiles
                drawTile(coord1shift.tilex, coord1shift.tiley, col1[0], col1[1], col1[2]);
                drawTile(coord2shift.tilex, coord2shift.tiley, col2[0], col2[1], col2[2]);
            } else {
                // Draw the tiles
                drawTile(coord2shift.tilex, coord2shift.tiley, col2[0], col2[1], col2[2]);
                drawTile(coord1shift.tilex, coord1shift.tiley, col1[0], col1[1], col1[2]);
            }
        }
    }

    function getTileCoordinate(column, row, columnoffset, rowoffset) {
        var tilex = level.x + (column + columnoffset) * level.tilewidth;
        var tiley = level.y + (row + rowoffset) * level.tileheight;
        return { tilex: tilex, tiley: tiley};
    }
    
    function drawTile(x, y, r, g, b) {
        context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        context.fillRect(x + 2, y + 2, level.tilewidth - 4, level.tileheight - 4);
    }
    
    function renderClusters() {
        for (var i=0; i<clusters.length; i++) {
            var coord = getTileCoordinate(clusters[i].column, clusters[i].row, 0, 0);  // Calculate the tile coordinates
            
            if (clusters[i].horizontal) {
                context.fillStyle = "#00ff00";  // Draw a horizontal line
                context.fillRect(coord.tilex + level.tilewidth/2, coord.tiley + level.tileheight/2 - 4, (clusters[i].length - 1) * level.tilewidth, 8);
            } else {
                context.fillStyle = "#0000ff";  // Draw a vertical line
                context.fillRect(coord.tilex + level.tilewidth/2 - 4, coord.tiley + level.tileheight/2, 8, (clusters[i].length - 1) * level.tileheight);
            }
        }
    }

    function renderMoves() {
        for (var i=0; i<moves.length; i++) {
            // Calculate coordinates of tile 1 and 2
            var coord1 = getTileCoordinate(moves[i].column1, moves[i].row1, 0, 0);
            var coord2 = getTileCoordinate(moves[i].column2, moves[i].row2, 0, 0);
            
            context.strokeStyle = "#ff0000"; // Draw a line from tile 1 to tile 2
            context.beginPath();
            context.moveTo(coord1.tilex + level.tilewidth/2, coord1.tiley + level.tileheight/2);
            context.lineTo(coord2.tilex + level.tilewidth/2, coord2.tiley + level.tileheight/2);
            context.stroke();
        }
    }
    
    function newGame() {
        
        score = 0;
        gamestate = gamestates.ready;
		gameover = false;
        createLevel();
        
        // Find initial clusters and moves
        findMoves();
        findClusters(); 
    }
    
    // Create random level
    function createLevel() {
        var done = false;
        
        // Keep generating levels until it is correct
        while (!done) {
			// random tiles
            for (var i=0; i<level.columns; i++) {
                for (var j=0; j<level.rows; j++) {
                    level.tiles[i][j].type = getRandomTile();
                }
            }
            
            resolveClusters();
            findMoves();
            
            if (moves.length > 0) {
                done = true;
            }
        }
    }
    
    function getRandomTile() {
        return Math.floor(Math.random() * tilecolors.length);
    }
    
    function resolveClusters() {
        
		findClusters();
        
        while (clusters.length > 0) {
            removeClusters();
            shiftTiles();
            findClusters();
        }
    }
    
    function findClusters() {
        clusters = []
        
        // Find horizontal clusters
        for (var j=0; j<level.rows; j++) {
            var matchlength = 1;
            for (var i=0; i<level.columns; i++) {
                var checkcluster = false;
                
                if (i == level.columns-1) {
                    // Last tile
                    checkcluster = true;
                } else {
                    if (level.tiles[i][j].type == level.tiles[i+1][j].type &&
                        level.tiles[i][j].type != -1) {
                        // Same type as the previous tile
                        matchlength += 1;
                    } else {
                        // Different type
                        checkcluster = true;
                    }
                }
                
                // Check if there was a cluster
                if (checkcluster) {
                    if (matchlength >= 3) {
                        // Found a horizontal cluster
                        clusters.push({ column: i+1-matchlength, row:j,
                                        length: matchlength, horizontal: true });
                    }
                    
                    matchlength = 1;
                }
            }
        }

        // Find vertical clusters
        for (var i=0; i<level.columns; i++) {
            var matchlength = 1;
            for (var j=0; j<level.rows; j++) {
                var checkcluster = false;
                
                if (j == level.rows-1) {
                    // Last tile
                    checkcluster = true;
                } else {
                    if (level.tiles[i][j].type == level.tiles[i][j+1].type &&
                        level.tiles[i][j].type != -1) {
                        // Same type as the previous tile
                        matchlength += 1;
                    } else {
                        // Different type
                        checkcluster = true;
                    }
                }
                
                // Check if there was a cluster
                if (checkcluster) {
                    if (matchlength >= 3) {
                        // Found a vertical cluster
                        clusters.push({ column: i, row:j+1-matchlength,
                                        length: matchlength, horizontal: false });
                    }
                    
                    matchlength = 1;
                }
            }
        }
    }

    function findMoves() {
        moves = [] // Reset moves
        
        // Check horizontal swaps
        for (var j=0; j<level.rows; j++) {
            for (var i=0; i<level.columns-1; i++) {
                swap(i, j, i+1, j); // Swap, find clusters and swap back
                findClusters();
                swap(i, j, i+1, j);
                // Check if the swap made a cluster
                if (clusters.length > 0) {
                    moves.push({column1: i, row1: j, column2: i+1, row2: j});  // Found a move
                }
            }
        }
        
        // Check vertical swaps
        for (var i=0; i<level.columns; i++) {
            for (var j=0; j<level.rows-1; j++) {
                swap(i, j, i, j+1); // Swap, find clusters and swap back
                findClusters();
                swap(i, j, i, j+1);
                // Check if the swap made a cluster
                if (clusters.length > 0) {
                    moves.push({column1: i, row1: j, column2: i, row2: j+1}); // Found a move
                }
            }
        }
		
        clusters = []  // Reset clusters
    }
    
    // Loop over the cluster tiles and execute a function
    function loopClusters(func) {
        for (var i=0; i<clusters.length; i++) {
            //  { column, row, length, horizontal }
            var cluster = clusters[i];
            var coffset = 0;
            var roffset = 0;
            for (var j=0; j<cluster.length; j++) {
                func(i, cluster.column+coffset, cluster.row+roffset, cluster);
                
                if (cluster.horizontal) {
                    coffset++;
                } else {
                    roffset++;
                }
            }
        }
    }

    function removeClusters() {
        // type of the tiles = -1 -> a removed tile
        loopClusters(function(index, column, row, cluster) { level.tiles[column][row].type = -1; });

        // Calculate how much a tile should be shifted downwards
        for (var i=0; i<level.columns; i++) {
            var shift = 0;
            for (var j=level.rows-1; j>=0; j--) {
                // Loop from bottom to top
                if (level.tiles[i][j].type == -1) {
                    // Tile is removed, increase shift
                    shift++;
                    level.tiles[i][j].shift = 0;
                } else {
                    // Set the shift
                    level.tiles[i][j].shift = shift;
                }
            }
        }
    }

    function shiftTiles() {
        // Shift tiles and insert new tiles
        for (var i=0; i<level.columns; i++) {
            for (var j=level.rows-1; j>=0; j--) {
                // Loop from bottom to top
                if (level.tiles[i][j].type == -1) {
                    level.tiles[i][j].type = getRandomTile();  // Insert new random tile
                } else {
                    var shift = level.tiles[i][j].shift; // Swap tile to shift it
                    if (shift > 0) {
                        swap(i, j, i, j+shift)
                    }
                }
                level.tiles[i][j].shift = 0; // Reset shift
            }
        }
    }
    
    // Get the tile under the mouse
    function getMouseTile(pos) {
        // Calculate the index of the tile
        var tx = Math.floor((pos.x - level.x) / level.tilewidth);
        var ty = Math.floor((pos.y - level.y) / level.tileheight);

        if (tx >= 0 && tx < level.columns && ty >= 0 && ty < level.rows) {
            return {
                valid: true,  // if the tile is valid
                x: tx,
                y: ty
            };
        }
		
        return {
            valid: false, // No valid tile
            x: 0,
            y: 0
        };
    }
    
    // Check if two tiles can be swapped, if the tile is a direct neighbor of the selected tile
    function canSwap(x1, y1, x2, y2) {
        if ((Math.abs(x1 - x2) == 1 && y1 == y2) ||
            (Math.abs(y1 - y2) == 1 && x1 == x2)) {
            return true;
        }
        return false;
    }

    function swap(x1, y1, x2, y2) {
        var typeswap = level.tiles[x1][y1].type;
        level.tiles[x1][y1].type = level.tiles[x2][y2].type;
        level.tiles[x2][y2].type = typeswap;
    }
    
    // Swap two tiles as a player action
    function mouseSwap(c1, r1, c2, r2) {
        currentmove = {column1: c1, row1: r1, column2: c2, row2: r2};       // Save the current move
        level.selectedtile.selected = false;   // Deselect
        // Start animation
        animationstate = 2;
        animationtime = 0;
        gamestate = gamestates.resolve;
    }
    
    // On mouse movement
    function onMouseMove(e) {
        var pos = getMousePos(canvas, e);  // Get the mouse position
        
        // Check if we are dragging with a tile selected
        if (drag && level.selectedtile.selected) {
            mt = getMouseTile(pos); // Get the tile under the mouse
            if (mt.valid) {
                // Valid tile
                // Check if the tiles can be swapped
                if (canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)){
                    mouseSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row);  // Swap the tiles
                }
            }
        }
    }
    
    // On mouse button click
    function onMouseDown(e) {
        var pos = getMousePos(canvas, e); // Get the mouse position
        
        // Start dragging
        if (!drag) {
            mt = getMouseTile(pos); // Get the tile under the mouse
            if (mt.valid) {
                // Valid tile
                var swapped = false;
                if (level.selectedtile.selected) {
                    if (mt.x == level.selectedtile.column && mt.y == level.selectedtile.row) {
                        // Same tile selected, deselect
                        level.selectedtile.selected = false;
                        drag = true;
                        return;
                    } else if (canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)){
                        // Tiles can be swapped, swap the tiles
                        mouseSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row);
                        swapped = true;
                    }
                }
                
                if (!swapped) {
                    // Set the new selected tile
                    level.selectedtile.column = mt.x;
                    level.selectedtile.row = mt.y;
                    level.selectedtile.selected = true;
                }
            } else {
                level.selectedtile.selected = false;  // Invalid tile
            }

            // Start dragging
            drag = true;
        }
        
        // Check if a button was clicked
        for (var i=0; i<buttons.length; i++) {
            if (pos.x >= buttons[i].x && pos.x < buttons[i].x+buttons[i].width &&
                pos.y >= buttons[i].y && pos.y < buttons[i].y+buttons[i].height) {
                
                // Button i was clicked
                if (i == 0) {
                    newGame();
                } else if (i == 1) {
                    showmoves = !showmoves;
                    buttons[i].text = (showmoves?"Hide":"Show") + " Moves";
                } 
            }
        }
    }
    
    function onMouseUp(e) {
        drag = false;
    }
    
    function onMouseOut(e) {
        drag = false;
    }
    
    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }

    init(); // start 
};