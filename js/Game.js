'use strict';

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  createPhrases() {
    return [
      new Phrase('Yippee Ki Yay'),
      new Phrase('Get To The Choppa'),
      new Phrase('Hasta La Vista Baby'),
      new Phrase('A Royale With Cheese'),
      new Phrase('Say Hello To My Little Friend'),
    ];
  }

  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  startGame() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.createPhraseElements();
  }

  handleInteraction(button) {
    const letter = button.innerText;

    button.disabled = true;

    if (this.activePhrase.containsLetter(letter)) {
      this.activePhrase.showMatchedLetter(letter);
      button.classList.add('chosen');

      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      button.classList.add('wrong');
      this.removeLife();
    }
  }

  checkForWin() {
    const totalLetters = this.activePhrase.phrase.replace(/\s/g, '').length; // count letters excluding spaces
    const revealedLetters = document.querySelectorAll('.show').length;
    return totalLetters === revealedLetters;
  }

  removeLife() {
    const lostHeart = document.querySelector('img[src="images/liveHeart.png"]');

    if (lostHeart) {
      lostHeart.src = 'images/lostHeart.png';
      this.missed++;

      if (this.missed === 5) {
        this.gameOver(false);
      }
    }
  }

  gameOver(gameWon) {
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('game-over-message');

    if (gameWon) {
      message.innerText = `You Win!🏆\nYou guessed "${this.activePhrase.phrase}"\nYou know your movies!`;
      overlay.classList.remove('start', 'lose');
      overlay.classList.add('win');
    } else {
      message.innerText = `You Lose!😢\nHint: Phrases are from awesome action movies`;
      overlay.classList.remove('start', 'win');
      overlay.classList.add('lose');
    }

    overlay.style.display = 'block';
  }

  gameReset() {
    this.clearElement(document.querySelector('ul'));
    this.resetKeyboardButtons();
    this.resetHeartImages();
    this.missed = 0;

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.createPhraseElements();
  }

  clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  resetKeyboardButtons() {
    const buttons = document.querySelectorAll('#qwerty button');

    for (const button of buttons) {
      button.classList.remove('chosen', 'wrong');
      button.classList.add('key');
      button.disabled = false;
    }
  }

  resetHeartImages() {
    const hearts = document.querySelectorAll('img[src="images/lostHeart.png"]');
    hearts.forEach((heart) => (heart.src = 'images/liveHeart.png'));
  }
}
