//Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
    //An array of new Letter objects representing the letters of the underlying word
    //A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    //A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)

//Word.js should only require Letter.js
var Letter = require("./letter.js");

function Word(word) {
    this.wordArray = [];

    for (var i = 0; i < word.length; i++) {
        var letter = new Letter(word[i]);
        this.wordArray.push(letter);
    }
    
    this.correctWord = function() {
        // for loop that grabs a random word from the word choices, separates out the letters and displays the letters as a string object;
        var secretWord = "";
        for(var i = 0; i < this.wordArray.length; i++) {
                secretWord += this.wordArray[i];
            };
            console.log(secretWord + "\n");
        };
    

    this.correctGuess = function(playerGuess) {
        // Uses the playerGuess function to store the player's guess;
        for(var i = 0; i < this.wordArray.length; i++) {
            this.wordArray[i].letterGuess(playerGuess);
        };
    };
};

module.exports = Word;
