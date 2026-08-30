function createPlayer(name, marker) {
    return {name, marker};
}

let player1;
let player2;

const startBtn = document.querySelector(".start");

startBtn.addEventListener("click", () => {

    // create the players here
    player1 = createPlayer(prompt("Player 1"), "X")
    player2 = createPlayer(prompt("Player 2"), "O")

    Game.start();

    const gameBoard = document.querySelector(".gameboard")
    gameBoard.style.display = "grid";
    DisplayController.hideStartButton()
    DisplayController.renderBoard()
    DisplayController.displayTurn();

});

const Gameboard = (() => {

    const board = [...Array(3)].map(() => Array(3).fill(""));

    function getBoard() {
        return board;
    }

    function placeMark(row, column, marker) {
        board[row][column] = marker;
    }

    function isCellEmpty(row, column) {
        return board[row][column] === ""
}

    function reset() {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            board[row][column] = "";
        }
    }
}

    return {
        getBoard,
        placeMark,
        isCellEmpty,
        reset
    };

})();

const Game = (() => {

    let currentPlayer;
    let gameOver = false;

    const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
    ];

    function start() {
        currentPlayer = player1;
        gameOver = false;
    }

    function restart() {
        Gameboard.reset();
        start();
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function playRound(row, column) {

        if (gameOver) {
            return "gameOver";
        }

        if (!Gameboard.isCellEmpty(row, column)) {
            return "invalid";
        }

        if (Gameboard.isCellEmpty(row, column)) {
            Gameboard.placeMark(row, column, currentPlayer.marker);

            const winner = checkWinner();

            if (winner !== null) {
                gameOver = true;
                return winner;
            }

            if (checkDraw()) {
                gameOver = true;
                return "draw";
            }

            switchPlayer();
        }
    }

    function switchPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function checkWinner() {
        const board = Gameboard.getBoard();

        for (const combination of winningCombinations) {
            const first = board[combination[0][0]][combination[0][1]];
            const second = board[combination[1][0]][combination[1][1]];
            const third = board[combination[2][0]][combination[2][1]];

            if (first !== "" && first === second && second === third) {
                return first;
            }
        }

        return null;
    }

    function checkDraw() {
        const board = Gameboard.getBoard();

        return !board.some(row => row.some(cell => cell === ""));
    }

    return {
        start,
        playRound,
        checkWinner,
        checkDraw,
        getCurrentPlayer,
        restart
    };

})();

const DisplayController = (() => {
    const gridBtns = document.querySelectorAll(".gameboard button");
    const winnerPara = document.querySelector(".winner");
    const restartBtn = document.querySelector(".restart");

    function renderBoard() {
        
        const board = Gameboard.getBoard();

        gridBtns.forEach((button) => {
            const row = Number(button.className[1]) - 1;
            const column = Number(button.className[3]) - 1;

            const value = board[row][column];

            button.textContent = "";

            if (value === "X") {
                const img = document.createElement("img");
                img.src = "cross-mark.svg";
                img.alt = "X";
                button.appendChild(img);
            }
            else if (value === "O") {
                const img = document.createElement("img");
                img.src = "tick-04.svg";
                img.alt = "O";
                button.appendChild(img);
            }
        });
    }

    function addEventListeners() {
        gridBtns.forEach((button) => {
            button.addEventListener("click", () => {
                const row = Number(button.className[1]) - 1;
                const column = Number(button.className[3]) - 1;

                const result = Game.playRound(row, column);

                if (result === "invalid" || result === "gameOver") { 
                    return; 
                } 

                renderBoard(); 

                if (result !== undefined) { 
                    displayResult(result);
                    disableBoard();
                    showRestartButton(); 
                } 
                else { 
                    displayTurn(); 
                }
            });
        });
    }

    function addRestartListener() {
        restartBtn.addEventListener("click", () => {
            Game.restart();
            renderBoard();
            enableBoard();
            displayTurn();
            hideRestartButton();
        });
    }

    function displayTurn() {
        const currentPlayer = Game.getCurrentPlayer();
        winnerPara.textContent = `${currentPlayer.name}'s turn`;
    }

    function displayResult(result) {
        if (result === "X") {
            winnerPara.textContent = `${player1.name} is the Winner 🎉🥳`;
        }
        else if (result === "O") {
            winnerPara.textContent = `${player2.name} is the Winner 🎉🥳`;
        }
        else if (result === "draw") {
            winnerPara.textContent = `It's a tie! 🤝`;
        }
    }

    function disableBoard() {
        gridBtns.forEach((button) => {
            button.disabled = true;
        });
    }

    function enableBoard() {
        gridBtns.forEach((button) => {
        button.disabled = false;
        });
    }

    function showRestartButton() {
        restartBtn.style.display = "block";
    }

    function hideRestartButton() {
        restartBtn.style.display = "none";
    }

    function hideStartButton() {
        startBtn.style.display = "none";
    }



    return {
        renderBoard,
        addEventListeners,
        displayResult,
        displayTurn,
        disableBoard,
        addRestartListener,
        enableBoard,
        showRestartButton,
        hideStartButton
    };
})();

DisplayController.addEventListeners();
DisplayController.addRestartListener();