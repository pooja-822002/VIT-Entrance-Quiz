class Quiz {
    constructor(questions, reward) {
        this.reward= reward;
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score +=this.reward;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
var fianlScore = 0;
function displayQuestion(count, quizElement, hasNext, next) {
    QuizNumber(count);
    if (quizElement.isEnded()) {
        fianlScore += quizElement.score;
        if(hasNext){
            clearInterval(quizTimer1);
            countDown2(15);
            displayQuestion(2, quiz2, false, null);
        }
        else{
            clearInterval(quizTimer2);
            countDown3(8);
            displayLogoQuestion();
        }
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quizElement.getQuestionIndex().text;

        // show options
        let choices = quizElement.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i], count, quizElement, hasNext, next);
        }

        showProgress(quizElement);
    }
};

function displayLogoQuestion(){
    QuizNumber(3);
    if (quiz3.isEnded()) {
        fianlScore += quiz3.score;
        showScores();
    }else{
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = `<img src='${quiz3.getQuestionIndex().text}' style='width:50%; display:block; margin-left:auto; margin-right:auto'></img>`;

        // show options
        let choices = quiz3.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess2("btn" + i, choices[i]);
        }
        showProgress(quiz3);
    }
}

// Quiz Number
function QuizNumber(Count){
    let quizNumber = document.getElementById("quiz-num");
    quizNumber.innerHTML = `Round- ${Count}`;
}

// GUESS ANSWER
function guess(id, guess, count, quizElement, hasNext, next) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quizElement.guess(guess);
        displayQuestion(count, quizElement, hasNext, next);
    }
};
function guess2(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz3.guess(guess);
        displayLogoQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress(quizElement) {
    let currentQuestionNumber = quizElement.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quizElement.questions.length}`;
};


// SHOW SCORES
function showScores() {
    var passed="Congratulations!!",result="";
    if(fianlScore > 9.5){
        result="Got a seat in Vellore";
    }else if(fianlScore > 7.5){
        result="Got a seat in Chennai";
    }else if(fianlScore > 6.5){
        result="Got a seat in Amaravathi";
    }
    else{
        passed="Sorry, better luck next year!";
    }
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 class='score'> Your scored: ${fianlScore}</h2>
    <h2 class='score'> ${passed}</h2>
    <h2 class='score'> ${result}</h2>
    <div class="quiz-repeat">
        <a href="quiz.html">Take Quiz Again</a>
    </div>
    `;
    let quizElemnt = document.getElementById("quiz");
    quizElemnt.innerHTML = quizEndHTML;
};

// create questions here
let questions1 = [
    new Question(
        "Brass gets discoloured in air because of the presence of which of the following gases in air?",["Oxygen","Hydrogen sulphide","Carbon DIoxide","Nitrogen"],"Hydrogen sulphide"
    ),
    new Question(
        "Which of the following is a non metal that remains liquid at room temperature?", ["Chlorine", "Bromine", "Phosphorous", "Helium"], "Bromine"
    ),
    new Question(
        "Which of the following metals forms an amalgam with other metals?", ["Mercury", "Hydrogen", "Oxygen", "Carbon"], "Mercury"
    ),
    new Question(
        "Which of the following is used in pencils?", ["Graphite", "Silicon", "Charcoal", "Phosphorous"], "Grapthite"
    ),
    new Question(
        "Chlorophyll is a naturally occurring chelate compound in which central metal is", ["copper", "magnesium", "iron", "calcium"], "magnesium"
    ),
    
];

let questions2 = [
    new Question(
        "Who Invented the 3-D printer?", ["Nick Holonyak", "Elias Howe", "Chuck Hull", "Christiaan Huygens"], "Chuck Hull"
    ),
    new Question(
        "The Grand Canyon located in which country? ", ["Ghana", "US", "Canada", "Bolivia"], "US"
    ),
    new Question(
        "Which of the following is known as the Diamond City of India?", ["Mumbai", "Jaipur", "Surat", "Panna"], "Panna"
    ),
    new Question(
        "The first news paper in the world was started by ?", ["Japan", "China", "USA", "India"], "China"
    ),
    new Question(
        "Who is known as Man of Blood and Iron ?", ["Napoleon", "Bismarck", "Ho Chi Minh", "Sir Walter Scott"], "Bismarck"
    )
];

let questions3 = [
    new Question(
        "img1.png", ["CCD", "Starbucks", "McDonalds", "KFC"], "Starbucks"
    ),
    new Question(
        "img2.png", ["Apple", "Orange", "Windows", "Banana"], "Apple"
    ),
    new Question(
        "img3.png", ["Channel", "Gucci", "Louis Vuitton", "Guess"], "Channel"
    ),
    new Question(
        "img4.png", ["K TV", "Sun TV", "Vijay TV", "Zee TV"], "Sun TV"
    ),
    new Question(
        "img5.png", ["HP", "Bharat", "Shell", "IndianOil"], "Shell"
    )
];

// INITIALIZE quiz
let quiz1 = new Quiz(questions1, 2);
let quiz2 = new Quiz(questions2, 2);
let quiz3 = new Quiz(questions3, 4)

// display questions
displayQuestion(1, quiz1, true, quiz2);


// Add A CountDown for the Quiz
let counting = document.getElementById("count-down");

var quizTimer1, quizTimer2, quizTimer3;

function countDown1(time) {
    let quizTimeInMinutes = time * 60 * 60;
    let quizTime = quizTimeInMinutes / 60;
    quizTimer1 = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer1);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
function countDown2(time) {
    let quizTimeInMinutes = time * 60 * 60;
    let quizTime = quizTimeInMinutes / 60;
    quizTimer2 = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer2);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
function countDown3(time) {
    let quizTimeInMinutes = time * 60 * 60;
    let quizTime = quizTimeInMinutes / 60;
    quizTimer3 = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer3);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}
countDown1(15);