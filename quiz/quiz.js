var answerCheck = (userAnswer, questions) => {
    if (userAnswer < 1 || userAnswer > 5) {
        alert("Your answer should be in a range of 1 and 5. Try again.");
    } else if (isNaN(userAnswer)) {
        alert("You have input an incorrect symbol. Try again.");
    } else if (userAnswer == 5) {
        gameFlag = false; // The user decided to quit
    } else if (userAnswer == questions[i].correct) {
        correctAnswer = true;
        alert("Correct! You have won $" + questions[i].cost + ".");
    } else {
        alert(
            "Incorrect. The correct answer is number " +
                questions[i].correct +
                "."
        );
        gameFlag = false; // Game over
        prize = 0;
    }
    return gameFlag, correctAnswer, prize;
};
var prize = 0;
var gameFlag = true; // The game is on
var correctAnswer; // Answer check -> adding money
var userAnswer;
var i = 0;
alert("Welcome to the Random Quiz!");
while (i <= questions.length && gameFlag == true) {
    correctAnswer = false;
    userAnswer = +prompt(
        "Question #" +
            (i + 1) +
            ". Select the correct answer. " +
            questions[i].q +
            "Answers:\n" +
            questions[i].a1 +
            questions[i].a2 +
            questions[i].a3 +
            questions[i].a4 +
            "5 - Take the prize and quit"
    );
    answerCheck(userAnswer, questions);
    if (correctAnswer == true) {
        prize += questions[i].cost;
        i++;
        if (i == questions.length) {
            break;
        }
    }
}
alert("Game over! You have won $" + prize + ". Congratulations.");
