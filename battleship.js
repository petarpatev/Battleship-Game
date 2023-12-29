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

model.fire("00");
model.fire("01");
model.fire("02");
model.fire("42");
model.fire("43");
model.fire("44");
model.fire("20");
model.fire("30");
model.fire("40");



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