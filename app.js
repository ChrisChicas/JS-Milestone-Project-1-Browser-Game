let gameDiv
let timerDiv
let titleDiv
let gameDifficultySelect
let difficultySelectDiv
let selectedDifficulty
let totalTiles
let titleCard
let mainGameDiv
let mainTimerDiv
let gameEndDiv
let gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon"]
// global variables which are constantly being changed or invoked

const uniFunctions = {
    docSelectors(){
        titleCard = document.querySelector("#title-card")
        gameDifficultySelect = document.querySelector("#game-difficulty-select")
        mainTimerDiv = document.querySelector("#timer-div")
        gameEndDiv = document.querySelector("#game-end-div")
    }, //selects docs for functions which need them

    createEGameComponents(){
        selectedDifficulty = "E"
        gameDiv = document.createElement("div")
        gameDiv.id = `game-div${selectedDifficulty}`
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 12
    }, //creates components for the easy difficulty game

    createMenuComponents(){
        document.body.style.backgroundImage = "url('./assets/Title-BG.jpg')"
        titleDiv = document.createElement("div")
        titleDiv.id = "title-card"
        titleDiv.innerHTML = `<h1>Memory Tile Match!</h1>
        <h3>A simple memory game by Christian Chicas</h3>
        <button id="play-button" onclick="difficultySelectScreen()">Play</button>`
        document.body.append(titleDiv)
    }, //creates components for the main menu

    gameEndScreen(){
        mainGameDiv = document.querySelector(`#game-div${selectedDifficulty}`)
        mainGameDiv.remove()
        gameEndDiv = document.createElement("div")
        gameEndDiv.id = "game-end-div"
        gameEndDiv.innerHTML = `<h1>Play Again?</h1>
        <button id="playAgain-button" onclick="mainGame${selectedDifficulty}()">Play Again</button>
        <button id="mainMenu-button" onclick="titleScreen()">Main Menu</button>`
        document.body.append(gameEndDiv)
    }, //creates conditions for the end game screen to appear

    randomizeTime(){
        return Math.floor(Math.random() * 500)
    }, //generates a random number which between 0 and 500, used for timeout duration
    
    timeout(duration){
        return new Promise(function(resolve){
            setTimeout(resolve, duration)
        })
    } //sets timeout for set or random durations
} // universal functions used throughout this code

function titleScreen(){
    uniFunctions.docSelectors()
    if (titleCard == null){
        mainTimerDiv.remove()
        gameEndDiv.remove()
        uniFunctions.createMenuComponents()
    }
} //replicates initial title screen, which allows for addition of main menu button

function difficultySelectScreen(){
    uniFunctions.docSelectors()
    titleCard.remove()
    difficultySelectDiv = document.createElement("div")
    difficultySelectDiv.id = "game-difficulty-select"
    difficultySelectDiv.innerHTML = `<h1>Select a difficulty!</h1>
    <button id="easy-button" onclick="mainGameE()">Easy</button>
    <button id="medium-button" onclick="">Medium</button>
    <button id="hard-button" onclick="">Hard</button>`
    document.body.append(difficultySelectDiv)
}

async function mainGameE(){
    uniFunctions.docSelectors()
    if (gameDifficultySelect != null){
        gameDifficultySelect.remove()
    }

    if (mainTimerDiv != null){
        mainTimerDiv.remove()
        gameEndDiv.remove()
        uniFunctions.createEGameComponents()
    } else {
        uniFunctions.createEGameComponents()
    }

    document.body.style.backgroundImage = "url('./assets/E-Game/E-Game-BG.jpg')"
    timerDiv.textContent = "LOADING TILES..."
    document.body.append(timerDiv)
    await randomizeTiles()
    document.body.append(gameDiv)
    await timer()
    tileFlip()
}

async function randomizeTiles(){
    await uniFunctions.timeout(uniFunctions.randomizeTime())
    async function randomizerOne(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[i]}`
                randomTileFront.src = `./assets/E-Game/E-Front-Tile-${gameTiles[i]}.png`
                await uniFunctions.timeout(uniFunctions.randomizeTime())
                gameDiv.append(randomTileFront)
            }
    }

    async function randomizerTwo(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[(gameTiles.length - 1) - i]}`
                randomTileFront.src = `./assets/E-Game/E-Front-Tile-${gameTiles[(gameTiles.length - 1) - i]}.png`
                await uniFunctions.timeout(uniFunctions.randomizeTime())
                gameDiv.append(randomTileFront)
            }
    }
    return [await Promise.all([
        randomizerOne(), 
        randomizerTwo()
    ])]
}

async function timer(){
    let countdownTotal = 5
    let gameTimeTotal = 15
    async function countDown(){
        for(let i = 7; i > 0; i--){
            if(countdownTotal >= 0){
                timerDiv.textContent = `GAME STARTING IN: ${countdownTotal}`
                await uniFunctions.timeout(1000)
                countdownTotal--
            } else{
                timerDiv.textContent = `GAME START!!!`
                await uniFunctions.timeout(1000)
            }
        }
    }

    async function gameTimer(){
        for (let i = 17; i > 0; i--){
            if (totalTiles == 0){
                timerDiv.textContent = "CONGRATULATIONS! YOU WIN!"
                uniFunctions.gameEndScreen()
                break
            } else if(gameTimeTotal >= 0){
                timerDiv.textContent = `TIME REMAINING: ${gameTimeTotal}`
                await uniFunctions.timeout(1000)
                gameTimeTotal--
            } else{
                timerDiv.textContent = `GAME OVER! BETTER LUCK NEXT TIME!`
                uniFunctions.gameEndScreen()
            }
        }
    }
    return [await countDown(), gameTimer()]
}

function tileFlip(){
    let allTiles = document.querySelectorAll("[class*=tile-]")
    let activeTilesAmount = 0
    let activeTilesList = []
    allTiles.forEach(tile => {
        tile.src = "./assets/E-Game/E-Back-Tile.png"
        tile.classList.add("back-tile")
        tile.addEventListener("click", async function(e){
            let tileSelect = e.target.classList
            for(let i = 0; i < gameTiles.length; i++){
                if(tileSelect.contains(`tile-${gameTiles[i]}`)){
                    tile.src = `./assets/E-Game/E-Front-Tile-${gameTiles[i]}.png`
                    tile.classList.add("flipped")
                    activeTilesAmount++
                    activeTilesList.push(tile)
                    await matchCheck()
                }
            }
        })
    })

    async function matchCheck(){
        if(activeTilesAmount == 2){
            if(activeTilesList[0].src == activeTilesList[1].src){
                await uniFunctions.timeout(350)
                await match()
            } else {
                await uniFunctions.timeout(350)
                await noMatch()
            }
        }
    }
    
    async function match(){
        activeTilesList.forEach(tile => {
            tile.src = "./assets/E-Game/E-Blank-Tile.png"
            tile.removeAttribute("class")
        })
        activeTilesAmount = 0
        activeTilesList = []
        totalTiles -= 2
    }
    
    async function noMatch(){
        activeTilesList.forEach(tile => {
            tile.src = "./assets/E-Game/E-Back-Tile.png"
            tile.classList.remove("flipped")
        })
        activeTilesAmount = 0
        activeTilesList = []
    }
}
