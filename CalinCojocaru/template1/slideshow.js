$(document).ready(function(){
  $("#button_1").click(function(){
    $("#slide_1").slideToggle("slow");
  });
   $("#button_2").click(function(){
    $("#slide_2").slideToggle("slow");
  });
   $("#button_3").click(function(){
    $("#slide_3").slideToggle("slow");
  });

});





var counter_time_1 = 0;
var counter_time_2 = 0;
var counter_time_3 = 0;

var c_Num = function changeNumber(){
	if(counter_time_1!=1000)
	{
		document.getElementById("time_1").innerHTML= counter_time_1;
		counter_time_1++;
	}
	if(counter_time_2!=643)
	{
		document.getElementById("time_2").innerHTML= counter_time_2;
		counter_time_2++;
	}
	if(counter_time_3!=-120)
	{
		document.getElementById("time_3").innerHTML= counter_time_3;
		counter_time_3--;
	}
}
$( "div.numbers" ).hover(function() {
var da = setInterval(c_Num,10);
});

$( " div.mare_x").click(function() {
	 $("div.obscure").css({
	 		'visibility' : 'hidden'
	 });
});

$( "div.light_1" ).click(function() {
	$("div.light_box_1").css({
	  '-webkit-transform':'translateX(-100%)'
	  ,'-moz-transform':'translateX(-100%)'
	  ,'transform':'translateX(-100%)'
  });
	 $("div.obscure").css({
	 		'visibility' : 'visible'
	 });
});

$( "div.exit_light_1" ).click(function() {
	$("div.light_box_1").css({
	  '-webkit-transform':'translateX(100%)'
	  ,'-moz-transform':'translateX(100%)'
	  ,'transform':'translateX(100%)'
  });
});

$( "div.light_2" ).click(function() {
	$("div.light_box_2").css({
	  '-webkit-transform':'translateX(-100%)'
	  ,'-moz-transform':'translateX(-100%)'
	  ,'transform':'translateX(-100%)'
  });
	 $("div.obscure").css({
	 		'visibility' : 'visible'
	 });
});

$( "div.exit_light_2" ).click(function() {
	$("div.light_box_2").css({
	  '-webkit-transform':'translateX(100%)'
	  ,'-moz-transform':'translateX(100%)'
	  ,'transform':'translateX(100%)'
  });
});

$( "div.light_3" ).click(function() {
	$("div.light_box_3").css({
	  '-webkit-transform':'translateX(-100%)'
	  ,'-moz-transform':'translateX(-100%)'
	  ,'transform':'translateX(-100%)'
  });
	 $("div.obscure").css({
	 		'visibility' : 'visible'
	 });
});

$( "div.exit_light_3" ).click(function() {
	$("div.light_box_3").css({
	  '-webkit-transform':'translateX(100%)'
	  ,'-moz-transform':'translateX(100%)'
	  ,'transform':'translateX(100%)'
  });
});

var nrSlide =1;

$("div.slide_button_right").click(function() {
	if(nrSlide==4){
		$("#carousel").css({
			 '-webkit-transform':'translateX('+ 0 +'%)'
		  ,'-moz-transform':'translateX('+ 0 +'%)'
		  ,'transform':'translateX('+ 0 +'%)'
		});
		nrSlide=1;
	}
	else{
		$("#carousel").css({
			 '-webkit-transform':'translateX('+(-nrSlide)*25+'%)'
		  ,'-moz-transform':'translateX('+(-nrSlide)*25+'%)'
		  ,'transform':'translateX('+(-nrSlide)*25+'%)'
		});
		nrSlide++;
	}
});

$("div.slide_button_left").click(function() {
	if(nrSlide==1){
		$("#carousel").css({
			 '-webkit-transform':'translateX('+ (-75) +'%)'
		  ,'-moz-transform':'translateX('+ (-75) +'%)'
		  ,'transform':'translateX('+ (-75) +'%)'
		});
		nrSlide=4;
	}
	else{
		$("#carousel").css({
			 '-webkit-transform':'translateX('+(nrSlide-2)*(-25)+'%)'
		  ,'-moz-transform':'translateX('+(nrSlide-2)* (-25) +'%)'
		  ,'transform':'translateX('+(nrSlide-2)* (-25) +'%)'
		});
		nrSlide--;
}
});

var change_slide_to_left = function() {
		if(nrSlide==4){
		$("#carousel").css({
			 '-webkit-transform':'translateX('+ 0 +'%)'
		  ,'-moz-transform':'translateX('+ 0 +'%)'
		  ,'transform':'translateX('+ 0 +'%)'
		});
		nrSlide=1;
	}
	else{
		$("#carousel").css({
			 '-webkit-transform':'translateX('+(-nrSlide)*25+'%)'
		  ,'-moz-transform':'translateX('+(-nrSlide)*25+'%)'
		  ,'transform':'translateX('+(-nrSlide)*25+'%)'
		});
		nrSlide++;
	}
}
var slide_the_Slide = setInterval(change_slide_to_left,10000);
var nr_Awesome_Slide = 1;

var change_awesome_slide_to_right = function(){
	if(nr_Awesome_Slide==3){
		$("#awesome").css({
			 '-webkit-transform':'translateX('+ 0 +'%)'
		  ,'-moz-transform':'translateX('+ 0 +'%)'
		  ,'transform':'translateX('+ 0 +'%)'
		});
		nr_Awesome_Slide=1;
	}
	else{
		$("#awesome").css({
			 '-webkit-transform':'translateX('+(-nr_Awesome_Slide)*33+'%)'
		  ,'-moz-transform':'translateX('+(-nr_Awesome_Slide)*33+'%)'
		  ,'transform':'translateX('+(-nr_Awesome_Slide)*33+'%)'
		});
		nr_Awesome_Slide++;
	}
}
var the_awesome_change = setInterval(change_awesome_slide_to_right,10000);
 
$("#tiny_1").click(function () {
	$("#awesome").css({
		 '-webkit-transform':'translateX('+ 0 +'%)'
		  ,'-moz-transform':'translateX('+ 0 +'%)'
		  ,'transform':'translateX('+ 0 +'%)'
	});
});

$("#tiny_2").click(function () {
	$("#awesome").css({
		 '-webkit-transform':'translateX('+ -33 +'%)'
		  ,'-moz-transform':'translateX('+ -33 +'%)'
		  ,'transform':'translateX('+ -33 +'%)'
	});
});

$("#tiny_3").click(function () {
	$("#awesome").css({
		 '-webkit-transform':'translateX('+ -66 +'%)'
		  ,'-moz-transform':'translateX('+ -66 +'%)'
		  ,'transform':'translateX('+ -66 +'%)'
	});
});



$("div.ultimate_slide_1").hover(
	function(){
	$("#below_1").css({
		'-webkit-transform':'translateY('+ -100 +'%)'
	  ,'-moz-transform':'translateY('+ -100 +'%)'
	  ,'transform':'translateY('+ -100 +'%)'
	});
	},
	function(){
		$("#below_1").css({
		'-webkit-transform':'translateY('+ 100 +'%)'
	  ,'-moz-transform':'translateY('+ 100 +'%)'
	  ,'transform':'translateY('+ 100 +'%)'
		});
	}
);

$("div.ultimate_slide_2").hover(
	function(){
	$("#below_2").css({
		'-webkit-transform':'translateY('+ -100 +'%)'
	  ,'-moz-transform':'translateY('+ -100 +'%)'
	  ,'transform':'translateY('+ -100 +'%)'
	});
	},
	function(){
		$("#below_2").css({
		'-webkit-transform':'translateY('+ 100 +'%)'
	  ,'-moz-transform':'translateY('+ 100 +'%)'
	  ,'transform':'translateY('+ 100 +'%)'
		});
	}
);

$("div.ultimate_slide_3").hover(
	function(){
	$("#below_3").css({
		'-webkit-transform':'translateY('+ -100 +'%)'
	  ,'-moz-transform':'translateY('+ -100 +'%)'
	  ,'transform':'translateY('+ -100 +'%)'
	});
	},
	function(){
		$("#below_3").css({
		'-webkit-transform':'translateY('+ 100 +'%)'
	  ,'-moz-transform':'translateY('+ 100 +'%)'
	  ,'transform':'translateY('+ 100 +'%)'
		});
	}
);

$("div.ultimate_slide_4").hover(
	function(){
	$("#below_4").css({
		'-webkit-transform':'translateY('+ -100 +'%)'
	  ,'-moz-transform':'translateY('+ -100 +'%)'
	  ,'transform':'translateY('+ -100 +'%)'
	});
	},
	function(){
		$("#below_4").css({
		'-webkit-transform':'translateY('+ 100 +'%)'
	  ,'-moz-transform':'translateY('+ 100 +'%)'
	  ,'transform':'translateY('+ 100 +'%)'
		});
	}
);

var ultimate_nr_slides=1;

var change_ultimate_slide_to_right = function(){
	if(ultimate_nr_slides==4){
		$("#ultimate").css({
			 '-webkit-transform':'translateX('+ 0 +'%)'
		  ,'-moz-transform':'translateX('+ 0 +'%)'
		  ,'transform':'translateX('+ 0 +'%)'
		});
		ultimate_nr_slides=1;
	}
	else{
		$("#ultimate").css({
			 '-webkit-transform':'translateX('+(-ultimate_nr_slides)*25+'%)'
		  ,'-moz-transform':'translateX('+(-ultimate_nr_slides)*25+'%)'
		  ,'transform':'translateX('+(-ultimate_nr_slides)*25+'%)'
		});
		ultimate_nr_slides++;
	}
}
var the_ultimate_change = setInterval(change_ultimate_slide_to_right,10000);

$("#ultimate_tiny_1").click(function () {
	$("#ultimate").css({
		 '-webkit-transform':'translateX('+ 0 +'%)'
		  ,'-moz-transform':'translateX('+ 0 +'%)'
		  ,'transform':'translateX('+ 0 +'%)'
	});
});

$("#ultimate_tiny_2").click(function () {
	$("#ultimate").css({
		 '-webkit-transform':'translateX('+ -25 +'%)'
		  ,'-moz-transform':'translateX('+ -25 +'%)'
		  ,'transform':'translateX('+ -25 +'%)'
	});
});

$("#ultimate_tiny_3").click(function () {
	$("#ultimate").css({
		 '-webkit-transform':'translateX('+ -50 +'%)'
		  ,'-moz-transform':'translateX('+ -50 +'%)'
		  ,'transform':'translateX('+ -50 +'%)'
	});
});

$("#ultimate_tiny_4").click(function () {
	$("#ultimate").css({
		 '-webkit-transform':'translateX('+ -75 +'%)'
		  ,'-moz-transform':'translateX('+ -75 +'%)'
		  ,'transform':'translateX('+ -75 +'%)'
	});
});



  function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
          center: new google.maps.LatLng(44.446121, 26.094973),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
      }
      google.maps.event.addDomListener(window, 'load', initialize);
