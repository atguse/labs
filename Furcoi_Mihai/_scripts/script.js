$(document).ready(function(){
    $(window).scroll(function(event){
        var y = $(this).scrollTop(); 
        if (y>=250){
            $('#imagini').addClass('animateRight');
        }   
        if (y>=550){
            $('#videoclipuri').addClass('animateLeft');
        }
    }); 
});