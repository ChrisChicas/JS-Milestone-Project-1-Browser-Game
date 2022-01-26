let gameDiv = document.createElement("div")
gameDiv.id = "game-div"
let timerDiv = document.createElement("div")
timerDiv.id = "timer-div"

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
}

function randomizeTime(){
    return Math.floor(Math.random() * 500)
}

function timeout(duration){
    return new Promise(function(resolve){
        setTimeout(resolve, duration)
    })
}

async function randomizeTiles(){
    await timeout(randomizeTime())
    async function randomizerOne(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[i]}`
                randomTileFront.src = `./assets/Front-Tile-${gameTiles[i]}.png`
                await timeout(randomizeTime())
                gameDiv.append(randomTileFront)
            }
    }

    async function randomizerTwo(){
            for(let i = 0; i < gameTiles.length; i++){
                let randomTileFront = document.createElement("img")
                randomTileFront.className = `tile-${gameTiles[(gameTiles.length - 1) - i]}`
                randomTileFront.src = `./assets/Front-Tile-${gameTiles[(gameTiles.length - 1) - i]}.png`
                await timeout(randomizeTime())
                gameDiv.append(randomTileFront)
            }
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

        function tileFlip(){
            let allTiles = document.querySelectorAll("[class*=tile-]")
            console.log(allTiles)
            allTiles.forEach(tile => {
            tile.src = "./assets/Back-Tile.png"
            tile.classList.add("back-tile")
            tile.addEventListener("click", function(e){
                let tileSelect = e.target
                if (tileSelect.classList.contains("tile-Apple")){
                    console.log(`yes`)
                } else{
                    console.log(`no`)
                }
            })
            })
        }

        async function gameTime(){
            for (let i = 32; i > 0; i--){
                if(gameTimeTotal >= 0){
                    timerDiv.textContent = `TIME REMAINING: ${gameTimeTotal}`
                    await timeout(1000)
                    gameTimeTotal--
                } else{
                    timerDiv.textContent = `GAME OVER!`
                }
            }
        }
        return [await countDown(), tileFlip(), gameTime()]
    }

    return [await Promise.all([
        randomizerOne(), 
        randomizerTwo()
    ]), timer()]

}

