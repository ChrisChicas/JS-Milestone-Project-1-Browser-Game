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

function mainGame(){
    let titleCard = document.querySelector("#title-card")
    titleCard.remove()
    document.body.style.backgroundImage = "url('./assets/E-Game-BG.jpg')"
    let gameDiv = document.createElement("div")
    gameDiv.id = "game-div"
    let timerDiv = document.createElement("div")
    timerDiv.id = "timer-div"
    timerDiv.textContent = "TIME REMAINING: 10"
    for(let i = 0; i < 12; i++){
        let tileBack = document.createElement("img")
        tileBack.src = "./assets/Back-Tile.png"
        tileBack.addEventListener("click", function() {
            if(tileBack.getAttribute("src") == "./assets/Back-Tile.png"){
                tileBack.src = "./assets/E-Front-Tile-Test.png"
            } else {
                tileBack.src = "./assets/Back-Tile.png"
            }
        })
        gameDiv.append(tileBack)
    }
    
    document.body.append(gameDiv, timerDiv)
}
