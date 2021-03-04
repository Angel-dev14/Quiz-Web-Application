let questions;

let current = 1;

let current_question;

let remainingTime = 180;

let seconds = 60;

let answered = false;

let correct_answers = 0;

let answeredCount = 0;

let answer = null;

const question_title = document.getElementById("question");
const choice_a = document.getElementById("a");
const choice_b = document.getElementById("b");
const choice_c = document.getElementById("c");
const choice_d = document.getElementById("d");

window.onbeforeunload = function () {
    return '';
}

startTimer();

window.onload = function generateQuizQuestions() {
    let topic_title = "../questions/" + localStorage.getItem("TOPIC-TITLE") + ".json";
    fetch(topic_title).then(results => results.json()).then(data => {
        questions = data
        start();
    });
}


function start()
{
    questions.sort(() => 0.5 - Math.random());
    fill();
}
function fill()
{
    document.getElementById("q-num").innerHTML = "" + current;
    current_question = questions[current-1];
    question_title.innerText = current + ". " + current_question.title;
    choice_a.innerText = current_question.a;
    choice_b.innerText = current_question.b;
    choice_c.innerText = current_question.c;
    choice_d.innerText = current_question.d;
}


/* ANSWER QUESTION LOGIC */

$(".single-question").click(function ()
{
    answered = true;
    ++answeredCount
    answer = $(this)[0];
    $("#alert").hide();
    if($(this)[0].id === current_question.correct){
        correct($(this)[0]);
        $(this).append("<i class=\"fas fa-check-circle right correct\"></i>");
        $(this).addClass("correctAnimation");
        disableClicks($(this)[0]);
        ++correct_answers;
    }
    else{
        wrong($(this)[0]);
        displayAnswer($(this)[0]);
    }
})
$("#next-btn").click(function ()
{
    if(answeredCount===15){
        over()
        return 0;
    }
    if(answered) {
        current++;
        answered = false;
        fill();
        clearBackgroundColor(answer);
        clearAnimationClass();
    }
    else{
        $("#alert").show();
    }
})

$("#try-again-btn").click(function (){
    location.href = "quiz-main.html";
})
$("#home-btn").click(function ()
{
    location.href = "index.html";
})


function correct(answer){
    answer.style.backgroundColor = "#8dfc76";
}
function wrong(answer){
    answer.style.backgroundColor = "#ff7974";
}
function clearBackgroundColor(answer){
    answer.style.backgroundColor = "#d7d7d7";
}
function displayAnswer(current)
{
    let questions = current.parentElement.getElementsByClassName("single-question");
    for(let i=0;i<4;i++)
    {
        $(questions[i]).css("pointer-events","none")
        if(questions[i].id!==current_question.correct) {
            questions[i].innerHTML += ("<i class=\"fas fa-times-circle right wrong\"></i>");
        }
        else{
            questions[i].innerHTML += ("<i class=\"fas fa-check-circle right correct\"></i>");
        }
    }
}

function disableClicks(current)
{
    let questions = current.parentElement.getElementsByClassName("single-question");
    for(let i=0;i<4;i++){
        $(questions[i]).css("pointer-events","none");
    }
}

function clearAnimationClass()
{
    let questions = document.getElementsByClassName("single-question");
    for(let i=0;i<4;i++)
    {
        $(questions[i]).removeClass("correctAnimation");
        $(questions[i]).css("pointer-events","auto")
    }
}

function getRemainingMinutes()
{
    return remainingTime/60 - 1;
}

function startTimer()
{
    setInterval(function ()
    {
        if(remainingTime === 0)
            over();
        if(seconds===0)
            seconds = 60;
        if(remainingTime%60===0)
            document.getElementById("min").innerText = "0" + getRemainingMinutes();
        if(seconds<=10)
            document.getElementById("sec").innerText = "0" + --seconds;
        else
            document.getElementById("sec").innerText = "" + --seconds;
        remainingTime--;
    },1000)
}

function over(){
    $(".quiz-window").hide();
    $(".results-window").show();
    document.getElementById("answered").innerText = "" + correct_answers;
    quizCompleted();
}

function quizCompleted()
{
    if(correct_answers>7)
        $("#success").show();
    else{
        $("#try-again").show();
    }
}
