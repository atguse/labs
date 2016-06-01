'use strict'
//************************************************************
// Global Variables
//************************************************************
var totalBoxes = 25;
var randWhiteBoxes=[];
var count;
var randomBoxes = 3;
console.log(randWhiteBoxes);
$(".start").on("click", initialize);

showUserFront();

function assignRandWhite(){
	var whiteArray = [];
	var i=0;
	while (i < randomBoxes ){
		var randNum = Math.floor((Math.random() * totalBoxes) + 1);
		if (whiteArray.indexOf(randNum) == -1){
			whiteArray.push(randNum);
			i++;
		}
	}
	console.log(whiteArray);
	return whiteArray;

}


function initialize(){
	$(".start").prop('onclick',null).off('click');
	$(".nsquares").html("Memorize "+randomBoxes+" White Squares");
	$(".message").html("");
	$(".start-game").html("");
	showUserFront();
	resetBoxes();
	randWhiteBoxes = assignRandWhite();
	defineBack();
	setTimeout(showUserBack,1000);
	$(".box").on("click",flipBox);
	setTimeout(showUserFront,2000);
	randomBoxes++;
}



function resetBoxes(){
	for (var i=1; i<=totalBoxes; i++){
		var temp = ".box." + i;
		$(temp).children(".back").removeClass("white black");
		count=0;
	}
}

function defineBack(){
	for (var i=1; i<=totalBoxes; i++){
		var temp = ".box." + i;
		console.log(jQuery.inArray(i,randWhiteBoxes), i);
		if(jQuery.inArray(i,randWhiteBoxes) != -1){
			$(temp).children(".back").addClass("white");
		}
		else{
			$(temp).children(".back").addClass("black");
		}
	}
}

function showUserFront(){
	for (var i=1; i<=totalBoxes; i++){
		var temp = ".box." + i;
		$(temp).children(".front").show();
		$(temp).children(".back").hide();

	}
}

function showUserBack(){
	for (var i=1; i<=totalBoxes; i++){
		var temp = ".box." + i;
		$(temp).children(".back").show();
		$(temp).children(".front").hide();
	}
}



function flipBox(){

	if( $(this).children(".front").is(":visible") == true ){
			$(this).children(".back").show();
			$(this).children(".front").hide();
		if ($(this).children(".back").hasClass("white") && count!=randomBoxes - 2){
			count++;
			var numLeft = randomBoxes - count -1;
	 		$(".message").html("Good job! There are " + numLeft + " more")
		}
		else if(count==randomBoxes - 2 &&  randomBoxes == 18){
			$(".message").html("<h2>You finished the entire game!</h2>");
			randomBoxes = 3;
		}
		else if($(this).children(".back").hasClass("white") && count==randomBoxes - 2){
			$(".box").prop('onclick',null).off('click');
			$(".message").html("You Win!");
			$(".start-game").html("Play Again");
			$(".start").on("click", initialize);
		}
		else{
			$(".box").prop('onclick',null).off('click');
			$(".message").html("You Lose.");
			$(".start-game").html("Try again");
			randomBoxes--;
			$(".start").on("click", initialize);
		}
	}
}