function init() {
    var fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
}

function handleFireButton() {
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}
window.onload = init;


function parseGuess(guess) {
    var alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.")
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabetArray.indexOf(firstChar);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.")
        } else if (row < 0 || row >= model.boardSize
            || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!")
        } else {
            return row + column;
        }
    }
    return null;
}

var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
}

var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [
        {
            locations: ["00", "01", "02"],
            hits: ["", "", ""]
        },
        {
            locations: ["42", "43", "44"],
            hits: ["", "", ""]
        },
        {
            locations: ["20", "30", "40"],
            hits: ["", "", ""]
        }
    ],
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var locations = ship.locations;
            var index = locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                    view.displayMessage("You sunk my battleship!");
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("MISS!");
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
}

var controller = {
    guesses: 0,
    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " +
                    this.guesses + " guesses.")
            }
        }
    }
}

// controller.processGuess("A0");
// controller.processGuess("A1");
// controller.processGuess("A2");
// controller.processGuess("C6");
// controller.processGuess("E2");
// controller.processGuess("E3");
// controller.processGuess("E4");
// controller.processGuess("C0");
// controller.processGuess("D0");
// controller.processGuess("E0");

// model.fire("00");
// model.fire("01");
// model.fire("02");
// model.fire("42");
// model.fire("43");
// model.fire("44");
// model.fire("20");
// model.fire("30");
// model.fire("40");



// let startLocation = Math.floor(Math.random() * 5);

// let location1 = startLocation;
// let location2 = location1 + 1;
// let location3 = location2 + 1;

// let guess;
// let hits = 0;
// let guesses = 0;
// let isSunk = false;

// while (isSunk == false) {

//     guess = prompt("Ready, aim, fire! (enter a number 0-6):");

//     if (guess < 0 || guess > 6) {
//         alert("Please enter a valid cell number!");
//     }
//     else {
//         guesses = guesses + 1;
//         if (guess == location1 || guess == location2 || guess == location3) {
//             alert("HIT");
//             hits = hits + 1;

//             if (hits == 3) {
//                 isSunk = true;
//                 alert("You sank my battleship!");
//             }
//         } else {
//             alert("MISS");
//         }
//     }
// }

// let stats = "You took " + guesses + " guesses to sink the battleship, " +
//     "which means your shooting accuracy was " + (3 / guesses);
// alert(stats); 