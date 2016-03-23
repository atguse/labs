(function ($, win) {
    $.fn.inViewport = function (cb) {
        return this.each(function (i, el) {
            function visPx() {
                var H = $(this).height() - 150,
                    r = el.getBoundingClientRect(),
                    t = r.top,
                    b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
       } visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}(jQuery, window));

$("#articole").inViewport(function(px){
    if(px) $(this).addClass("animateLeft") ;
});

$("#imagini").inViewport(function(px){
    if(px) $(this).addClass("animateRight") ;
});

$("#videoclipuri").inViewport(function(px){
    if(px) $(this).addClass("animateLeft") ;
});

/*$(document).ready(function(){
    $(window).scroll(function(event){
        var y = $(this).scrollTop(); 
        if (y>=250){
            $('#imagini').addClass('animateRight');
        }   
        if (y>=450){
            $('#videoclipuri').addClass('animateLeft');
        }
    }); 
});*/