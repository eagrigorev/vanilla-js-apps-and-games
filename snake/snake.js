const FIELD_SIZE_X = 20;
const FIELD_SIZE_Y = 20;
const SNAKE_SPEED = 100;
const FOOD_SPEED = 5000;
const DEATH_SPEED = 7000; // Death cell spawns every 7 seconds
const SNAKE_INIT_LENGTH = 2;
var direction = "y+"; // Initial snake direction
var snake = [];
var gameIsRunning = false;
var snake_timer;
var food_timer;
var death_timer;
var score = 0;
var scoreBoard;
var init = () => {
    prepareGameField();
    scoreBoard = document.getElementById("game-score");
    var wrap = document.querySelector(".wrap");
    wrap.style.width = "400px";
    document.querySelector("#snake-start").addEventListener("click", startGame);
    document
        .querySelector("#snake-renew")
        .addEventListener("click", refreshGame);
    addEventListener("keydown", changeDirection);
};
var prepareGameField = () => {
    var game_table = document.createElement("table");
    game_table.setAttribute("class", "game-table");
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        var row = document.createElement("tr");
        row.className = "game-table-row row-" + i;
        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell = document.createElement("td");
            cell.className = "game-table-cell cell-" + i + "-" + j;
            row.appendChild(cell);
        }
        game_table.appendChild(row);
    }
    document.querySelector("#snake-field").appendChild(game_table);
};
var startGame = () => {
    gameIsRunning = true;
    respawn();
    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, FOOD_SPEED);
    death_timer = setInterval(createDeath, DEATH_SPEED);
};
var respawn = () => {
    var start_coord_x = Math.floor(FIELD_SIZE_X / SNAKE_INIT_LENGTH);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / SNAKE_INIT_LENGTH);
    var snake_tail = document.getElementsByClassName(
        "cell-" + start_coord_y + "-" + start_coord_x
    )[0];
    snake_tail.classList.add("snake-unit");
    var snake_head = document.getElementsByClassName(
        "cell-" + (start_coord_y - 1) + "-" + start_coord_x
    )[0];
    snake_head.classList.add("snake-unit");
    snake.push(snake_tail);
    snake.push(snake_head);
};
var move = () => {
    var snake_head_classes = snake[snake.length - 1]
        .getAttribute("class")
        .split(" ");
    var new_unit;
    var snake_coords = snake_head_classes[1].split("-");
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);
    if (direction == "x-") {
        new_unit = document.getElementsByClassName(
            "cell-" + coord_y + "-" + (coord_x - 1)
        )[0];
    } else if (direction == "x+") {
        new_unit = document.getElementsByClassName(
            "cell-" + coord_y + "-" + (coord_x + 1)
        )[0];
    } else if (direction == "y+") {
        new_unit = document.getElementsByClassName(
            "cell-" + (coord_y - 1) + "-" + coord_x
        )[0];
    } else if (direction == "y-") {
        new_unit = document.getElementsByClassName(
            "cell-" + (coord_y + 1) + "-" + coord_x
        )[0];
    }
    if (!isSnakeUnit(new_unit) && new_unit !== undefined) {
        new_unit.setAttribute(
            "class",
            new_unit.getAttribute("class") + " snake-unit"
        );
        snake.push(new_unit);
        if (!haveFood(new_unit)) {
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute("class").split(" ");
            removed.setAttribute("class", classes[0] + " " + classes[1]);
        }
        if (haveDeath(new_unit)) {
            finishTheGame();
        }
    } else {
        finishTheGame();
    }
};
/**
 * Snake check
 * @param unit
 * @returns {boolean}
 */
var isSnakeUnit = (unit) => {
    var check = false;
    if (snake.includes(unit)) {
        check = true;
    }
    return check;
};
/**
 * Food check
 * @param unit
 * @returns {boolean}
 */
var haveFood = (unit) => {
    var check = false;
    var unit_classes = unit.getAttribute("class").split(" ");
    if (unit_classes.includes("food-unit")) {
        check = true;
        createFood();
        score++;
        scoreBoard.innerHTML = "Текущий счёт: " + score;
    }
    return check;
};
/**
 * Death check
 * @param unit
 * @returns {boolean}
 */
var haveDeath = (unit) => {
    var check = false;
    var unit_classes = unit.getAttribute("class").split(" ");
    if (unit_classes.includes("death-unit")) {
        check = true;
    }
    return check;
};
var createFood = () => {
    var foodCreated = false;
    while (!foodCreated) {
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        var food_cell = document.getElementsByClassName(
            "cell-" + food_y + "-" + food_x
        )[0];
        var food_cell_classes = food_cell.getAttribute("class").split(" ");
        if (!food_cell_classes.includes("snake-unit")) {
            var classes = "";
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + " ";
            }
            food_cell.setAttribute("class", classes + "food-unit");
            foodCreated = true;
        }
        if (!food_cell_classes.includes("death-unit")) {
            var classes = "";
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + " ";
            }
            food_cell.setAttribute("class", classes + "food-unit");
            foodCreated = true;
        }
    }
};
var createDeath = () => {
    var deathCreated = false;
    while (!deathCreated) {
        var death_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var death_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        var death_cell = document.getElementsByClassName(
            "cell-" + death_y + "-" + death_x
        )[0];
        var death_cell_classes = death_cell.getAttribute("class").split(" ");
        if (!death_cell_classes.includes("snake-unit")) {
            var classes = "";
            for (var i = 0; i < death_cell_classes.length; i++) {
                classes += death_cell_classes[i] + " ";
            }
            death_cell.setAttribute("class", classes + "death-unit");
            deathCreated = true;
        }
        if (!death_cell_classes.includes("food-unit")) {
            var classes = "";
            for (var i = 0; i < death_cell_classes.length; i++) {
                classes += death_cell_classes[i] + " ";
            }
            death_cell.setAttribute("class", classes + "death-unit");
            deathCreated = true;
        }
        if (!death_cell_classes.includes("death-unit")) {
            var classes = "";
            for (var i = 0; i < death_cell_classes.length; i++) {
                classes += death_cell_classes[i] + " ";
            }
            death_cell.setAttribute("class", classes + "death-unit");
            deathCreated = true;
        }
    }
};
/**
 * Movement direction change
 * @param e - event
 */
var changeDirection = (e) => {
    console.log(e);
    switch (e.keyCode) {
        case 37: // Left
            if (direction != "x+") {
                direction = "x-";
            }
            break;
        case 38: // Up
            if (direction != "y-") {
                direction = "y+";
            }
            break;
        case 39: // Right
            if (direction != "x-") {
                direction = "x+";
            }
            break;
        case 40: // Down
            if (direction != "y+") {
                direction = "y-";
            }
            break;
    }
};
var finishTheGame = () => {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(death_timer);
    alert("You have lost! Your score: " + score.toString());
};
var refreshGame = () => {
    location.reload();
};
window.onload = init;
