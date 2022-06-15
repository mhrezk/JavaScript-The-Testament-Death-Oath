const canvas = document.querySelector("canvas");
const brush = canvas.getContext("2d");

const characterFilePath = "../../assets/images/animation/characters/";

canvas.width = 1024;
canvas.height = 576;

//background
brush.fillStyle = "aliceblue";
brush.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSource: "../../assets/images/static/backgrounds/forest.png",
  scale: 1,
  numberOfFrames: 1,
});

const shop = new Sprite({
  position: {
    x: 675,
    y: 126,
  },
  imageSource: "../../assets/images/static/backgrounds/shop.png",
  scale: 2.8,
  numberOfFrames: 6,
});

const player = new Fighter({
  id: "ronen_arogreno",
  name: {
    firstName: "Ronen",
    lastName: "Arogreno",
  },
  position: {
    x: 200,
    y: 334,
  },
  velocity: {
    dx: 0,
    dy: 0,
  },
  health: 100,
  damageDealt: 30,
  speed: 4,
  weight: 10,
  width: 74,
  height: 150,
  imageSource: characterFilePath + "ronen_arogreno" + "/Idle.png",
  scale: 2,
  numberOfFrames: 8,
  cropOffset: {
    x: 152,
    y: 94,
  },
  framesRate: 5,
  spriteSheet: {
    idle: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Idle.png",
      numberOfFrames: 8,
    },
    run: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Run.png",
      numberOfFrames: 8,
    },
    jump: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Jump.png",
      numberOfFrames: 2,
    },
    fall: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Fall.png",
      numberOfFrames: 2,
    },
    attack1: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Attack1.png",
      numberOfFrames: 6,
    },
    takeHit: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Take Hit.png",
      numberOfFrames: 4,
    },
    death: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Death.png",
      numberOfFrames: 6,
    },
  },
  spriteSheetMirror: {
    idleMirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Idle_Left.png",
      numberOfFrames: 8,
    },
    runMirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Run_Left.png",
      numberOfFrames: 8,
    },
    jumpMirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Jump_Left.png",
      numberOfFrames: 2,
    },
    fallMirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Fall_Left.png",
      numberOfFrames: 2,
    },
    attack1Mirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Attack1_Left.png",
      numberOfFrames: 6,
    },
    deathMirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Death_Left.png",
      numberOfFrames: 6,
    },
    takeHitMirror: {
      imageSource: characterFilePath + "ronen_arogreno" + "/Take Hit_Left.png",
      numberOfFrames: 4,
    },
  },
  hitBox: {
    offset: {
      x: 63,
      y: 50,
      mirrorX: 76,
    },
    width: 164,
    height: 50,
    colour: "aliceblue",
  },
});

const enemy = new Fighter({
  id: "naenra_ushemitso",
  name: {
    firstName: "Naenra",
    lastName: "Ushemitso",
  },
  position: {
    x: 700,
    y: 334,
  },
  velocity: {
    dx: 0,
    dy: 0,
  },
  health: 75,
  damageDealt: 20,
  speed: 7,
  weight: 12,
  width: 55,
  height: 150,
  imageSource: characterFilePath + "naenra_ushemitso" + "/Idle_Left.png",
  scale: 2,
  numberOfFrames: 4,
  framesRate: 6,
  cropOffset: {
    x: 165,
    y: 107,
  },
  spriteSheet: {
    idle: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Idle.png",
      numberOfFrames: 4,
    },
    run: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Run.png",
      numberOfFrames: 8,
    },
    jump: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Jump.png",
      numberOfFrames: 2,
    },
    fall: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Fall.png",
      numberOfFrames: 2,
    },
    attack1: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Attack1.png",
      numberOfFrames: 4,
    },
    takeHit: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Take Hit.png",
      numberOfFrames: 3,
    },
    death: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Death.png",
      numberOfFrames: 7,
    },
  },
  spriteSheetMirror: {
    idleMirror: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Idle_Left.png",
      numberOfFrames: 4,
    },
    runMirror: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Run_Left.png",
      numberOfFrames: 8,
    },
    jumpMirror: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Jump_Left.png",
      numberOfFrames: 2,
    },
    fallMirror: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Fall_Left.png",
      numberOfFrames: 2,
    },
    attack1Mirror: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Attack1_Left.png",
      numberOfFrames: 4,
    },
    deathMirror: {
      imageSource: characterFilePath + "naenra_ushemitso" + "/Death_Left.png",
      numberOfFrames: 7,
    },
    takeHitMirror: {
      imageSource:
        characterFilePath + "naenra_ushemitso" + "/Take Hit_Left.png",
      numberOfFrames: 3,
    },
  },
  hitBox: {
    offset: {
      x: 50,
      y: 62,
      mirrorX: 63,
    },
    width: 152,
    height: 50,
    colour: "darkred",
  },
});

const keys = {
  a: {
    pressed: false,
  },

  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

function finishMatch() {
  location.reload();
}

player.isFacingRight = true;

decrementTimer();

function animate() {
  window.requestAnimationFrame(animate);
  brush.fillStyle = "aliceblue";
  brush.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();

  //To create background transparency
  //brush.fillStyle = "rgba(255, 255, 255, 0.1)"; //the last value is known as alpha value
  //Alpha value creates transparency and opacity
  //The higher the alpha value, the more prominent the opacity of the selected colour is
  //NOTE: rgba(): red, green, blue, alpha
  //brush.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //player movement
  player.velocity.dx = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.dx = -player.speed;
    player.switchSprites("runMirror");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.dx = player.speed;
    player.switchSprites("run");
  } else {
    if (player.lastKey === "d" || player.isFacingRight) {
      player.switchSprites("idle");
    } else {
      player.switchSprites("idleMirror");
    }
  }

  if (player.velocity.dy < 0) {
    if (player.lastKey === "d" || player.isFacingRight) {
      player.switchSprites("jump");
    } else {
      player.switchSprites("jumpMirror");
    }
  } else if (player.velocity.dy > 0) {
    if (player.lastKey === "d" || player.isFacingRight) {
      player.switchSprites("fall");
    } else {
      player.switchSprites("fallMirror");
    }
  }

  //enemy movement
  enemy.velocity.dx = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.dx = -enemy.speed;
    enemy.switchSprites("runMirror");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.dx = enemy.speed;
    enemy.switchSprites("run");
  } else {
    if (enemy.lastKey === "ArrowRight" || enemy.isFacingRight) {
      enemy.switchSprites("idle");
    } else {
      enemy.switchSprites("idleMirror");
    }
  }

  if (enemy.velocity.dy < 0) {
    if (enemy.lastKey === "ArrowRight" || enemy.isFacingRight) {
      enemy.switchSprites("jump");
    } else {
      enemy.switchSprites("jumpMirror");
    }
  } else if (enemy.velocity.dy > 0) {
    if (enemy.lastKey === "ArrowRight" || enemy.isFacingRight) {
      enemy.switchSprites("fall");
    } else {
      enemy.switchSprites("fallMirror");
    }
  }

  //hitBox collision detection
  if (
    //player hits
    hitBoxCollision({
      player: player,
      enemy: enemy,
    }) &&
    player.isAttacking &&
    player.currentFrame === 4
  ) {
    if (
      (enemy.keyPressed === "ArrowLeft" && enemy.lastKey === "ArrowLeft") ||
      !enemy.isFacingRight
    ) {
      enemy.takeHitMirror({ character: player });
    } else {
      enemy.takeHit({ character: player });
    }

    player.isAttacking = false;
    console.log("Attack!");
    //document.querySelector("#enemyHealth").style.width = enemy.health + "%";
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
    if (enemy.health <= 0) {
      gsap.to("#enemyHealth", {
        width: 0 + "%",
      });
    }
  }

  if (player.isAttacking && player.currentFrame === 4) {
    player.isAttacking = false;
  }

  if (
    //enemy hits
    hitBoxCollision({
      player: enemy,
      enemy: player,
    }) &&
    enemy.isAttacking &&
    enemy.currentFrame === 1
  ) {
    if (
      (player.keyPressed === "a" && player.lastKey === "a") ||
      !player.isFacingRight
    ) {
      player.takeHitMirror({ character: enemy });
    } else {
      player.takeHit({ character: enemy });
    }

    enemy.isAttacking = false;
    console.log("Attack!");
    //document.querySelector("#playerHealth").style.width = player.health + "%";
    gsap.to("#playerHealth", {
      width: player.health + "%",
    });
    if (player.health <= 0) {
      gsap.to("#playerHealth", {
        width: 0 + "%",
      });
    }
  }

  if (enemy.isAttacking && enemy.currentFrame === 1) {
    enemy.isAttacking = false;
  }

  //end game
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player: player, enemy: enemy, timerCounter });
  }
}

animate();

window.addEventListener("keydown", (e) => {
  if (!player.dead) {
    if (!player.dead && enemy.dead) {
      return;
    }
    switch (e.key) {
      case " ":
        if (player.lastKey === "a" || !player.isFacingRight) {
          player.attackMirror();
        }
        player.attack();
        break;
      case "Enter":
        if (enemy.lastKey === "ArrowLeft" || !enemy.isFacingRight) {
          enemy.attackMirror();
        }
        enemy.attack();
        break;
      case "d":
        player.isFacingRight = true;
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        player.isFacingRight = false;
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        if (
          //to prevent double jump or midair jump
          (player.isJumping && keys.w.pressed) ||
          (player.position.y + player.height < canvas.height - 92 &&
            !keys.w.pressed)
        ) {
          return;
        }

        keys.w.pressed = true;
        player.isJumping = true;
        player.velocity.dy = -player.weight;
        break;
    }
  }
  if (!enemy.dead) {
    if (!enemy.dead && player.dead) {
      return;
    }
    switch (e.key) {
      case "ArrowRight":
        enemy.isFacingRight = true;
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        enemy.isFacingRight = false;
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (
          //to prevent double jump or midair jump
          (enemy.isJumping && keys.ArrowUp.pressed) ||
          (enemy.position.y + enemy.height < canvas.height - 92 &&
            !keys.ArrowUp.pressed)
        ) {
          return;
        }
        keys.ArrowUp.pressed = true;
        enemy.isJumping = true;
        enemy.velocity.dy = -enemy.weight;
        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      player.isJumping = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      enemy.isJumping = false;
      break;
  }
});
