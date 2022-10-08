const container = document.querySelector(".container");
let soundStatus = "On"
// global variables which are constantly being changed or invoked

const uniFunctions = {
    soundPlay(sound){
        let soundEffect = document.createElement("audio")
        soundEffect.innerHTML = `<source src="./assets/Audio/${sound}.wav" type="audio/wav">
        Your browser does not support this audio!`
        if (soundStatus == "On"){
            soundEffect.play()
        }
    }, //creates and plays sound effects if toggled on
    
    menuPrep(){
        this.soundPlay("Button-Click")
        let titleCard = document.getElementById("title-card")
        titleCard.remove()
    }, //runs necessary code for most screens to display

    timeout(duration){
        return new Promise(function(resolve){
            setTimeout(resolve, duration)
        })
    } //pauses code with a set duration by using setTimeout function wrapped in a promise allowing for simple async usage, idea was from a few of our previous JS course exercises
} // universal functions used throughout this code

function titleScreen(){
    uniFunctions.soundPlay("Button-Click")
    let gameEndCard = document.getElementById("game-end-div")
    let mainTimer = document.getElementById("timer-div")
    let howToCard = document.getElementById("how-to-div")
    let optionsCard = document.getElementById("options-div")
    
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

    let titleDiv = document.createElement("div")
    titleDiv.id = "title-card"
    titleDiv.innerHTML = `<h1>TILE MATCHER!</h1>
        <h3>A SIMPLE MEMORY GAME</h3>
        <button id="play-button" class="btn btn-light btn-outline-dark" onclick="difficultySelectScreen()">Play</button>
        <button id="option-button" class="btn btn-light btn-outline-dark" onclick="optionsScreen()">Options</button>
        <button id="howto-button" class="btn btn-light btn-outline-dark" onclick="howToScreen()">How To Play</button>
        <h4>CODE AND ASSETS CREATED BY: CHRISTIAN CHICAS</h4>`
    container.append(titleDiv)
} //replicates initial title screen exactly, which is useful when traversing back and forth from game menus

function difficultySelectScreen(){
    uniFunctions.menuPrep()

    let difficultySelectDiv = document.createElement("div")
    difficultySelectDiv.id = "difficulty-div"
    difficultySelectDiv.innerHTML = `<h1>SELECT A DIFFICULTY:</h1>
    <button id="easy-button" class="btn btn-light btn-outline-dark" onclick="mainGame('E')">Easy</button>
    <button id="medium-button" class="btn btn-light btn-outline-dark" onclick="mainGame('M')">Medium</button>
    <button id="hard-button" class="btn btn-light btn-outline-dark" onclick="mainGame('H')">Hard</button>`
    container.append(difficultySelectDiv)
} //creates difficulty select screen

function optionsScreen(){
    uniFunctions.menuPrep()
    let optionsDiv = document.createElement("div")
    optionsDiv.id = "options-div"
    optionsDiv.innerHTML = `<h1>OPTIONS:</h1>
    <button id="mainMenu-button" class="btn btn-light btn-outline-dark" onclick="titleScreen()">Main Menu</button>
    <button id="sound-button" class="btn btn-light btn-outline-dark" onclick="soundControl()">Sound Effects: ${soundStatus}</button>`
    container.append(optionsDiv)
} //creates the options screen

function soundControl(){
    let soundButton = document.getElementById("sound-button")
    if(soundStatus == "On"){
        soundStatus = "Off"
        soundButton.textContent = `Sound Effects: ${soundStatus}`
    } else {
        audioType = "Button-Click"
        soundStatus = "On"
        uniFunctions.soundPlay(audioType)
        soundButton.textContent = `Sound Effects: ${soundStatus}`
    }
} //toggles sound effects on and off

function howToScreen(){
    uniFunctions.menuPrep()
    
    let howToDiv = document.createElement("div")
    howToDiv.id = "how-to-div"
    howToDiv.innerHTML = `<h1>How To Play:</h1>
    <h4>Before the game starts, the tiles will display their faces for a short while and then once the countdown hits zero, 
    they will flip over and the game will begin. In order to win, you must memorize the tile faces and click on pairs until 
    there are no pairs remaining! If the timer hits zero before all pairs are matched however, it will be game over, so watch out!</h4>`.toUpperCase() + 
    `<button id="mainMenu-button" class="btn btn-light btn-outline-dark" onclick="titleScreen()">Main Menu</button>`
    container.append(howToDiv)
} //creates the how to play screen

function gameEndScreen(difficulty){
    let gameDiv = document.getElementById(`game-div${difficulty}`)
    gameDiv.remove()
    let gameEndDiv = document.createElement("div")
    gameEndDiv.id = "game-end-div"
    gameEndDiv.innerHTML = `<h1>PLAY AGAIN?</h1>
    <button id="playAgain-button" class="btn btn-light btn-outline-dark" onclick="mainGame('${difficulty}')">Play Again</button>
    <button id="mainMenu-button" class="btn btn-light btn-outline-dark" onclick="titleScreen()">Main Menu</button>`
    container.append(gameEndDiv)
} //creates the end game screen to appear

async function mainGame(difficulty){
    let gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon", "Banana", "Pear", "Kiwi", "Strawberry", "Blueberries", "Coconut", "Avocado", "Lime", "Peach"]
    let totalTiles = 12
    let countdownTotal = 3
    let gameTimeTotal = 20

    let difficultySelectCard = document.getElementById("difficulty-div")
    let mainTimer = document.getElementById("timer-div")
    let gameEndCard = document.getElementById("game-end-div")

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

    let timerDiv = document.createElement("div")
    timerDiv.id = "timer-div"
    container.append(timerDiv)
    let gameDiv = document.createElement("div")
    gameDiv.id = `game-div${difficulty}`
    container.append(gameDiv)
    
    await gameLogic(difficulty, gameTiles, countdownTotal, gameTimeTotal, totalTiles)
} //runs main code for the game's easy difficulty

async function gameLogic(difficulty, gameTiles, countdownTotal, gameTimeTotal, totalTiles){
    let gameDiv = document.getElementById(`game-div${difficulty}`)

    async function randomizeTiles(){
        async function randomizer(){
            randomSet = gameTiles.sort((a, b) => Math.random() - 0.5) //sorts array randomly, idea from class & https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
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

    async function timer(){
        let timerDiv = document.getElementById("timer-div")   
        async function countDown(){
            for(let i = (countdownTotal + 2); i > 0; i--){
                if(countdownTotal >= 0){
                    timerDiv.innerHTML = `<h1>GAME STARTING IN: ${countdownTotal}</h1>`
                    await uniFunctions.timeout(1000)
                    countdownTotal--
                } else{
                    timerDiv.innerHTML = "<h1>GAME START!!!!</h1>"
                    await uniFunctions.timeout(1000)
                }
            }
        }

        async function gameTimer(){
            for (let i = (gameTimeTotal + 2); i > 0; i--){
                if (totalTiles == 0){
                    timerDiv.innerHTML = "<h1>CONGRATULATIONS! YOU WIN!</h1>"
                    await uniFunctions.timeout(100)
                    uniFunctions.soundPlay("Game-Win")
                    gameEndScreen(difficulty)
                    break
                } else if(gameTimeTotal >= 0){
                    timerDiv.innerHTML = `<h1>TIME REMAINING: ${gameTimeTotal}</h1>`
                    await uniFunctions.timeout(1000)
                    gameTimeTotal--
                } else{
                    timerDiv.innerHTML = "<h1>GAME OVER! BETTER LUCK NEXT TIME!</h1>"
                    await uniFunctions.timeout(100)
                    uniFunctions.soundPlay("Game-Lose")
                    gameEndScreen(difficulty)
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
            tile.src = `./assets/${difficulty}-Game/${difficulty}-Back-Tile.png`
            tile.classList.add("back-tile")
            tile.addEventListener("click", async function(e){
                let tileSelect = e.target.classList
                for(let i = 0; i < gameTiles.length; i++){
                    if(tileSelect.contains(`tile-${gameTiles[i]}`)){
                        uniFunctions.soundPlay("Tile-Click")
                        tile.src = `./assets/${difficulty}-Game/${difficulty}-Front-Tile-${gameTiles[i]}.png`
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
                gameDiv.style.pointerEvents = "none" //prevents clicks while checking for match to prevent bugs
                if(activeTilesList[0].src == activeTilesList[1].src){
                    await uniFunctions.timeout(350)
                    await match()
                } else {
                    await uniFunctions.timeout(350)
                    await noMatch()
                }
                gameDiv.style.pointerEvents = "auto" //allows for click again after match check is finished
            }
        }
        
        async function match(){
            activeTilesList.forEach(tile => {
                tile.src = `./assets/${difficulty}-Game/${difficulty}-Blank-Tile.png`
                tile.removeAttribute("class") //makes tiles blank png and removes class from tiles to remove event listener
            })
            audioType = "Tile-Match"
            uniFunctions.soundPlay("Tile-Match")
            activeTilesAmount = 0
            activeTilesList = []
            totalTiles -= 2
        }
        
        async function noMatch(){
            activeTilesList.forEach(tile => {
                tile.src = `./assets/${difficulty}-Game/${difficulty}-Back-Tile.png`
                tile.classList.add("back-tile")
                tile.classList.remove("flipped")
            })
            uniFunctions.soundPlay("Tile-No-Match")
            activeTilesAmount = 0
            activeTilesList = []
        }
    } //logic for tiles being clicked on game board + checking if two tiles clicked match or not

    await randomizeTiles()
    await timer()
    tileFlip()
} //logic to ensure the game conditions are set and run properly