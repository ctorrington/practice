// Grab DOM elements
const message = document.getElementById('success-msg');
const letters = document.querySelectorAll('.wordboard-letter');

console.log(message);
console.log(letters);



async function init() {
    /**
     * Define following variables:
     * - currentGuess
     * - currentRow
     * - answerLength
     * - done
     */

    /**
     * Make API call, get word of the day.
     * Create array of characters
     */

    const url = "https://words.dev-apis.com/word-of-the-day";
    const res = await fetch(url);
    const data = await res.json();
    let wordOfTheData = data.word.toUpperCase();
    let wordParts = wordOfTheData.split('');
    console.log(wordParts)


    const ANSWER_LENGTH = 5;

    let currentGuess = "";
    let currentRow = 0;


    function addLetter(letter) {
        
            // if so, add letter
            // if not, replace last letter with new letter

        // check if buffer is less than 5 characters
        if (currentGuess.length < ANSWER_LENGTH) {
            currentGuess += letter;

        } else {
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        };


        letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].textContent = letter;

    }

    function handleCommit(){
        // If word doesn't contain 5 letters...
        if (currentGuess.length != ANSWER_LENGTH) {
            return;
        };

        // Mark 'correct', 'close', 'wrong' squares

        let guessParts = currentGuess.split('');


        let wordMap = makeMap(wordParts);
        console.log(wordMap);


        for (let i = 0; i < ANSWER_LENGTH; i++) {
            // Letter is in correct location.
            if (guessParts[i] === wordParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');

            // Letter is not in the correct location.
            } else if (wordParts.includes(guessParts[i])) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('close');

            // Letter is not in the word.
            } else {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
            };

        };



        // Did the user win or lose?
        if (currentGuess === wordOfTheData) {
            animate();
            message.textContent = "You Win!!";
            message.classList.add('complete', 'wotd');
        } else if (currentRow === 5) {
            animate();
            message.innerHTML = `You lose! The word was <span = 'wotd'>${wordOfTheDay}</span>`;
            message.classList.add('complete', 'wotd')
        }

        // set currentGuess to empty string
        // increment currentRow

        currentGuess = "";
        currentRow += 1;
    };

    function handleBackspace() {
        // Modify currentGuess and update DOM

        currentGuess = currentGuess.substring(0, currentGuess.length - 1);

        letters[currentRow * ANSWER_LENGTH + currentGuess.length].textContent = "";
    }


    /**
     * Listen for keystrokes and perform actions based on the following:
     * 
     * - is the key Enter
     * - is the key Backspace
     * - is the key a valid letter
     * - otherwise...
     */

    document.addEventListener('keydown', function(event) {
        // Get the pressed key.
        const action = event.key;

        // The enter key is pressed.
        if (action == 'Enter') {
            handleCommit();

        // The backsapce key is pressed.
        } else if (action == 'Backspace') {
            handleBackspace();
            console.log(currentGuess)

        // Check if it is a valid key pressed.
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
            console.log(action)

        // Handle other occurences.
        } else {

        };


        
    });
}

function isLetter(action) {
    // Check if keystroke is indeed a letter
    return /^[a-zA-Z]$/.test(action);
}

function makeMap(word_arary) {
    // Create object of characters along with amount of occurrences in word.
    const obj = {};

    for (let i = 0; i < word_array.length; i++) {
        if (obj.hasOwnProperty(word_array[i])) {
            
        }
    }
}


init();
