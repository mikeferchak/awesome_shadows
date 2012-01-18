var lsx = 500;
var lsy = 0;
var lsz = 1000;

$(document).ready(function(){
    loopthroughallshadowelements();

    $('#sun').draggable( {
        cursor: 'move',
        containment: 'document',
        drag: loopthroughallshadowelements,
        stop: loopthroughallshadowelements
    });

    $('div.candrag').draggable( {
        cursor: 'move',
        containment: 'document',
        drag: calculateshadow,
        stop: loopthroughallshadowelements
    });


    function loopthroughallshadowelements(){
        $(".shadowbox, .shadowtext, .inset").each(calculateshadow);
    };

    function calculateshadow(){
        var offset = $(this).offset();
        var sunoffset = $('#sun').offset();
        var bx = offset.left + ($(this).width()/2);
        var by = offset.top + ($(this).height()/2);
        var bz = 20;
        var lsx = sunoffset.left + ($("#sun").width()/2);
        var lsy = sunoffset.top + ($("#sun").width()/2);
        var xdiff = lsx-bx;
        var ydiff = lsy-by;
        var zdiff = lsz-bz;
        var bxangle = Math.atan(xdiff/zdiff);
        var bzangle = Math.atan(ydiff/zdiff);
        var bxoffset = Math.tan(bxangle) * bz;
        var byoffset = Math.tan(bzangle) * bz;
        var distance = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));
        var blur = distance/60;
        var darkness = 5 / (Math.sqrt(distance));
        var shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")";

        if( $(this).hasClass("shadowbox") )  {
            $(this).css('box-shadow',shadowvalue);
        }
        if( $(this).hasClass("shadowtext") )  {
            $(this).css('text-shadow',shadowvalue);
        }
        if( $(this).hasClass("inset") )  {
            $(this).css('box-shadow','inset ' + shadowvalue);
        }
    };


});
