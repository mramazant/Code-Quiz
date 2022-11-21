var buttons = document.querySelector("#buttons")
var questionEl =  document.querySelector('#question');
var container = document.querySelector("#container")
var highscoreBtn = document.querySelector ("#highscoreBtn");
var startBtn = document.querySelector("#startBtn");
var submitForm = document.querySelector("#submit")
var submitButton = document.querySelector("#submit-initials")
var submitName = document.querySelector("#submitBtn")
var highscoreRow = document.querySelector("#scoreRow")
var scoreRow = document.querySelector("#scoreRow1")
var highscoreSection = document.querySelector("#highscores")
var quizContainer = document.querySelector("#quiz-container")
var askInitials = document.querySelector("#ask-initials")
var container = document.querySelector("#highscoreContainer")
var highscores = []
//highscores = localStorage.getItem("highScore1");


function getHighScores(){
    var list = document.createElement("ul");
    // highscores = localStorage.getItem("highScore1");
    // list.textContent = highscores
    //let highScore = localStorage.getItem("highscores");
    //console.log(highScore);
    list.textContent = highscores;
    //scoreRow.textContent = highScore
    //scoreRow.textContent = highscores
}
scoreRow.style.display = "none"
//function for text, choices, answer
function  Question (text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//if choice is the answer, gives true
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

//score and questions are 0 at the beginning
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}
//get questions from the above function
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex]; 
}

//next question and score
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
} 
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
    // if (this.questionIndex > this.questions.length){
    //     questionEl.textContent = "";

   // }
}
//decleration of questions and answers
var q1 = new Question("What is the most populated country in the world?", 
["USA", "China", "Russia", "Germany"], "China")

var q2 = new Question("What is the most populated city in the world?", 
["Istanbul", "Paris", "Tokyo", "Shanghai"], "Tokyo")

var q3 = new Question("What is the capital of the European Union?", 
["Berlin", "Brussels", "Amsterdam", "London"], "Brussels")

var q4 = new Question("What is the most common surname in the United States?",
["Smith", "Johnson", "Miller", "Jones"], "Smith")

var q5 = new Question("How many minutes are in a full week?",
["960", "720", "1080", "1260"], "1080")

var q6 = new Question("What car manufacturer had the highest revenue in 2020?",
["Volkswagen", "Toyota", "Honda", "Mercedes-Benz",], "Volkswagen")

var q7 = new Question("How many elements are in the periodic table?",
["106", "112", "118", "124"], "118")

var q8 = new Question("Which city connects two continents?",
["Rome", "Paris", "London", "Istanbul"], "Istanbul")

var q9 = new Question("Which planet has the most moons?",
["Saturn", "Earth", "Jupiter", "Mars"], "Saturn")

var q10 = new Question("What country has won the most World Cups?",
["Germany", "Brazil", "Mexico", "Turkey"], "Brazil")

var q11 = new Question("What software company is headquartered in Redmond, Washington?",
["Microsoft", "Apple", "IBM", "Adobe"], "Microsoft")

var q12 = new Question("What artist has the most streams on Spotify?",
["Jay-Z", "Ariana Grande", "Bad Bunny", "Drake"], "Drake")

var q13 = new Question("Where did sushi originate?",
["Japan", "South Korea", "North Korea", "China"], "China")

var q14 = new Question("What country drinks the most coffee?",
["Norway", "Finland", "Sweden", "Switzerland"], "Finland")

var q15 = new Question("Where is Angel Falls, the world’s largest waterfall, located?",
["United States", "Ireland", "Venezuela", "Bermuda"], "Venezuela")
//Variable decleration
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15]
var quiz = new Quiz(questions);
//quiz start
loadQuestion();
function loadQuestion(){
    if(quiz.isFinish()){
        questionEl.textContent = "Please enter your name"
        // showScore();
        askForInitials();
        endQuiz();
    }else{
        var question = quiz.getQuestion(); 
        var choices = question.choices;
        //showing question
       questionEl.textContent = question?.text;
        //answers content for every button
        for(var i=0; i<choices.length; i++){
            var element = document.querySelector("#choice"+i);
            element.innerHTML = choices[i];

            guess("btn"+i,choices[i]);
        }
        showProgress(); 
    }
}
// load next question
function guess(id,guess){
    var btn = document.querySelector("#" + id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();

    }
}
//showing score
function showScore(){
    var html = quiz.score;
    document.querySelector(".card-body").innerHTML= "Your Score is " + html;
    askForInitials();
    // document.querySelector("#submit-initials").onclick = function() {
    //     console.log(quiz.score)
    // localStorage.setItem("highscore1", $(".highscores1").val());
    // }
    document.querySelector("#highscoreBtn").onclick = function() {
    //getHighScores();
    getLocalStorage();
    }

}

function setLocalStorage(highscores){
    
    var score;
    score = localStorage.getItem("highscores")   
    console.log(score)

    if (score == null){
        score = [];
    } else{
        score = JSON.parse(score)
    }
    score.push(highscores);
    localStorage.setItem("highscores", JSON.stringify(score))
    console.log(score)
}
function getLocalStorage() {
        var score;
    score = localStorage.getItem("highscores") 
    if (score == null){
        score = [];
    } else{
        score = JSON.parse(score)
    }
    console.log(score)
    for (i = 0; i < score.length; i++){
        var scoreList = document.createElement("li");
        scoreList.textContent = score[i].userName
        container.appendChild(scoreList)
        
    }
}
function askForInitials() {
    askInitials.classList.remove("hide");
    submitButton.onclick = function() {
     var initials = document.querySelector("#ask-initials-input").value;
     console.log(initials, quiz.score);
     let userScore = JSON.stringify({userName: initials, score: quiz.score});
     //highscores.push(userScore)
    //localStorage.setItem("highscores", highscores);
    setLocalStorage(userScore);

    }
    

}
//question number of total qustion length
function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1
    document.querySelector("#progress").innerHTML = "Question "
     + questionNumber + "of" + totalQuestion;
}
//countdown, but it doesnt work. This work is not yet finish. I will fix and continue it next day
var timeEl = document.querySelector("#timer")


var secondsLeft = 70;

function setTime() {
    secondsLeft--;
    var timeEl = document.getElementById("timer");
    if(secondsLeft === 0 || secondsLeft < 0 ){
    // timeEl.style.display = "none"
    // // score.style.display = "flex"
    // questionEl.style.display = "none"
    // submitForm.style.display = "flex"
    // container.classList.remove("hide")
    // // askInitials.classList.remove("hide")
    // submitButton.style.display = "flex"
    // scoreRow.style.display = "flex" 
    // startBtn.style.display = "none"
    // highscoreSection.style.display = "flex"
    // //quizContainer.style.display = "none"   
    //     showScore();
     endQuiz();
    }
    timeEl.textContent = secondsLeft + "seconds left for answer"
}
function endQuiz() {
    timeEl.style.display = "none"
    // score.style.display = "flex"
    questionEl.style.display = "none"
    submitForm.style.display = "flex"
    container.classList.remove("hide")
    // askInitials.classList.remove("hide")
    submitButton.style.display = "flex"
    scoreRow.style.display = "flex" 
    startBtn.style.display = "none"
    highscoreSection.style.display = "flex"
    //quizContainer.style.display = "none"   
        showScore();
        
}

//**************************************************************** */
startBtn.addEventListener("click", function(){
    submitForm.style.display = "none"
    container.classList.remove("hide")
    container.style.display = "block"
    submitButton.style.display = "none"
    scoreRow.style.display = "none" 
    startBtn.style.display = "none"
    highscoreSection.style.display = "none"
    setInterval(setTime, 1000);

    
    
}, 1000)


highscoreBtn.addEventListener("click", function(){
    container.style.display = "none"
    startBtn.style.display = "none"
    scoreRow.style.display = "flex"
    highscores = localStorage.getItem("highscores");
    
})







