var questions = ["What was the final score of the 2005 National Championship Game?", "What are the Longhorn's all time record against Texas A&M?", "Who was the last Heisman Trophy Winner from Texas?", "How many years did Mack Brown coach at Texas for?", "What stadium is the annual Red River Rivalry game against the Oklahoma Sooners played at?"];
var answers = [["40-37", "38-37", "41-38", "42-39"], ["76-37-5", "81-28-3", "72-40-5", "74-31-1"], ["Earl Campbell", "Vince Young", "Ricky Williams", "Colt McCoy"], ["12", "15", "18", "13"], ["AT&T Stadium", "DKR Memorial Stadium", "The Rose Bowl", "The Cotton Bowl"]];
var counter = 10;
var startScreen;
var images = ["<img class='center-block img-right' src='assets/images/champs.jpg'>", "<img class='center-block img-right' src='assets/images/texaswin.jpg'>", "<img class='center-block img-right' src='assets/images/ricky-williams.jpg'>", "<img class='center-block img-right' src='assets/images/mackbrown.jpg'>", "<img class='center-block img-right' src='assets/images/cottonbowl.jpg'>"];
var questionCount = 0;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var selectedAnswer;
var clock;
var gameText;
var endSong = new Audio("assets/texas-fight-song.mp3");
var correctAnswers = ["C. 41-38", "A. 76-37-5", "C. Ricky Williams", "B. 15", "D. The Cotton Bowl"];



$(document).ready(function(){

	function firstScreen(){
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-default btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}
	
	firstScreen();
	
	$("body").on("click", ".start-button", function(event){
		generateHTML();
		timerWrapper();
	});
	
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCount]){
			clearInterval(clock);
			generateWin();
		}
		else{
			clearInterval(clock);
			generateLoss();
		}
	});
	
	$("body").on("click", ".reset-button", function(event){
		resetGame();
		endSong.pause();
	});

});

function generateWin(){
	correctTally++;
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCount] + "</p>" + images[questionCount];
	$(".mainArea").html(gameText);
	setTimeout(wait, 3000);
}

function generateLoss(){
	incorrectTally++;
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCount] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
	$(".mainArea").html(gameText);
	setTimeout(wait, 3000);
}

function generateHTML(){
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionCount] + "</p><p class='first-answer answer'>A. " + answers[questionCount][0] + "</p><p class='answer'>B. " + answers[questionCount][1] + "</p><p class='answer'>C. " + answers[questionCount][2] + "</p><p class='answer'>D. " + answers[questionCount][3] + "</p>";
	$(".mainArea").html(gameText);
}

function generateTimeoutLoss(){
	unansweredTally++;
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCount] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
	$(".mainArea").html(gameText);
	setTimeout(wait, 3000);
}

function timerWrapper(){
	clock = setInterval(tenSeconds, 1000);
	function tenSeconds(){
		if (counter === 0){
			clearInterval(clock);
			generateTimeoutLoss();
		}
		if (counter > 0){
			counter--;
		}
		$(".timer").html(counter);
	}
}

function wait(){
	if (questionCount < 4){
		questionCount++
		generateHTML();
		counter = 10;
		timerWrapper();
	}
	else{
		finalScreen();
	}
}

function finalScreen(){
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Finished, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-default btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameText);
	endSong.play();
}

function resetGame(){
	questionCount = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 10;
	generateHTML();
	timerWrapper();
	endSong.stop();
}


