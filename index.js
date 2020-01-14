//The file containing the logic for the course of the game, which depends on Word.js and:
var Word = require("./word.js");
var inquirer = require("inquirer");
var chalk = require("chalk");

// letters entry
var alpha = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var authorList = [
    "jane austen", "stephen king", "jrr tolkien", "virginia woolf", "maya angelou", "truman capote", "oscar wilde", "george rr martin", "jk rowling", "roald dahl"
];

// Pick Random index from authorList array
var author = authorList[Math.floor(Math.random() * authorList.length) + 1];

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
        author = authorList[Math.floor(Math.random() * authorList.length) + 1];

        // Passes random word through the Word constructor
        randomAuthor = new Word(author);
        newWord = false;
    };


    // Tests if a letter guessed is correct
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
                // Checks if entry is a letter in the alpha string or if nothing was entered 
                if (!alpha.includes(input.userguess) || input.userguess.length > 1) {
                    console.log(chalk.red("\nInvalid entry, please try again.\n"));
                    startGame();
                // Checks if the letter has already been guessed, whether correct or incorrect
                } else if (wrongLetters.includes(input.userguess) || correctLetters.includes(input.userguess) || input.userguess === "") {
                        console.log(chalk.red("\nYou already guessed this letter, please try again.\n"));
                        startGame();
                } else {
                    var checkAnswer = [];
                    randomAuthor.correctGuess(input.userguess);

                    // Checks if guess is correct
                    randomAuthor.wordArray.forEach(wordCheck);
                    if (checkAnswer.join("") == guessArray.join("")) {
                        console.log(chalk.red("\nIncorrect!\n"));
                        wrongLetters.push(input.userguess);
                        remainingGuesses--;
                    } else {
                        console.log(chalk.green("\nCorrect!\n"));
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
                        console.log(chalk.cyan.bold("Game Over, man, Game Over...\n"));
                        restartGame();
                    };

                    function wordCheck(key) {
                        checkAnswer.push(key.letterValue);
                    };
                };
            });
    } else {
        console.log(chalk.magenta.bold("YOU WIN!\n"));
        restartGame();
    };

    function completeCheck(key) {
        guessArray.push(key.letterValue);
    };
};

function restartGame() {
    inquirer.prompt([
        {
            name: "restart",
            type: "confirm",
            message: "Would you like to play again?", 
            default: true
        }
    ]).then(function (input) {
        if (input.restart) {
            newWord = false;
            wrongLetters = [];
            correctLetters = [];
            remainingGuesses = 10;
            return startGame();
        } else {
            return false;
        };
    });
};

startGame();