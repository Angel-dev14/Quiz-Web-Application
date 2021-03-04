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

    $(window).resize(function ()
    {
        if(window.innerWidth > 580){
            if($("nav").hasClass("go-up")){
                $($("nav").removeClass("go-up"))
            }
        }
    })
})