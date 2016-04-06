function ellipsis()
{
    var x = document.getElementsByClassName("article_contain");
    for( i=0; i<x.length; i++)
    {
        var z = document.getElementsByClassName("article_text");
        var y = String(z[i].innerHTML);
        var n = y.length;
        while(x[i].clientHeight > 310)
        {   
            n = n - 5;
            y = y.slice(0, n);
            z[i].innerHTML = y;
        }
        n = n-3;
        y = y.slice(0, n);
        z[i].innerHTML = y +'...';
    }
}

function dropMenu()
{
    var x = document.getElementById("menu");
    console.log(x.style.display);
    if(x.style.display=="none" || x.style.display=="")
        x.style.display = "inline-block";
    else
        x.style.display = "none";
}

window.onload = ellipsis;
window.onresize = ellipsis;
