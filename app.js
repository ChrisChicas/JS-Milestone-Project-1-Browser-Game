const container = document.querySelector(".container");

let soundStatus = "On"
// global variables which are constantly being changed or invoked

const uniFunctions = {
    menuPrep(){
        soundPlay("Button-Click")
        let titleCard = document.querySelector("#title-card")
        titleCard.remove()
    }, //runs necessary code for most screens to display

    timeout(duration){
        return new Promise(function(resolve){
            setTimeout(resolve, duration)
        })
    } //pauses code with a set duration by using setTimeout function wrapped in a promise allowing for simple async usage, idea was from a few of our previous JS course exercises
} // universal functions used throughout this code

function titleScreen(){
    soundPlay("Button-Click")
    let gameEndCard = document.querySelector("#game-end-div")
    let mainTimer = document.querySelector("#timer-div")
    let howToCard = document.querySelector("#how-to-div")
    let optionsCard = document.querySelector("#options-div")
    
    if (optionsCard != null){
        optionsCard.remove()
    }

    if (howToCard != null){
        howToCard.remove()
    }

    if (gameEndCard != null){
        mainTimer.remove()
        gameEndCard.remove()
    }

    document.body.style.backgroundImage = "url('./assets/Title-BG.jpg')"
    let titleDiv = document.createElement("div")
    titleDiv.id = "title-card"
    titleDiv.innerHTML = `<h1 class="display-1">Tile Matcher!</h1>
        <h3 class="display-3">A Simple Memory Game</h3>
        <button id="play-button" class="btn btn-light btn-outline-dark" onclick="difficultySelectScreen()">Play</button>
        <button id="option-button" class="btn btn-light btn-outline-dark" onclick="optionsScreen()">Options</button>
        <button id="howto-button" class="btn btn-light btn-outline-dark" onclick="howToScreen()">How To Play</button>
        <h4 class="display-4">Code and Assets Created By: Christian Chicas</h4>`
    container.append(titleDiv)
} //replicates initial title screen exactly, which is useful when traversing back and forth from game menus

function difficultySelectScreen(){
    uniFunctions.menuPrep()

    let difficultySelectDiv = document.createElement("div")
    difficultySelectDiv.id = "difficulty-div"
    difficultySelectDiv.innerHTML = `<h1 class="display-1">Select a difficulty!</h1>
    <button id="easy-button" class="btn btn-light btn-outline-dark" onclick="mainGame('E')">Easy</button>
    <button id="medium-button" class="btn btn-light btn-outline-dark" onclick="mainGame('M')">Medium</button>
    <button id="hard-button" class="btn btn-light btn-outline-dark" onclick="mainGame('H')">Hard</button>`
    container.append(difficultySelectDiv)
} //creates difficulty select screen

function optionsScreen(){
    uniFunctions.menuPrep()
    let optionsDiv = document.createElement("div")
    optionsDiv.id = "options-div"
    optionsDiv.innerHTML = `<h1 class="display-1">Options!</h1>
    <button id="mainMenu-button" class="btn btn-light btn-outline-dark" onclick="titleScreen()">Main Menu</button>
    <button id="sound-button" class="btn btn-light btn-outline-dark" onclick="soundControl()">Sound Effects: ${soundStatus}</button>`
    container.append(optionsDiv)
} //creates the options screen

function soundControl(){
    let soundButton = document.querySelector("#sound-button")
    if(soundStatus == "On"){
        soundStatus = "Off"
        soundButton.textContent = `Sound Effects: ${soundStatus}`
    } else {
        audioType = "Button-Click"
        soundStatus = "On"
        soundPlay(audioType)
        soundButton.textContent = `Sound Effects: ${soundStatus}`
    }
} //toggles sound effects on and off

function soundPlay(sound){
    let soundEffect = document.createElement("audio")
    soundEffect.innerHTML = `<source src="./assets/Audio/${sound}.wav" type="audio/wav">
    Your browser does not support this audio!`
    if (soundStatus == "On"){
        soundEffect.play()
    }
} //creates and plays sound effects if toggled on

function howToScreen(){
    uniFunctions.menuPrep()
    
    let howToDiv = document.createElement("div")
    howToDiv.id = "how-to-div"
    howToDiv.innerHTML = `<h1 class="display-1">How To Play!</h1>
    <h4 class="display-4">Before the game starts, the tiles will display their faces for a short while and then once the countdown hits zero, 
    they will flip over and the game will begin. In order to win, you must memorize the tile faces and click on pairs until 
    there are no pairs remaining! If the timer hits zero before all pairs are matched however, it will be game over, so watch out!</h4>
    <button id="mainMenu-button" class="btn btn-light btn-outline-dark" onclick="titleScreen()">Main Menu</button>`
    container.append(howToDiv)
} //creates the how to play screen

async function mainGame(difficulty){
    let gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon", "Banana", "Pear", "Kiwi", "Strawberry", "Blueberries", "Coconut", "Avocado", "Lime", "Peach"]
    let totalTiles = 12
    let countdownTotal = 3
    let gameTimeTotal = 20

    let difficultySelectCard = document.querySelector("#difficulty-div")
    let mainTimer = document.querySelector("#timer-div")
    let gameEndCard = document.querySelector("#game-end-div")

    if (difficultySelectCard != null){
        difficultySelectCard.remove()
    } else if (gameEndCard != null){
        mainTimer.remove()
        gameEndCard.remove()
    }

    if (difficulty === "E"){
        gameTiles = gameTiles.slice(0,6)    
    } else if (difficulty === "M"){
        gameTiles = gameTiles.slice(0,10)
        totalTiles += 8
        countdownTotal += 2
        gameTimeTotal += 10
    } else {
        totalTiles += 18
        countdownTotal += 4
        gameTimeTotal += 25
    }
    
    let gameDiv = document.createElement("div")
    gameDiv.id = `game-div${difficulty}`
    document.body.append(gameDiv)
    let timerDiv = document.createElement("div")
    timerDiv.id = "timer-div"
    document.body.append(timerDiv)

    document.body.style.backgroundImage = `url('./assets/${difficulty}-Game/${difficulty}-Game-BG.jpg')`
    await randomizeTiles(difficulty, gameTiles)
    
    await timer(countdownTotal, gameTimeTotal, totalTiles)
    tileFlip(difficulty, gameTiles, totalTiles)
} //runs main code for the game's easy difficulty

async function randomizeTiles(difficulty, gameTiles){
    let gameDiv = document.getElementById(`game-div${difficulty}`)
    async function randomizer(){
        randomSet = gameTiles.sort(() => Math.random() - 0.5) //sorts array randomly, idea from class & https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
            for(let i = 0; i < randomSet.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${randomSet[i]}`
                randomTileFront.src = `./assets/${difficulty}-Game/${difficulty}-Front-Tile-${randomSet[i]}.png`
                gameDiv.append(randomTileFront)
            }
    }

    return [await Promise.all([
        await randomizer(), 
        randomizer()
    ])]
} //appends tiles to the game board with randomly sorted game tiles

async function timer(countdownTotal, gameTimeTotal, totalTiles){
    let timerDiv = document.getElementById("timer-div")   
    async function countDown(){
        for(let i = (countdownTotal + 2); i > 0; i--){
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
        for (let i = (gameTimeTotal + 2); i > 0; i--){
            if (totalTiles == 0){
                timerDiv.textContent = "CONGRATULATIONS! YOU WIN!"
                await uniFunctions.timeout(100)
                soundPlay("Game-Win")
                gameEndScreen()
                break
            } else if(gameTimeTotal >= 0){
                timerDiv.textContent = `TIME REMAINING: ${gameTimeTotal}`
                await uniFunctions.timeout(1000)
                gameTimeTotal--
            } else{
                timerDiv.textContent = `GAME OVER! BETTER LUCK NEXT TIME!`
                await uniFunctions.timeout(100)
                soundPlay("Game-Lose")
                gameEndScreen()
            }
        }
    }
    return [await countDown(), gameTimer()]
} //countdown/timer & game status gets appended to the timer on the game board + runs end game code upon player win/loss

function tileFlip(difficulty, gameTiles, totalTiles){
    let allTiles = document.querySelectorAll("[class*=tile-]")
    let activeTilesAmount = 0
    let activeTilesList = []
    allTiles.forEach(tile => {
        tile.src = `./assets/${difficulty}-Game/${difficulty}-Back-Tile.png`
        tile.classList.add("back-tile")
        tile.addEventListener("click", async function(e){
            let tileSelect = e.target.classList
            for(let i = 0; i < gameTiles.length; i++){
                if(tileSelect.contains(`tile-${gameTiles[i]}`)){
                    soundPlay("Tile-Click")
                    tile.src = `./assets/${difficulty}-Game/${difficulty}-Front-Tile-${gameTiles[i]}.png`
                    tile.classList.remove("back-tile")
                    tile.classList.add("flipped")
                    activeTilesAmount++
                    activeTilesList.push(tile)
                    await matchCheck(difficulty, totalTiles)
                }
            }
        })
    })

    async function matchCheck(difficulty, totalTiles){
        if(activeTilesAmount == 2){
            let mainGameDiv = document.querySelector(`#game-div${difficulty}`)
            mainGameDiv.style.pointerEvents = "none" //prevents clicks while checking for match to prevent bugs
            if(activeTilesList[0].src == activeTilesList[1].src){
                await uniFunctions.timeout(350)
                await match(difficulty, totalTiles)
            } else {
                await uniFunctions.timeout(350)
                await noMatch(difficulty)
            }
            mainGameDiv.style.pointerEvents = "auto" //allows for click again after match check is finished
        }
    }
    
    async function match(difficulty, totalTiles){
        activeTilesList.forEach(tile => {
            tile.src = `./assets/${difficulty}-Game/${difficulty}-Blank-Tile.png`
            tile.removeAttribute("class") //makes tiles blank png and removes class from tiles to remove event listener
        })
        audioType = "Tile-Match"
        soundPlay("Tile-Match")
        activeTilesAmount = 0
        activeTilesList = []
        totalTiles -= 2
    }
    
    async function noMatch(difficulty){
        activeTilesList.forEach(tile => {
            tile.src = `./assets/${difficulty}-Game/${difficulty}-Back-Tile.png`
            tile.classList.add("back-tile")
            tile.classList.remove("flipped")
        })
        soundPlay("Tile-No-Match")
        activeTilesAmount = 0
        activeTilesList = []
    }
} //logic for tiles being clicked on game board + checking if two tiles clicked match or not

function gameEndScreen(){
    let mainGameDiv = document.querySelector(`#game-div${selectedDifficulty}`)
    mainGameDiv.remove()
    let gameEndDiv = document.createElement("div")
    gameEndDiv.id = "game-end-div"
    gameEndDiv.innerHTML = `<h1 class="display-1">Play Again?</h1>
    <button id="playAgain-button" class="btn btn-light btn-outline-dark" onclick="mainGame${selectedDifficulty}()">Play Again</button>
    <button id="mainMenu-button" class="btn btn-light btn-outline-dark" onclick="titleScreen()">Main Menu</button>`
    container.append(gameEndDiv)
} //creates conditions for the end game screen to appear

//TO FIX: game doesnt end when all tiles complete, end game card doesnt appear