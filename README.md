# JS-Milestone-Project-1-Browser-Game
## NJIT-SD-03 Milestone Project: Planning
--------

## Game Deployment: 
- Git Hub Pages: [Link](https://chrischicas.github.io/Tile-Matcher-Game/)

## Project Description

For this project, I wish to create a simple single-player memory matching game! My idea is that there will be different tiles or pieces on a board that will show for a few seconds before the game starts that the player will have to remember, and once that countdown goes down, the tiles will flip over and the player will attempt to flip over matching tile pairs before the timer runs out! Upon matching a tile pair, the tile pair should disappear until there are no tiles left or until the timer runs out as previously mentioned.
## Game Logic

Upon loading the page, launch title screen (maybe functions for each part of the game? eg. title, options, difficulty select, and game).

Add a button on title screen that takes you to the game itself.

Add a background in the game section with sections for the tiles, and have the tiles be imgs that take up one section of the background. (maybe a container div for tiles)

Somehow randomize each tile's location within container div?

Add eventlisteners to each tile img to respond to a click which will show the tile. If two matching tiles clicked, have tiles disappear, otherwise if two tiles aren't matching, have tiles hide again.

Implement a timer that runs while the game is active, if timer runs out, end game.

Implement if all tiles run out, end game. (perhaps have a tile count, and when tiles = 0, game ends)

Add a play again/main menu screen after game ends. Buttons would replay game and take to main menu respectively.

Potentially add post-mvp options as well.

## Deliverables

### MVP Criteria

- Add a title screen with a play game button (maybe other options post-mvp).
- Have tiles show before game starts and hide when game starts.
- Have tiles show when clicked/have tiles disappear when two matching tiles are clicked/have tiles hide when two non-matching tiles are clicked.
- Have the game end in a player victory screen if they sucessfully match all tiles/have the game end in a player losing screen if the timer runs out.
- Add a play again & main menu option after the game ends.

### Post-MVP Plans

- Potentially add multiple difficulties! Easy, medium, and hard where there are more tiles and or less time the higher the difficulty. 
- Potentially add animations for the tile flipping and or sound effects/background music.
- Have an options button on the title screen to change tile sets to be different colors/themes & lower/disable sound effects and music.

## Project Planning

| Date | Goals |
| ---- | ----- |
| Sun. 01/23 | Create GitHub repository. Complete README.md. Work on gathering/creating assets. |
| Tue. 01/25 | Have already started working on MVP Criteria. Try to have title screen and see how to implement background/tile images properly. |
| Thu. 01/27 | Continue to work on MVP Criteria & if done work on Post-MVP Criteria. Add logic to tiles and create end game conditions. |
| Sun. 01/30 | Hopefully be done with MVP Criteria and potentially work on Post-MVP Criteria. Have end game screen done and try to work on harder difficulties.  |
| Tue. 02/01 | Continue to work on project, hopefully touching things up by this point. Work on gathering/creating audio assets for the game & options menu. |
| Thu. 02/03 | Deploy to GitHub Pages. Submit completed project. Project presentations. |
