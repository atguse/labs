$(document).ready(function(){

    $(".restart-button").click(function(){

        $(".score-container").text("0");
        location.reload();
        
    });

    $(".retry-button").click(function(){

        $(".score-container").text("0");
        location.reload();
      
    });

    $(".keep-playing-button").click(function(){

    	 $( ".game-message" ).removeClass( "game-won" );
      
    });
});