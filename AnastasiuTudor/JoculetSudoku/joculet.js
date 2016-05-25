window.onload = function() {
	document.getElementById("board_size").focus();

	document.getElementById("board_size").addEventListener("change", function(event) {
		var board_size = parseInt(event.target.value);
		console.log(board_size);
		if (board_size != 1) {
			// Initialize localStorage game history
			localStorage.setItem("history", JSON.stringify([]));
			// Remove the form for choosing the size
			var choose_size_elt = event.target.parentNode;
			choose_size_elt.parentNode.removeChild(choose_size_elt);

			// Create the board with the specified size
			var table_container = document.createElement("div");
			table_container.id = "table_container";
			document.body.appendChild(table_container);

			var game_grid = document.createElement("table");
			game_grid.id = "game_grid";
			table_container.appendChild(game_grid);

			var undo_move = document.createElement("button");
			undo_move.id = "undo_move";
			undo_move.appendChild(document.createTextNode("Undo Move"));
			table_container.appendChild(undo_move);

			for (i = 0; i < board_size; i++) {
				var board_row = document.createElement("tr");
				game_grid.appendChild(board_row);
				for (j = 0; j < board_size; j++) {
					var board_cell = document.createElement("td");
					board_cell.className = "board_cell";
					board_row.appendChild(board_cell);

					var game_board = document.createElement("table");
					board_cell.appendChild(game_board);
					for (k = 0; k < board_size; k++) {
						var game_board_row = document.createElement("tr");
						game_board.appendChild(game_board_row);
						for (l = 0; l < board_size; l++) {
							var game_board_cell = document.createElement("td");
							game_board_cell.className = "game_board_cell";
							game_board_row.appendChild(game_board_cell);

							var sudoku_val = game_data[board_size][i * board_size + k][j * board_size + l];
							var sudoku_input = document.createElement("input");
							sudoku_input.id = i + "" + j + "" + k + "" + l;
							sudoku_input.className = "sudoku_input";
							sudoku_input.setAttribute("size", "1");
							sudoku_input.setAttribute("maxlength", "1");
							if (sudoku_val != 0) {
								sudoku_input.setAttribute("readonly", "readonly");
								sudoku_input.style.backgroundColor = "royalblue";
								sudoku_input.value = sudoku_val;
							}
							game_board_cell.appendChild(sudoku_input);
						}
					}
				}
			}

			var sudoku_inputs = document.getElementsByClassName("sudoku_input");
			for (i = 0; i < sudoku_inputs.length; i++) {
				sudoku_inputs[i].addEventListener("change", function(event) {
					// Sudoku input
					let val = event.target.value;
					let ok = true;
					if (isNaN(val)) {
						event.target.value = "";
						ok = false;
					} else {
						val = parseInt(val);
						if (!(1 <= val && val <= board_size * board_size)) {
							event.target.value = "";
							ok = false;
						}
					}
					if (ok) {
						event.target.setAttribute("readonly", "readonly");

						// Store the move into the history
						let history = JSON.parse(localStorage.getItem("history"));
						// Find the position of the modified game_board_cell and update history
						history.push(event.target.id);
						localStorage.setItem("history", JSON.stringify(history));
					}
				});
			}
			undo_move.addEventListener("click", function(event) {
				// Undo the last move and reflect changes in game grid
				let history = JSON.parse(localStorage.getItem("history"));
				if (history.length > 0) {
					let last_move = history.pop();
					// Find the corresponding game_board_cell in the DOM, empty it and make it writable again
					let game_board_cell = document.getElementById(last_move);
					game_board_cell.value = "";
					game_board_cell.removeAttribute("readonly");
					localStorage.setItem("history", JSON.stringify(history));
				}
			});
		}
	});
}