// need to declare variables
var mainPage=document.querySelector(".main-page");
var time=document.querySelector(".time");
var checkScore=document.querySelector("#check-high-scores");
var subMain=document.querySelector("#sub-main")
var startButton = document.getElementById("start-button");
var quizPage= document.querySelector(".quiz-page");
var askQuestion=document.querySelector("#ask-question");
var questionPortion=document.querySelector(".question");
var answerCheck=document.querySelector("#answer-check");
var btn1= document.querySelector("#Q1");
var btn2=document.querySelector("#Q2");
var btn3=document.querySelector("#Q3");
var results=document.querySelector(".results");
var finalScore=document.querySelector("#final-score");
var initial=document.querySelector("#initials");
var saveButton=document.querySelector("#save-score");
var timeLeft=document.querySelector(".time");
var highScore= document.querySelector(".high-score-page");
var scoreData= document.querySelector("#score-data");
var homeButton= document.querySelector("#home");
var clrButton= document.querySelector("#clear-score");

var secondsLeft=15;
var questionNumber=0;
var totalScore=0;
var questionCount=1;
var intervalID;


//need an array of questions
var questions=[
{
  question: "commonly used data types DO NOT include:",
  answers: ["a: strings", "b: alerts", "c: booleans"],
  correctAnswer: "b"
},
{
  question: "a very useful tool used during developement and debugging for printing content to the debugger is:",
  answers: ["a: console.log", "b: for loops", "c: terminal/bash"],
  correctAnswer: "a"
},
{
  question: "Which of the following is a statement that can be used to terminate a loop, switch, or label statement?",
  answers: ["a: stop", "b: halt", "c: break"],
  correctAnswer: "c"
},
];


//need a function to start the quiz
function genQuiz(){
  mainPage.style.display="none";
  quizPage.style.display="block";
  results.style.display="none";
  startTimer();
  showQuestion(questionNumber);
};

//need a function to start a timer and setInterval
function countdown(){
  if (secondsLeft <1){
    clearInterval(intervalID)
    timeLeft.textContent="You're off the case...turn in your gun and badge."
   setTimeout(endGame, 3000);
    
  } else{
    secondsLeft=secondsLeft -1
    console.log(secondsLeft)
    //You Have 15 Seconds Peasant
   timeLeft.textContent="you have " + secondsLeft + " seconds left"
  }
  
};

function startTimer(){ 
  intervalID=setInterval(countdown, 1000)
};

//display questions
function showQuestion (n) {
  askQuestion.textContent = questions[n].question;
  btn1.textContent = questions[n].answers[0];
  btn2.textContent = questions[n].answers[1];
  btn3.textContent = questions[n].answers[2];
  questionNumber = n;
};

//check if answers are right or wrong
function checkAnswer(event) {
  event.preventDefault();
  answerCheck.style.display = "block";
  setTimeout(function () {
      answerCheck.style.display = 'none';
  }, 1000);


  if (questions[questionNumber].correctAnswer == event.target.value) {
      answerCheck.textContent = "Correct!"
      totalScore = totalScore + 1;

  } else {
      secondsLeft = secondsLeft - 10;
      answerCheck.textContent = "WRONG";
  }
      
  if (questionNumber < questions.length -1 ) {
  
      showQuestion(questionNumber +1);
  } else {
  endGame();
}
questionCount++;
};

//need a function to end the game
function endGame() {

  quizPage.style.display = "none";
  results.style.display = "block";
  finalScore.textContent = "Your final score is " + totalScore ;  
  timeLeft.style.display = "none"; 
};

//need a function to go home
function journeyHome(){
  mainPage.style.display ="block";
  results.style.display ="none";
  quizPage.style.display ="none";
  location.reload();
};

function getScore() {
  var currentList=localStorage.getItem("ScoreList");
  if(currentList !== null){
    freshList = JSON.parse(currentList);
     return freshList;
  } else{
    freshList = [];
  }
  return freshList;
 };

function addItem (n){
  var addedList =getScore();
  addedList.push(n);
  localStorage.setItem("ScoreList",JSON.stringify(addedList));
};

function saveScore(){
  var scoreItem={
    user: initial.value,
    score: totalScore
  }
  addItem(scoreItem);
  renderScore();
};

function renderScore(){
  scoreData.innerHTML ="";
  scoreData.style.display="block";
  var highScores= sort ();
  var topFive=highScores.slice(0,5);
  for (var i=0; i< topFive.length; i++){
    var item =topFive[i];
   var li = document.createElement("li");
   li.textContent= item.user + "_" + item.score;
   li.setAttribute("data-index", i);
   scoreData.appendChild (li);
  }
};

function sort(){
  var unsortedList = getScore();
  if (getScore == null){
    return;
  }else{
    unsortedList.sort(function(a,b) {
      return b.score - a.score;
    })
    return unsortedList;
  }
};




//need to set up event listeners
startButton.addEventListener("click",genQuiz);

btn1.addEventListener("click", checkAnswer);
btn2.addEventListener("click",checkAnswer);
btn3.addEventListener("click",checkAnswer);

saveButton.addEventListener("click", function(event){
  event.preventDefault();
  mainPage.style.display ="none";
  quizPage.style.display = "none";
  highScore.style.display = "block";
  results.style.display = "none";
  saveScore();
});

clrButton.addEventListener("click",function(event){
  event.preventDefault();
  localStorage.clear();
  renderScore();
});

checkScore.addEventListener("click", function(event){
  event.preventDefault();
  highScore.style.display="block";
  mainPage.style.display = "none";
  quizPage.style.display = "none";
  results.style.display ="none";
  renderScore();
});


homeButton.addEventListener("click",journeyHome);
