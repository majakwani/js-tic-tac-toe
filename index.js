let Turn = false;
const circleClass = "o";
const xClass = "x";
const message = document.querySelector('.messageDisplay');
const buttons = document.querySelector('.buttons');

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
    let gameBoardX = [];
    let gameBoardO = [];
    let players = [];
    return { players, gameBoardO, gameBoardX }
})();

// Reads gameboard cells and user mark and store them in an array og objects
function readingGameBoard(mark, index){
    if(mark == "x"){
        gameBoardModule.gameBoardX.push(index)
    }
    else{
        gameBoardModule.gameBoardO.push(index)
    }
}    

function placeMark(cell, mark){
    cell.classList.add(mark)
}

function switchTurns(index){
    let name = "";
    let module = Turn ? gameBoardModule.gameBoardO : gameBoardModule.gameBoardX;
    if(index == "0"){
        name = gameBoardModule.players[1].name;
    }
    else if (index == "1"){
        name = gameBoardModule.players[0].name;
    }
    checkForWin(module, name);
    checkForDraw();
    message.innerHTML = `${gameBoardModule.players[index].name}'s Turn, Mark = ${gameBoardModule.players[index].playerMark}`;
    Turn = !Turn
}

function handleEvent(e){
    let cell = e.target;
    let cellid = e.target.id;
    let currentClass = Turn ? circleClass : xClass;
    let number = Turn ? "0" : "1";
    placeMark(cell, currentClass)
    readingGameBoard(currentClass, cellid)

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

function newGame(){
    location.reload();
}

function checkForWin(turn, name){
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    winningCombinations.forEach(element => {
        let count = 0;
        element.forEach(value => {
            turn.forEach(check => {
                if(value == check){
                    count = count + 1;
                }
            });
            if(count == 3){
                const winningMessage = document.createElement("div");
                winningMessage.classList.add("endMessage" , "flex");
                winningMessage.innerHTML = `        <p>${name} Won</p>
                <button type="button" onclick = "newGame()" >Play Again</button>`
                document.body.append(winningMessage);
            }
        });
    });
}

function checkForDraw(){
    if(gameBoardModule.gameBoardX.length == 5 && gameBoardModule.gameBoardO.length == 4){
        const winningMessage = document.createElement("div");
        winningMessage.classList.add("endMessage" , "flex");
        winningMessage.innerHTML = `        <p>It's a Draw.</p>
        <button type="button" onclick = "newGame()" >Play Again</button>`
        document.body.append(winningMessage);
    }
}