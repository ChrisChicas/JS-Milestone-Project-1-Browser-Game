let gameDiv
let timerDiv
let titleCard
let difficultySelectCard
let selectedDifficulty
let optionsCard
let soundStatus = "On"
let audioType
let howToCard
let gameTiles
let countdownTotal
let gameTimeTotal
let totalTiles
let mainTimer
let gameEndCard
// global variables which are constantly being changed or invoked

const uniFunctions = {
    docSelectors(){
        titleCard = document.querySelector("#title-card")
        difficultySelectCard = document.querySelector("#difficulty-div")
        mainTimer = document.querySelector("#timer-div")
        gameEndCard = document.querySelector("#game-end-div")
        optionsCard = document.querySelector("#options-div")
        howToCard = document.querySelector("#how-to-div")
    }, //selects docs for functions which need them

    screenPrep(){
        audioType = "Button-Click"
        soundCreate(audioType)
        uniFunctions.docSelectors()
        if (titleCard != null){
            titleCard.remove()
        }
    }, //runs necessary code for most screens to display

    createEGameComponents(){
        gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon"]
        selectedDifficulty = "E"
        gameDiv = document.createElement("div")
        gameDiv.id = "game-divE"
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 12
        countdownTotal = 3
        gameTimeTotal = 20
    }, //creates components for the easy difficulty game

    createMGameComponents(){
        gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon", "Banana", "Pear", "Kiwi", "Strawberry"]
        selectedDifficulty = "M"
        gameDiv = document.createElement("div")
        gameDiv.id = "game-divM"
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 20
        countdownTotal = 5
        gameTimeTotal = 30
    }, //creates components for the medium difficulty game

    createHGameComponents(){
        gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon", "Banana", "Pear", "Kiwi", "Strawberry", "Blueberries", "Coconut", "Avocado", "Lime", "Peach"]
        selectedDifficulty = "H"
        gameDiv = document.createElement("div")
        gameDiv.id = "game-divH"
        timerDiv = document.createElement("div")
        timerDiv.id = "timer-div"
        totalTiles = 30
        countdownTotal = 7
        gameTimeTotal = 45
    }, //creates components for the hard difficulty game

    async gameLogic(){
        document.body.style.backgroundImage = `url('./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Game-BG.jpg')`
        document.body.append(timerDiv)
        await randomizeTiles()
        document.body.append(gameDiv)
        await timer()
        tileFlip()
    }, //runs main game logic for any selected difficulty

    timeout(duration){
        return new Promise(function(resolve){
            setTimeout(resolve, duration)
        })
    } //pauses code with a set duration by using setTimeout function wrapped in a promise allowing for simple async usage, idea was from a few of our previous JS course exercises
} // universal functions used throughout this code

function titleScreen(){
    uniFunctions.screenPrep()
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
    let titleDiv = document.createElement("main")
    titleDiv.id = "title-card"
    titleDiv.innerHTML = `<h1>Tile Matcher!</h1>
    <h3>A Simple Memory Game</h3>
    <button id="play-button" onclick="difficultySelectScreen()">Play</button>
    <button id="option-button" onclick="optionsScreen()">Options</button>
    <button id="howto-button" onclick="howToScreen()">How To Play</button>
    <h4>Code and Assets Created By: Christian Chicas</h4>`
    document.body.append(titleDiv)
} //replicates initial title screen exactly, which is useful when traversing back and forth from game menus

function difficultySelectScreen(){
    uniFunctions.screenPrep()
    let difficultySelectDiv = document.createElement("section")
    difficultySelectDiv.id = "difficulty-div"
    difficultySelectDiv.innerHTML = `<h1>Select a difficulty!</h1>
    <button id="easy-button" onclick="mainGameE()">Easy</button>
    <button id="medium-button" onclick="mainGameM()">Medium</button>
    <button id="hard-button" onclick="mainGameH()">Hard</button>`
    document.body.append(difficultySelectDiv)
} //creates difficulty select screen

function optionsScreen(){
    uniFunctions.screenPrep()
    let optionsDiv = document.createElement("section")
    optionsDiv.id = "options-div"
    optionsDiv.innerHTML = `<h1>Options!</h1>
    <button id="mainMenu-button" onclick="titleScreen()">Main Menu</button>
    <button id="sound-button" onclick="soundControl()">Sound Effects: ${soundStatus}</button>`
    document.body.append(optionsDiv)
} //creates the options screen

function soundControl(){
    let soundButton = document.querySelector("#sound-button")
    if(soundStatus == "On"){
        soundStatus = "Off"
        soundButton.textContent = `Sound Effects: ${soundStatus}`
    } else {
        audioType = "Button-Click"
        soundStatus = "On"
        soundCreate(audioType)
        soundButton.textContent = `Sound Effects: ${soundStatus}`
    }
} //toggles sound effects on and off

function soundCreate(audioType){
    let soundEffect = document.createElement("audio")
    soundEffect.innerHTML = `<source src="./assets/Audio/${audioType}.wav" type="audio/wav">
    Your browser does not support this audio!`
    if (soundStatus == "On"){
        soundEffect.play()
    }
} //creates and plays sound effects if toggled on

function howToScreen(){
    uniFunctions.screenPrep()
    let howToDiv = document.createElement("section")
    howToDiv.id = "how-to-div"
    howToDiv.innerHTML = `<h1>How To Play!</h1>
    <h3>Before the game starts, the tiles will display their faces for a short while and then once the countdown hits zero, 
    they will flip over and the game will begin. In order to win, you must memorize the tile faces and click on pairs until 
    there are no pairs remaining! If the timer hits zero before all pairs are matched however, it will be game over, so watch out!</h3>
    <button id="mainMenu-button" onclick="titleScreen()">Main Menu</button>`
    document.body.append(howToDiv)
} //creates the how to play screen

function mainGameE(){
    uniFunctions.screenPrep()
    if (difficultySelectCard != null){
        difficultySelectCard.remove()
    }

    if (gameEndCard != null){
        mainTimer.remove()
        gameEndCard.remove()
    }
    uniFunctions.createEGameComponents()
    uniFunctions.gameLogic()
} //runs main code for the game's easy difficulty

function mainGameM(){
    uniFunctions.screenPrep()
    if (difficultySelectCard != null){
        difficultySelectCard.remove()
    }

    if (gameEndCard != null){
        mainTimer.remove()
        gameEndCard.remove()
    }
    uniFunctions.createMGameComponents()
    uniFunctions.gameLogic()
} //runs main code for the game's medium difficulty

function mainGameH(){
    uniFunctions.screenPrep()
    if (difficultySelectCard != null){
        difficultySelectCard.remove()
    }

    if (gameEndCard != null){
        mainTimer.remove()
        gameEndCard.remove()
    }
    uniFunctions.createHGameComponents()
    uniFunctions.gameLogic()
} //runs main code for the game's hard difficulty

async function randomizeTiles(){
    async function randomizerOne(){
        randomSet = gameTiles.sort((a, b) => Math.random() - 0.5) //sorts array randomly, idea from class & https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
        console.log(randomSet)
            for(let i = 0; i < randomSet.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${randomSet[i]}`
                randomTileFront.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Front-Tile-${randomSet[i]}.png`
                gameDiv.append(randomTileFront)
            }
    }

    return [await Promise.all([
        await randomizerOne(), 
        randomizerOne()
    ])]
} //appends tiles to the game board with randomly sorted game tiles

async function timer(){
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
                audioType = "Game-Win"
                soundCreate(audioType)
                gameEndScreen()
                break
            } else if(gameTimeTotal >= 0){
                timerDiv.textContent = `TIME REMAINING: ${gameTimeTotal}`
                await uniFunctions.timeout(1000)
                gameTimeTotal--
            } else{
                timerDiv.textContent = `GAME OVER! BETTER LUCK NEXT TIME!`
                await uniFunctions.timeout(100)
                audioType = "Game-Lose"
                soundCreate(audioType)
                gameEndScreen()
            }
        }
    }
    return [await countDown(), gameTimer()]
} //countdown/timer & game status gets appended to the timer on the game board + runs end game code upon player win/loss

function tileFlip(){
    let allTiles = document.querySelectorAll("[class*=tile-]")
    let activeTilesAmount = 0
    let activeTilesList = []
    allTiles.forEach(tile => {
        tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Back-Tile.png`
        tile.classList.add("back-tile")
        tile.addEventListener("click", async function(e){
            let tileSelect = e.target.classList
            for(let i = 0; i < gameTiles.length; i++){
                if(tileSelect.contains(`tile-${gameTiles[i]}`)){
                    audioType = "Tile-Click"
                    soundCreate(audioType)
                    tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Front-Tile-${gameTiles[i]}.png`
                    tile.classList.remove("back-tile")
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
            let mainGameDiv = document.querySelector(`#game-div${selectedDifficulty}`)
            mainGameDiv.style.pointerEvents = "none" //prevents clicks while checking for match to prevent bugs
            if(activeTilesList[0].src == activeTilesList[1].src){
                await uniFunctions.timeout(350)
                await match()
            } else {
                await uniFunctions.timeout(350)
                await noMatch()
            }
            mainGameDiv.style.pointerEvents = "auto" //allows for click again after match check is finished
        }
    }
    
    async function match(){
        activeTilesList.forEach(tile => {
            tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Blank-Tile.png`
            tile.removeAttribute("class") //makes tiles blank png and removes class from tiles to remove event listener
        })
        audioType = "Tile-Match"
        soundCreate(audioType)
        activeTilesAmount = 0
        activeTilesList = []
        totalTiles -= 2
    }
    
    async function noMatch(){
        activeTilesList.forEach(tile => {
            tile.src = `./assets/${selectedDifficulty}-Game/${selectedDifficulty}-Back-Tile.png`
            tile.classList.add("back-tile")
            tile.classList.remove("flipped")
        })
        audioType = "Tile-No-Match"
        soundCreate(audioType)
        activeTilesAmount = 0
        activeTilesList = []
    }
} //logic for tiles being clicked on game board + checking if two tiles clicked match or not

function gameEndScreen(){
    let mainGameDiv = document.querySelector(`#game-div${selectedDifficulty}`)
    mainGameDiv.remove()
    let gameEndDiv = document.createElement("section")
    gameEndDiv.id = "game-end-div"
    gameEndDiv.innerHTML = `<h1>Play Again?</h1>
    <button id="playAgain-button" onclick="mainGame${selectedDifficulty}()">Play Again</button>
    <button id="mainMenu-button" onclick="titleScreen()">Main Menu</button>`
    document.body.append(gameEndDiv)
} //creates conditions for the end game screen to appear