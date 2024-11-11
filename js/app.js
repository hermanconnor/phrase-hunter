'use strict';

function main() {
  let game;

  const startBtn = document.getElementById('btn__reset');
  const onscreenKeyboard = document.getElementById('qwerty');
  const keyboardButtons = document.querySelectorAll('#qwerty button');
  const overlay = document.getElementById('overlay');

  startBtn.addEventListener('click', () => {
    if (game) {
      game.gameReset();
    }

    game = new Game();
    game.startGame();
    game.gameReset();
    overlay.style.display = 'none';
  });

  onscreenKeyboard.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement && !e.target.disabled) {
      game.handleInteraction(e.target);
    }
  });

  document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toLowerCase();

    for (const button of keyboardButtons) {
      if (button.textContent.toLowerCase() === keyPressed && !button.disabled) {
        game.handleInteraction(button);
        break;
      }
    }
  });
}

main();
