//The flow of game logic will be denoted with numbered comments. Follow the numbers to see 
//how this all works.

//1) The squares are all bound and placed into an array. This makes adding events to them easier
//later on.

const topLeft = document.querySelector("#topLeft")
const topMiddle = document.querySelector("#topCenter")
const topRight = document.querySelector("#topRight")

const middleLeft = document.querySelector("#middleLeft")
const middleMiddle = document.querySelector("#middleCenter")
const middleRight = document.querySelector("#middleRight")

const bottomLeft = document.querySelector("#bottomLeft")
const bottomMiddle = document.querySelector("#bottomCenter")
const bottomRight = document.querySelector("#bottomRight")

const gridArray = [topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft, bottomMiddle, bottomRight]

//2) The player clicks on the "start game button". This creates a new object of class "game". The game
//logic function is down below the class

document.querySelector(".start-game").addEventListener("click", gameLogic)



class Game{

  //3) The Game class creates a 2 variables, player turn, which is a boolean that tracks the current player's
  //turn. True means its player 1's turn, and false means its player 2's turn.
  //The second variable is turnAnnouncement, which contains the string telling you which player's turn
  //it currently is. By default, this string is set to hidden

  constructor(playerTurn){
    this.playerTurn = playerTurn
    this.turnAnnouncement = document.querySelector(".current-turn")

  }

  //4) The start game function is the very first function that this code runs after being created
  //in game logic. This code toggles the "hidden" attribute off of the turn announcement, making it visible
  //although for now there's nothing in it.
  //The most important part of this code is addition of the "end-turn" button. This button was also hidden
  //until the player started the game. An event listner is added to it, and this is possibly the most
  //important part of this code, specifically the "this.currentTurn.bind(this)" segment.
  //The big problem with "this" is that its definition is contextual, meaning that the thing it 
  //refers to is constantly changing depending on the context in which its called. When its called here
  //it might refer to the current game object, but when it's called later on within an 
  //addEventListener, "this" will change to be the object that the event listener is being added to.
  //The way to prevent the definition of "this" from changing is by binding it using this.currentTurn.bind(this).

  startGame(){
    this.turnAnnouncement.toggleAttribute("hidden")
    document.querySelector(".end-turn").toggleAttribute("hidden")
    document.querySelector(".end-turn").addEventListener("click", this.currentTurn.bind(this))
    this.currentTurn()
  }

  // 5)The current turn code takes a look at the current state of "playerTurn". If its set to true,
  //then it'll run the playerOneTurn function. If its set to false, it'll run the playerTowTurn function
  currentTurn() {
    if(this.playerTurn){
      this.endGameCheck()
      this.playerOneTurn()
    } else {
      this.endGameCheck()
      this.playerTwoTurn()
    }
  }

// 6) The playerXTurn functions work more or less identically. First they change the innerText of 
//the turn announcement to tell the user whose turn it is, and then they add an on click function
//to every square in grid array that makes it so that the background color of each square chagnes
//when clicked. This should eventually be modified so that it changes the src of the imgs into 
//the desired X/O picture later on.
//Afterwards, it sets the playerTurn to false. Once the user has selected their square, they're
//expected to click on the "end turn" button, which will then run the "currentTurn" function again.
//Since the playerXTurn code changes the player turn, currentTurn should run the opposite player's turn
//code instead

  playerOneTurn(){
    this.turnAnnouncement.innerText = "It is currently player one's turn"
    gridArray.forEach(square => square.addEventListener("click", function() {
      square.style.backgroundColor = "blue"
    }))

    this.playerTurn = false    
  }

  playerTwoTurn(){
    this.turnAnnouncement.innerText = "It is currently player two's turn"
      gridArray.forEach(square => square.addEventListener("click", function() {
      square.style.backgroundColor = "red"
      console.log("Click")
      console.log("Made it to player 2's turn")
    }))
    this.playerTurn = true
  }

  endGameCheck(){
    const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
    ]
// Indexes within the board
//    [0] [1] [2]
//    [3] [4] [5]
//    [6] [7] [8]

  // loop thru each tile to choose a winner
  // let roundOne = false;
 
    for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    if(winCondition[0]){
      // document.querySelector('p').innerText = 'YOU WIN'
      console.log(winningConditions)
      return true
      
    }else{
      // document.querySelector('p').innerText = 'YOU LOOOOOOSE'
      console.log(winningConditions) 
      return false
    }
      
  }
  
  }
  

}

function gameLogic(){
  let currentGame = new Game(true);
  currentGame.startGame()
}


