var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', function (e) {
    newGame();
});

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('KAMIEŃ') });
pickPaper.addEventListener('click', function() { playerPick('PAPIER') });
pickScissors.addEventListener('click', function() { playerPick('NOŻYCZKI') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer =
        {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements()
{
    switch(gameState)
    {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame()
{
    console.log(player);
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
    if (player.name)
    {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints(); // ta funkcja jeszcze nie powstała
    }
}

function getComputerPick()
{
    var possiblePicks = ['KAMIEŃ', 'PAPIER', 'NOŻYCZKI'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick)
{
    var computerPick = getComputerPick();
    console.log(playerPick);

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);

}

function checkRoundWinner(playerPick, computerPick)
{
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick)
    {
        winnerIs = 'noone'; // remis
    }
    else if (
        (computerPick == 'KAMIEŃ' &&  playerPick == 'NOŻYCZKI') ||
        (computerPick == 'NOŻYCZKI' &&  playerPick == 'PAPIER') ||
        (computerPick == 'PAPIER' &&  playerPick == 'KAMIEŃ'))
    {
        winnerIs = 'computer';
    }

    if (winnerIs == 'player')
    {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    }
    else if (winnerIs == 'computer')
    {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }
    else {
        playerResultElem.innerHTML = "REMIS!";
        computerResultElem.innerHTML = "REMIS!";
    }
    setGamePoints();
}

function setGamePoints()
{
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    checkGameWinner();
}

function checkGameWinner() {
    if (computer.score == 10)
    {
        alert("Komputer wygrał!");
        resetScore();
    }
    else if (player.score == 10)
    {
        alert("WYGRAŁEŚ!!!");
        resetScore();

    }
}

function resetScore() {
    computer.score = 0;
    player.score = 0;
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}