//function for text, choices, answer
function  question (text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//if choice is the answer, gives true
question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

//score and questions are 0 at the beginning
function quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}
//get questions from the above function
quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

//next question and score
quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
} 
quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}
//decleration of questions and answers
var q1 = new question("What is the most populated country in the world?", 
["USA", "China", "Russia", "Germany", "China"], "China")

var q2 = new question("What is the most populated city in the world?", 
["Istanbul", "Paris", "Tokyo", "Shanghai"], "Tokyo")

var q3 = new question("What is the capital of the European Union?", 
["Berlin", "Brussels", "Amsterdam", "London"], "Brussels")

var q4 = new question("What is the most common surname in the United States?",
["Smith", "Johnson", "Miller", "Jones"], "Smith")

var q5 = new question("How many minutes are in a full week?",
["960", "720", "1080", "1260"], "1080")

var q6 = new question("What car manufacturer had the highest revenue in 2020?",
["Volkswagen", "Toyota", "Honda", "Mercedes-Benz",], "Volkswagen")

var q7 = new question("How many elements are in the periodic table?",
["106", "112", "118", "124"], "118")

var q8 = new question("Which city connects two continents?",
["Rome", "Paris", "London", "Istanbul"], "Istanbul")

var q9 = new question("Which planet has the most moons?",
["Saturn", "Earth", "Jupiter", "Mars"], "Saturn")

var q10 = new question("What country has won the most World Cups?",
["Germany", "Brazil", "Mexico", "Turkey"], "Brazil")

var q11 = new question("What software company is headquartered in Redmond, Washington?",
["Microsoft", "Apple", "IBM", "Adobe"], "Microsoft")

var q12 = new question("What artist has the most streams on Spotify?",
["Jay-Z", "Ariana Grande", "Bad Bunny", "Drake"], "Drake")

var q13 = new question("Where did sushi originate?",
["Japan", "South Korea", "North Korea", "China"], "China")

var q14 = new question("What country drinks the most coffee?",
["Norway", "Finland", "Sweden", "Switzerland"], "Finland")

var q15 = new question("Where is Angel Falls, the world’s largest waterfall, located?",
["United States", "Ireland", "Venezuela", "Bermuda"], "Venezuela")
//Variable decleration
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15]
var quiz = new quiz(questions);
//quiz start
loadQuestion();
function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{
        var question = quiz.getQuestion(); 
        var choices = question.choices;
        //showing question
        document.querySelector('#question').textContent = question.text;
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
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();

    }
}
//showing score
function showScore(){
    var html = quiz.score;
    document.querySelector(".card-body").innerHTML= "Your Score is " + html;
    document.querySelector("higscoreBtn") = highscoreBtn

}
//question number of total qustion length
function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1
    document.querySelector("#progress").innerHTML = "Question "
     + questionNumber + "of" + totalQuestion;
}
//countdown, but it doesnt work. This work is not yet finish. I will fix and continue it next day
var timeEl = document.getElementById("#timer")
var container = getElementByClass("#container")
var highscoreBtn = getElementById("#higscoreBtn");
var startBtn = document.getElementById("#startBtn");
var secondsLeft = 20;
highscoreBtn.onclick = function setTime(){
    
    secondsLeft--;
    timeEl.textContent = secondsLeft + "seconds left for answer"
    setInterval(setTime, 1000);
    showScore();
    
}
setTime();

