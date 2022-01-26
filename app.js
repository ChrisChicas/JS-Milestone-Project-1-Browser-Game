let gameDiv = document.createElement("div")
gameDiv.id = "game-div"
let timerDiv = document.createElement("div")
timerDiv.id = "timer-div"
let totalTiles = 12

function titleScreen(){
    document.body.style.backgroundImage = "url('./assets/Title-BG.jpg')"
    let titleDiv = document.createElement("div")
    titleDiv.id = "title-card"
    titleDiv.innerHTML = `<h1>Memory Tile Match!</h1>
    <h3>A simple memory game by Christian Chicas</h3>
    <button id="play-button" onclick="mainGame()">Play</button>`
    document.body.append(titleDiv)
} //replicates initial title screen, which allows for later implemintation of main menu button

let gameTiles = ["Apple", "Cherries", "Grapes", "Lemon", "Orange", "Watermelon"]

async function mainGame(){
    let titleCard = document.querySelector("#title-card")
    titleCard.remove()
    document.body.style.backgroundImage = "url('./assets/E-Game-BG.jpg')"
    timerDiv.textContent = "LOADING TILES..."
    document.body.append(timerDiv)
    await randomizeTiles()
    document.body.append(gameDiv)
    await timer()
    tileFlip()
}

async function randomizeTiles(){
    await timeout(randomizeTime())
    async function randomizerOne(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[i]}`
                randomTileFront.src = `./assets/E-Front-Tile-${gameTiles[i]}.png`
                await timeout(randomizeTime())
                gameDiv.append(randomTileFront)
            }
    }

    async function randomizerTwo(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[(gameTiles.length - 1) - i]}`
                randomTileFront.src = `./assets/E-Front-Tile-${gameTiles[(gameTiles.length - 1) - i]}.png`
                await timeout(randomizeTime())
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
    let gameTimeTotal = 30
    async function countDown(){
        for(let i = 7; i > 0; i--){
            if(countdownTotal >= 0){
                timerDiv.textContent = `GAME STARTING IN: ${countdownTotal}`
                await timeout(1000)
                countdownTotal--
            } else{
                timerDiv.textContent = `GAME START!!!`
                await timeout(1000)
            }
        }
    }

    async function gameTimer(){
        for (let i = 32; i > 0; i--){
            if(totalTiles == 0){
                timerDiv.textContent = "CONGRATS WOO!!"
            } else if(gameTimeTotal >= 0){
                timerDiv.textContent = `TIME REMAINING: ${gameTimeTotal}`
                await timeout(1000)
                gameTimeTotal--
            } else{
                timerDiv.textContent = `GAME OVER!`
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
        tile.src = "./assets/E-Back-Tile.png"
        tile.classList.add("back-tile")
        tile.addEventListener("click", async function(e){
            let tileSelect = e.target.classList
            for(let i = 0; i < gameTiles.length; i++){
                if(tileSelect.contains(`tile-${gameTiles[i]}`)){
                    tile.src = `./assets/E-Front-Tile-${gameTiles[i]}.png`
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
                await timeout(500)
                await match()
            } else {
                await timeout(500)
                await noMatch()
            }
        }
    }

    async function match(){
        activeTilesList.forEach(tile => {
            tile.src = "./assets/E-Blank-Tile.png"
            tile.removeAttribute("class")
        })
        activeTilesAmount = 0
        activeTilesList = []
        totalTiles -= 2
    }

    async function noMatch(){
        activeTilesList.forEach(tile => {
            tile.src = "./assets/E-Back-Tile.png"
            tile.classList.remove("flipped")
        })
        activeTilesAmount = 0
        activeTilesList = []
    }
}

function randomizeTime(){
    return Math.floor(Math.random() * 500)
}

function timeout(duration){
    return new Promise(function(resolve){
        setTimeout(resolve, duration)
    })
}