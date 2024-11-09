'use strict';

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
    this.ul = document.querySelector('ul');
    this.letters = [];
    this.matchedLetters = new Set();
    this.createPhraseElements();
  }

  createPhraseElements() {
    const fragment = document.createDocumentFragment();
    const letters = this.phrase.split('');

    for (const letter of letters) {
      const li = document.createElement('li');
      const item = document.createTextNode(letter);

      if (letter === ' ') {
        li.className = 'space';
      } else {
        li.className = `hide letter ${letter}`;
      }

      li.appendChild(item);
      fragment.appendChild(li);

      if (letter !== ' ') {
        this.letters.push({ letter, li });
      }
    }

    this.ul.appendChild(fragment);
  }

  showMatchedLetter(letter) {
    for (const { letter: storedLetter, li } of this.letters) {
      if (storedLetter === letter) {
        li.classList.remove('hide');
        li.classList.add('show');
      }
    }

    this.matchedLetters.add(letter);
  }

  containsLetter(letter) {
    return this.phrase.includes(letter) && !this.matchedLetters.has(letter);
  }
}
