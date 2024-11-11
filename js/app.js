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
    if (e.target instanceof HTMLButtonElement && !e.target.disabled && game) {
      game.handleInteraction(e.target);
    }
  });

  document.addEventListener('keydown', (e) => {
    // Ensure game is initialized and overlay is hidden
    if (!game || overlay.style.display !== 'none') {
      return; // Don't handle the key press if game isn't started or overlay is visible
    }

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
