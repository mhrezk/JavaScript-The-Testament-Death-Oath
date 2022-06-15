function hitBoxCollision({ player, enemy }) {
  return (
    (player.hitBox.position.x + player.hitBox.width >= enemy.position.x &&
      player.hitBox.position.x + player.hitBox.width <=
        enemy.position.x + enemy.width &&
      player.hitBox.position.y + player.hitBox.height >= enemy.position.y &&
      player.hitBox.position.y <= enemy.position.y + enemy.height) ||
    (player.hitBox.position.x -
      player.hitBox.width -
      player.width +
      player.hitBox.offset.mirrorX >=
      enemy.position.x &&
      player.hitBox.position.x -
        player.hitBox.width -
        player.width +
        player.hitBox.offset.mirrorX <=
        enemy.position.x + enemy.width &&
      player.hitBox.position.y + player.hitBox.height >= enemy.position.y &&
      player.hitBox.position.y <= enemy.position.y + enemy.height)
  );
}

function determineWinner({ player, enemy, timerCounter }) {
  clearTimeout(timerCounter);
  if (player.fullHealth && enemy.fullHealth) {
    document.querySelector("#result").innerHTML = "DRAW";
    document.getElementById("finishMatch").style.visibility = "visible";
  } else {
    if (player.health === enemy.health) {
      document.querySelector("#result").innerHTML = "DRAW";
      document.getElementById("finishMatch").style.visibility = "visible";
    } else if (player.health > enemy.health) {
      document.querySelector(
        "#result"
      ).innerHTML = `${player.name.firstName.toUpperCase()} WINS`;
      document.getElementById("finishMatch").style.visibility = "visible";
    } else if (enemy.health > player.health) {
      document.querySelector(
        "#result"
      ).innerHTML = `${enemy.name.firstName.toUpperCase()} WINS`;
      document.getElementById("finishMatch").style.visibility = "visible";
    }
  }
}

let timer = 60;
let timerCounter;
function decrementTimer() {
  if (timer > 0) {
    timerCounter = setTimeout(decrementTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerCounter });
    return;
  }
}
