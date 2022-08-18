let Turn = false;
const circleClass = "o";
const xClass = "x";
const message = document.querySelector('.messageDisplay');

// Creates player object and append it in players array
function createPlayers(name, number){
    let playerMark;

    if(number == 1){
        playerMark = "X"
    }
    else if (number == 2){
        playerMark = "O"
    }
    gameBoardModule.players.push({ name, number, playerMark })
}

// 
let gameBoardModule = (function(){
    let gameBoard = [];
    let players = [];
    return { gameBoard , players }
})();

let displayController = (function(){

})();

// Reads gameboard cells and store them in gameboard array
let readingGameBoard = ( ()=>{
    let i = 1;
    let gameboard = document.querySelectorAll('.gameboard-cell');
    gameboard.forEach(element => {
        element.setAttribute("id", i);
        i = i + 1;
        gameBoardModule.gameBoard.push(element)
    });
})();

function placeMark(cell, mark){
    cell.classList.add(mark)
}

function switchTurns(index){
    message.innerHTML = `${gameBoardModule.players[index].name}'s Turn, Mark = ${gameBoardModule.players[index].playerMark}`;
    Turn = !Turn
}

function handleEvent(e){
    let cell = e.target;
    let currentClass = Turn ? circleClass : xClass;
    let number = Turn ? "0" : "1";
    placeMark(cell, currentClass)
    switchTurns(number)
}

function gameStart(){
    const cell = document.querySelectorAll('.gameboard-cell');
    cell.forEach(element => {
        element.addEventListener('click', handleEvent, {once : true})
    });
}

// Reads input values, pass it to method to create objects
function addNames(){
    const btn = document.querySelector('.startGame');
    btn.remove();
    const playerOne = document.querySelector('#player1').value;
    const playerTwo = document.querySelector('#player2').value;
    
    // Checks for empty input fields.
    if(playerOne == "" || playerTwo == ""){
        alert("Empty Input Fields");
        location.reload();
    }

    createPlayers(playerOne, 1);
    createPlayers(playerTwo, 2);

    const form = document.querySelector('.winning-message');
    form.remove();
    message.innerHTML = `${gameBoardModule.players[0].name}'s Turn, Mark = ${gameBoardModule.players[0].playerMark}`;
    gameStart();
}

function formCreation(){
    const body = document.body;
    const form = document.createElement('div');
    form.classList.add('winning-message' , 'flex');
    form.innerHTML = `<div class="winning-message flex">
    <form class="flex">
        <div class="playerOne">
            <p>Player One Name</p>
            <input type="text" name="player1" id="player1" required>
        </div>
        <div class="playerOne">
            <p>Player Two Name</p>
            <input type="text" name="player2" id="player2" required>
        </div>
        <button type = "button" onclick="addNames()">Next</button>
    </form>
</div>`
    body.append(form);
}

function clearBoard(){
    const cell = document.querySelectorAll('.gameboard-cell');
    cell.forEach(element => {
        element.classList.remove("x");
        element.classList.remove("o");
        gameStart() 
    });
}