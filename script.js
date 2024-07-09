'use strict';

// let rollDiceBtn = document.querySelector('.btn.btn--roll');

const player2 = document.querySelector('.player--1');
const player1 = document.querySelector('.player--0');
const scoreP1 = document.querySelector('#score--0');
//this can be also written like this const score1=document.getElementById('score--1');
const scoreP2 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
let activePlayer, scores, playing, currentScore;
const init = function () {
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  diceEl.classList.add('hidden');
  currentScoreP2.textContent = 0;
  currentScoreP1.textContent = 0;

  // document.querySelector('#score--0').textContent = 0;
  // document.querySelector('#score--1').textContent = 0;
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();
//lets set elemets to 0
scoreP1.textContent = 0;
scoreP2.textContent = 0;
//lets hide the dice first
diceEl.classList.add('hidden');
// let activePlayer = 0;
// const scores = [0, 0];
// let playing = true;
// let currentScore = 0;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  //toggle method will add the class if it is there if it is not there it will simply remove it if it is t player 0 it will remove that class and move to player 1 and viice versa
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}
btnRoll.addEventListener('click', function () {
  if (playing) {
    //first is to gnerate  RANDOM NUMBER
    const number = Math.trunc(Math.random() * 6) + 1;
    //second is to show the dice
    diceEl.classList.remove('hidden');
    //here we will chnge the image  of the dice using src proprty
    diceEl.src = `dice-${number}.png`;
    //third is to check if rolled dice is 1 if it is then switch the player
    if (number !== 1) {
      currentScore = currentScore + number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (number === 1) {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add score to the activePlayer score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score is greater the 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
  //finish the game
});

btnNew.addEventListener('click', init);
