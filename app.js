function titleScreen(){
    document.body.style.backgroundImage = "url('./assets/Title-BG.jpg')"
    let titleDiv = document.createElement("div")
    titleDiv.id = "title-card"
    titleDiv.innerHTML = `<h1>Memory Tile Match!</h1>
    <h3>A simple memory game by Christian Chicas</h3>
    <button id="play-button" onclick="mainGame()">Play</button>`
    document.body.append(titleDiv)
} //replicates initial title screen, which allows for later implemintation of main menu button

function mainGame(){
    let titleCard = document.querySelector("#title-card")
    titleCard.remove()
    document.body.style.backgroundImage = "url('./assets/E-Game-BG.jpg')"
    let test = document.createElement("button") //temp test button to go back to title screen
    test.textContent = "test"
    test.addEventListener("click", function(){
        titleScreen()
        test.remove()
    })
    document.body.append(test)
}
