function createPlayers(number){
    let playerName = prompt(`Enter name for Player #${number} : `);
    let playerNumber = number + 1;
    let playerMark;

    if(playerNumber == 1){
        playerMark = "X"
    }
    else if (playerNumber == 2){
        playerMark = "O"
    }

    gameBoardModule.players.push({ playerName, playerNumber, playerMark })
    return 
}

let gameBoardModule = (function(){
    let gameBoard = [];
    let players = [];

    return { players }
})();

function gameController(){
    for(let i = 0; i < 2; i++){
        createPlayers(i);
    }
}
