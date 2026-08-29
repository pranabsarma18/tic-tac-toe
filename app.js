let gameboard = (function gameBoard() {

    gameBoardArray = (() => {
    const value = 'foo'; // by default
    return [...Array(3)].map(e => Array(3).fill(value));
    })()

    return gameBoardArray
})()

displayController = (function displayController() {
    return document.querySelector(".container")
})()

let user1, user2;
const startBtn = displayController.querySelector(".start")
startBtn.addEventListener('click', () => {
    user1 = (function() {
        const name = prompt("Player 1")
        const marker = "tick"
        let score = 0;
        const getScore = () => score;
        const giveScore = () => { score++; };
        return {name, marker, getScore, giveScore}
    }())

    user2 = (function() {
        const name = prompt("Player 2")
        const marker = "cross"
        let score = 0;
        const getScore = () => score;
        const giveScore = () => { score++; };
        return {name, marker, getScore, giveScore}
    }())

    greeting = displayController.querySelector(".greeting")
    greeting.textContent = `Hello, the game is on! it is ${user1.name} vs ${user2.name}`
    startBtn.style.display = "none";
    playGame()
})

    let winnerFun = function() {
        console.log("inside winner checking function")
        console.log(gameboard)
        if (
            gameboard[0][0] === gameboard[0][1] &&
            gameboard[0][1] === gameboard[0][2] &&
            gameboard[0][0] !== 'foo'
        ) {
            return gameboard[0][0]
        }

        else if (
            gameboard[0][0] === gameboard[1][0] &&
            gameboard[1][0] === gameboard[2][0] &&
            gameboard[0][0] !== 'foo'
        ) {
            return gameboard[0][0]
        }

        else if (
            gameboard[2][0] === gameboard[2][1] &&
            gameboard[2][1] === gameboard[2][2] &&
            gameboard[2][0] !== 'foo'
        ) {
            return gameboard[2][0]
        }

        else if (
            gameboard[0][2] === gameboard[1][2] &&
            gameboard[1][2] === gameboard[2][2] &&
            gameboard[0][2] !== 'foo'
        ) {
            return gameboard[0][2]
        }

        else if (
            gameboard[1][0] === gameboard[1][1] &&
            gameboard[1][1] === gameboard[1][2] &&
            gameboard[1][0] !== 'foo'
        ) {
            return gameboard[1][0]
        }

        else if (
            gameboard[0][1] === gameboard[1][1] &&
            gameboard[1][1] === gameboard[2][1] &&
            gameboard[0][1] !== 'foo'
        ) {
            console.log(`error? value of winner is ${gameboard[0][1]}`)
            return gameboard[0][1]
        }

        else if (
            gameboard[0][0] === gameboard[1][1] &&
            gameboard[1][1] === gameboard[2][2] &&
            gameboard[0][0] !== 'foo'
        ) {
            return gameboard[0][0]
        }

        else if (
            gameboard[0][2] === gameboard[1][1] &&
            gameboard[1][1] === gameboard[2][0] &&
            gameboard[0][2] !== 'foo'
        ) {
            return gameboard[0][2]
        }
        else if (!gameboard.some(row => row.some(element => element === 'foo'))){
            return "draw"
        }

    }

    function winnerDisplay(winner) {
                if (winner === 1) {
                const gameBoardElement = document.querySelector(".gameboard")
                // gameBoardElement.style.display = "none"
                winnerPara = document.querySelector(".winner")
                winnerPara.textContent = `${user1.name} is the Winner 🎉🥳`

                 gridBtns.forEach((e) => {
                    e.disabled = true
                })
                document.querySelector(".restart").style.display = "block"

            }
            else if (winner === 0) {
                const gameBoardElement = document.querySelector(".gameboard")
                // gameBoardElement.style.display = "none"
                winnerPara = document.querySelector(".winner")
                winnerPara.textContent = `${user2.name} is the Winner 🎉🥳`

                gridBtns.forEach((element) => {
                    element.disabled = true
                })
                document.querySelector(".restart").style.display = "block"
            }
            else if (winner === 'draw'){
                const gameBoardElement = document.querySelector(".gameboard")
                // gameBoardElement.style.display = "none"
                winnerPara = document.querySelector(".winner")
                winnerPara.textContent = `It's a tie! 🤝`

                gridBtns.forEach((e) => {
                    e.disabled = true
                })
                document.querySelector(".restart").style.display = "block"
            }
    }

 let previous = "cross";
function playGame() {
    const gameBoardElement = displayController.querySelector(".gameboard")
    // gameBoardElement.textContent = `Your current score is ${user.getScore()}`
    gameBoardElement.style.display = "grid"
    winnerPara = document.querySelector(".winner")
    winnerPara.textContent = `${user1.name}'s turn`

    gridBtns = document.querySelectorAll(".gameboard button")
    console.log(gridBtns)
    gridBtns.forEach(element => {
        element.addEventListener("click", (e) => {
            let imgBtn = document.createElement("img")
            e.target.appendChild(imgBtn)
            const classAtr = e.target.getAttribute('class');
            console.log(classAtr);
            let rowIndexUser = Number(e.target.getAttribute("class")[1])
            let colIndexUser = Number(e.target.getAttribute("class")[3])
            if (gameboard[rowIndexUser-1][colIndexUser-1] === 'foo') {
                if (previous === "cross"){
                    winnerPara = document.querySelector(".winner")
                    winnerPara.textContent = `${user2.name}'s turn`
                    gameboard[rowIndexUser-1][colIndexUser-1] = 1;
                    imgBtn.setAttribute("src", "tick-04.svg")
                    e.target.disabled = true;
                    previous = "tick"
                    let winner = winnerFun(1)
                    winnerDisplay(winner)
                }
                else {
                    winnerPara = document.querySelector(".winner")
                    winnerPara.textContent = `${user1.name}'s turn`
                    gameboard[rowIndexUser-1][colIndexUser-1] = 0;
                    imgBtn.setAttribute("src", "cross-mark.svg")
                    e.target.disabled = true;
                    previous = "cross"
                   let winner = winnerFun(0)
                    winnerDisplay(winner)
                }
               
            }
            })
        })

        const restartBtn = document.querySelector(".restart")
        restartBtn.addEventListener("click", () => {
            location.reload()
        })
    }
