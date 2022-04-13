$(document).ready(function () {

     $('.plantOne').click(function(){
        $('.paraOne').toggle();
     });
    
        $(function () {
        $(".plantOne").draggable();
    });  
    
     $('#plantTwo').click(function () {
//        $('.infopanel').toggle(2000);     
        $(this).toggleClass("bigger");
    });
    });