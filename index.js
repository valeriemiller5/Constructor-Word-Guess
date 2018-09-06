//The file containing the logic for the course of the game, which depends on Word.js and:
var Word = require("./word.js");
var inquirer = require("inquirer");

// letters entry
var alpha = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var authorList = [
    "Jane Austen", "Stephen King", "JRR Tolkien", "Virginia Woolf", "Maya Angelou", "Truman Capote", "Oscar Wilde", "George RR Martin", "JK Rowling", "Roald Dahl"
];

// Pick Random index from authorList array
var author = authorList[Math.floor(Math.random() * authorList.length)];

// Pass random word through Word constructor
randomAuthor = new Word(author);

var newWord = false;

// Array for guessed letters
var wrongLetters = [];
var correctLetters = [];

// Guesses left
var remainingGuesses = 10;

function startGame() {

    // Generates new word for Word constructor if true
    if (newWord) {
        // Selects random authorList array
        var randomIndex = Math.floor(Math.random() * authorList.length);
        var author = authorList[randomIndex];
        // Passes random word through the Word constructor
        randomAuthor = new Word(author);
        newWord = false;
    };


    // TestS if a letter guessed is correct
    var guessArray = [];
    randomAuthor.wordArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (guessArray.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Type in a letter.",
                name: "userguess"
            }
        ]).then(function (input) {
                if (!alpha.includes(input.userguess) || input.userguess.length > 1) {
                    console.log("\nInvalid entry, please try again.\n");
                    startGame();
                } else if (wrongLetters.includes(input.userguess) || correctLetters.includes(input.userguess) || input.userguess === "") {
                        console.log("\nInvalid entry, please try again.\n");
                        startGame();
                } else {
                    var checkAnswer = [];
                    randomAuthor.correctGuess(input.userguess);

                    // Checks if guess is correct
                    randomAuthor.wordArray.forEach(wordCheck);
                    if (checkAnswer.join('') === guessArray.join('')) {
                        console.log("\nIncorrect!\n");
                        wrongLetters.push(input.userguess);
                        remainingGuesses--;
                    } else {
                        console.log("\nCorrect!\n");
                        correctLetters.push(input.userguess);
                    };

                    randomAuthor.correctWord();
                    // Print guesses left
                    console.log("Remaining Guesses: " + remainingGuesses + "\n");

                    // Guesses left
                    if (remainingGuesses > 0) {
                        // Call function 
                        startGame();
                    } else {
                        console.log("Game Over, man, Game Over...\n");
                        restartGame();
                    };

                    function wordCheck(key) {
                        checkAnswer.push(key.letterValue);
                    };
                };
            });
    } else {
        console.log("YOU WIN!\n");
        restartGame();
    };

    function completeCheck(key) {
        guessArray.push(key.letterValue);
    };
};

function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ]).then(function (input) {
        if (input.restart === "Play Again") {
            newWord = true;
            wrongLetters = [];
            correctLetters = [];
            remainingGuesses = 10;
            startGame();
        } else {
            return
        };
    });
};

startGame();