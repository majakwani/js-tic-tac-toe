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
    console.log(gameBoardModule.players)
    return 
}

// 
let gameBoardModule = (function(){
    let gameBoard = [];
    let players = [];
    return { players }
})();

// Reads input values, pass it to method to create objects
function addNames(){
    const playerOne = document.querySelector('#player1').value;
    const playerTwo = document.querySelector('#player2').value;
    createPlayers(playerOne, 1);
    createPlayers(playerTwo, 2);

    const form = document.querySelector('.winning-message');
    form.remove();
}

function formCreation(){
    const body = document.body;
    const form = document.createElement('div');
    form.classList.add('winning-message' , 'flex');
    form.innerHTML = `<div class="winning-message flex">
    <form class="flex">
        <div class="playerOne">
            <p>Player One Name</p>
            <input type="text" name="player1" id="player1">
        </div>
        <div class="playerOne">
            <p>Player Two Name</p>
            <input type="text" name="player2" id="player2">
        </div>
        <button type = "button" onclick="addNames()">Next</button>
    </form>
</div>`
    body.append(form);
}

// controls the game flow
function gameController(){
    const messageDisplay = document.querySelector('.messageDisplay');
    formCreation();

    for(let i =0; i < 9; i++){
        if(i == 0 || i % 2 == 0){
            messageDisplay.innerHTML = `${gameBoardModule.players[0].name}'s turn, Mark = ${gameBoardModule.players[0].playerMark}`;
        }
        else if(i != 0 || i%2 != 0){
            messageDisplay.innerHTML = `${gameBoardModule.players[1].name}'s turn, Mark = ${gameBoardModule.players[1].playerMark}`;
        }
    }
    
}

function clearBoard(){

}