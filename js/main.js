$(document).ready(function ()
{
    $(".single-topic").click(function (){
        let topic_title = $(this).get(0).getElementsByClassName("topic-title")[0].innerText;

        localStorage.setItem("TOPIC-TITLE",topic_title)

        location.href = "selected.html"

    })

    $(".start-btn").click(function ()
    {
        location.href = "quiz-main.html"
    })

    /* MOBILE MENU */
    $("input[type=checkbox]").click(function () {
        if ($(this).is(":checked")) {
            $("nav").addClass("drop-down").removeClass("go-up");
        } else if($("nav").hasClass("drop-down")){
            $("nav").addClass("go-up").removeClass("drop-down");
        }

    })

    if(window.innerWidth < 780){
        if($("#header").hasClass("container")){
            $("#header").removeClass("container").addClass("container-fluid");
        }
    }

    $(window).resize(function ()
    {
        if(window.innerWidth > 580){
            if($("nav").hasClass("go-up")){
                $("nav").removeClass("go-up")
            }
        }
        if(window.innerWidth < 780){
            if($("#header").hasClass("container")){
                $("#header").removeClass("container").addClass("container-fluid");
            }
        }
        if(window.innerWidth >= 780){
            if($("#header").hasClass("container-fluid")){
                $("#header").removeClass("container-fluid").addClass("container");
            }
        }

    })
})