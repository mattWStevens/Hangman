/*
    hangman.js
    Matthew Stevens
    February 5, 2018
*/

/*************** Global Variables and Objects *****************************************/
var words = ["cat", "bear", "bird", "styles", "fun", "friday", "great", "super", "kite", "colorado", "skies", "return",
             "run", "developer", "eloped", "elephant", "zoo", "exclamation", "giant", "pear", "snowboard", "snow", "gamut",
             "wind", "stone", "car", "bike", "dwindle", "punctuation", "cognate", "realize"];

var word = words[Math.floor(Math.random() * words.length)];

var controller = { 
    size: word.length,
    numWrong: 0,
    totalGuesses: 6,
    numCorrect: 0,
    correctString: "",
    wrongString: "",
    
    /*
        Processes user's guess.
    */
    processGuess: function(userGuess)
    {
        userGuess = userGuess.toLowerCase();
        
        if (this.correctString.indexOf(userGuess) > -1 || this.wrongString.indexOf(userGuess) > -1)
        {
            alert("You have already guessed this letter.");
        }
             
        else if (word.indexOf(userGuess) > -1)
        {
            view.displayCorrect(userGuess);
            this.numCorrect++;
            this.correctString += userGuess;
        }
        
        else
        {
            view.displayWrong(userGuess);
            this.numWrong++;
            view.updateBoard(this.numWrong);
            this.wrongString += userGuess;
            
            if (this.numWrong > 5 && this.numCorrect != this.size)
            {
                var timer = setTimeout(end, 2000);
            }
        }
    }
};

var view = {
    /*
        Displays the length of the word to guess to user.
    */
    displayLength: function()
    {
        var lengthArea = document.getElementById("length");
        
        lengthArea.innerHTML = "The word is " + controller.size + " letters long.";
    },
    
    /*
        Displays the incorrect letters guessed.
    */
    displayWrong: function(letter)
    {
        var wrongArea = document.getElementById("guesses");
        
        wrongArea.innerHTML += letter + "\t";
    },
    
    /*
        Displays the correct letters guessed.
    */
    displayCorrect: function(correct)
    {
        var correctArea = document.getElementById("correctWord");
        
        correctArea.innerHTML += correct;
    },
    
    /*
        Updates the chalkboard based on the number of
        incorrect guesses.
    */
    updateBoard: function(numWrong)
    {
        var picture = document.getElementById("gamePic");
        picture.src = "Chalkboard/c" + numWrong + ".gif";
    }
};

/******************* Functions and Main Method *************************/
/*
    Initializes the page upon loading.
*/
function loadPage()
{
    view.displayLength();
}

/*
    Determines the end of ther game.
*/
function end()
{
    var again = confirm("Sorry, you did not guess the correct word. " +
                                "The correct word was " + word + ".");
            
    if (again)
    {
        window.location.reload();
    }
}

/*
    Hooks up the processGuess function to the button.
*/
function guess()
{
    var guess = document.getElementById("userInput");
    
    controller.processGuess(guess.value);
    
    guess.value = "";   // resets user submission box 
}

/*
    Enables user to guess the correct word if they click the button.
*/
function guessWord()
{
    var guess = confirm("Would you like to guess the correct word?");
            
    if (guess)
    {
        var answer = prompt("Please enter your guess: ");
                
        if (answer == word)
        {
            alert("Congratulations, you guessed the correct word!");
                    
            var repeat = confirm("Would you like to play again?");
                    
            if (repeat)
            {
                window.location.reload();
            }
        }
                
        else
        {
            alert("Sorry, your guess was wrong. The correct answer was " + 
                           word + ".");
                    
            var repeat = confirm("Would you like to play again?");
                    
            if (repeat)
            {
                window.location.reload();
            }
        }
    }
}