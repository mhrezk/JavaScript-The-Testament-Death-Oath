class Sprite {
  constructor({
    position,
    imageSource,
    scale,
    numberOfFrames,
    cropOffset = {
      x: 0,
      y: 0,
    },
  }) {
    this.position = position;

    this.image = new Image();
    this.image.src = imageSource;

    this.scale = scale;
    this.numberOfFrames = numberOfFrames;
    this.cropOffset = cropOffset;

    this.height = 150;
    this.width = 50;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.framesRate = 5;
  }

  draw() {
    brush.drawImage(
      this.image,

      this.currentFrame * (this.image.width / this.numberOfFrames),
      0,
      this.image.width / this.numberOfFrames,
      this.image.height,

      this.position.x - this.cropOffset.x,
      this.position.y - this.cropOffset.y,
      (this.image.width / this.numberOfFrames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.framesRate === 0) {
      if (this.currentFrame < this.numberOfFrames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    id,
    name,
    position,
    velocity,
    health,
    damageDealt,
    speed,
    weight,
    width,
    height,
    imageSource,
    scale,
    numberOfFrames,
    framesRate,
    cropOffset,
    spriteSheet,
    spriteSheetMirror,
    hitBox = {
      offset: { x: 0, y: 0, mirrorX: 0 },
      width: { undefined },
      height: { undefined },
      colour: { undefined },
    },
  }) {
    super({
      position,
      imageSource,
      scale,
      numberOfFrames,
      cropOffset,
    });
    this.id = id;
    this.name = name;
    this.velocity = velocity;
    this.health = health;
    this.damageDealt = damageDealt;
    this.speed = speed;
    this.weight = weight;
    this.width = width;
    this.height = height;
    this.framesRate = framesRate;
    this.spriteSheet = spriteSheet;
    this.spriteSheetMirror = spriteSheetMirror;

    for (const sprites in this.spriteSheet) {
      spriteSheet[sprites].image = new Image();
      spriteSheet[sprites].image.src = spriteSheet[sprites].imageSource;
    }

    for (const sprites in this.spriteSheetMirror) {
      spriteSheetMirror[sprites].image = new Image();
      spriteSheetMirror[sprites].image.src =
        spriteSheetMirror[sprites].imageSource;
    }

    this.currentFrame = 0;
    this.elapsedFrames = 0;

    this.isJumping = false;
    this.dead = false;
    this.fullHealth = true;

    this.isAttacking;
    this.isFacingRight;
    this.lastKey;

    //hitbox
    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: hitBox.offset,
      width: hitBox.width,
      height: hitBox.height,
      colour: hitBox.colour,
    };
  }

  update() {
    this.draw();
    if (!this.dead) {
      this.animateFrames();
    }

    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y + this.hitBox.offset.y;

    //Attacks with hitboxes

    //brush.fillStyle = this.hitBox.colour;
    // if (this.isFacingRight) {
    //   brush.fillRect(
    //     this.hitBox.position.x,
    //     this.hitBox.position.y,
    //     this.hitBox.width,
    //     this.hitBox.height
    //   );
    // } else {
    //   brush.fillRect(
    //     this.hitBox.position.x -
    //       this.hitBox.width -
    //       this.width +
    //       this.hitBox.offset.mirrorX,
    //     this.hitBox.position.y,
    //     this.hitBox.width,
    //     this.hitBox.height
    //   );
    // }

    this.position.x += this.velocity.dx;
    this.position.y += this.velocity.dy;

    //border collision detection
    if (this.position.x <= 0) {
      this.position.x = 0;
    } else if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
    }

    //gravity collision detection
    if (
      this.position.y + this.height + this.velocity.dy >=
      canvas.height - 92
    ) {
      this.velocity.dy = 0;
    } else {
      this.velocity.dy += gravity;
    }
  }

  attack() {
    this.switchSprites("attack1");
    this.isAttacking = true;
    // setTimeout(() => {
    //   this.isAttacking = false;
    // }, 100);
  }

  takeHit({ character }) {
    this.fullHealth = false;
    this.health -= character.damageDealt;
    if (this.health <= 0) {
      this.switchSprites("death");
    } else {
      this.switchSprites("takeHit");
    }
  }

  takeHitMirror({ character }) {
    this.fullHealth = false;
    this.health -= character.damageDealt;
    if (this.health <= 0) {
      this.switchSprites("deathMirror");
    } else {
      this.switchSprites("takeHitMirror");
    }
  }

  attackMirror() {
    this.switchSprites("attack1Mirror");
    this.isAttacking = true;
    // setTimeout(() => {
    //   this.isAttacking = false;
    // }, 100);
  }

  switchSprites(spriteSheet) {
    //Overriding all other animations in favour of death animation
    if (
      this.image === this.spriteSheet.death.image ||
      this.image === this.spriteSheetMirror.deathMirror.image
    ) {
      if (
        this.currentFrame === this.spriteSheet.death.numberOfFrames - 1 ||
        this.currentFrame ===
          this.spriteSheetMirror.deathMirror.numberOfFrames - 1
      ) {
        this.dead = true;
      }
      return;
    }

    //Overriding all other animations in favour of attack animation
    if (
      (this.image === this.spriteSheet.attack1.image &&
        this.currentFrame < this.spriteSheet.attack1.numberOfFrames - 1) ||
      (this.image === this.spriteSheetMirror.attack1Mirror.image &&
        this.currentFrame <
          this.spriteSheetMirror.attack1Mirror.numberOfFrames - 1)
    ) {
      return;
    }

    //Overriding all other animations in favour of take hit animation
    if (
      (this.image === this.spriteSheet.takeHit.image &&
        this.currentFrame < this.spriteSheet.takeHit.numberOfFrames - 1) ||
      (this.image === this.spriteSheetMirror.takeHitMirror.image &&
        this.currentFrame <
          this.spriteSheetMirror.takeHitMirror.numberOfFrames - 1)
    ) {
      return;
    }

    switch (spriteSheet) {
      case "idle":
        if (this.image !== this.spriteSheet.idle.image) {
          this.image = this.spriteSheet.idle.image;
          this.numberOfFrames = this.spriteSheet.idle.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "run":
        if (this.image !== this.spriteSheet.run.image) {
          this.image = this.spriteSheet.run.image;
          this.numberOfFrames = this.spriteSheet.run.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        if (this.image !== this.spriteSheet.jump.image) {
          this.image = this.spriteSheet.jump.image;
          this.numberOfFrames = this.spriteSheet.jump.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "fall":
        if (this.image !== this.spriteSheet.fall.image) {
          this.image = this.spriteSheet.fall.image;
          this.numberOfFrames = this.spriteSheet.fall.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.spriteSheet.attack1.image) {
          this.image = this.spriteSheet.attack1.image;
          this.numberOfFrames = this.spriteSheet.attack1.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.spriteSheet.takeHit.image) {
          this.image = this.spriteSheet.takeHit.image;
          this.numberOfFrames = this.spriteSheet.takeHit.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "death":
        if (this.image !== this.spriteSheet.death.image) {
          this.image = this.spriteSheet.death.image;
          this.numberOfFrames = this.spriteSheet.death.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "idleMirror":
        if (this.image !== this.spriteSheetMirror.idleMirror.image) {
          this.image = this.spriteSheetMirror.idleMirror.image;
          this.numberOfFrames =
            this.spriteSheetMirror.idleMirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "runMirror":
        if (this.image !== this.spriteSheetMirror.runMirror.image) {
          this.image = this.spriteSheetMirror.runMirror.image;
          this.numberOfFrames = this.spriteSheetMirror.runMirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "jumpMirror":
        if (this.image !== this.spriteSheetMirror.jumpMirror.image) {
          this.image = this.spriteSheetMirror.jumpMirror.image;
          this.numberOfFrames =
            this.spriteSheetMirror.jumpMirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "fallMirror":
        if (this.image !== this.spriteSheetMirror.fallMirror.image) {
          this.image = this.spriteSheetMirror.fallMirror.image;
          this.numberOfFrames =
            this.spriteSheetMirror.fallMirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "attack1Mirror":
        if (this.image !== this.spriteSheetMirror.attack1Mirror.image) {
          this.image = this.spriteSheetMirror.attack1Mirror.image;
          this.numberOfFrames =
            this.spriteSheetMirror.attack1Mirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "deathMirror":
        if (this.image !== this.spriteSheetMirror.deathMirror.image) {
          this.image = this.spriteSheetMirror.deathMirror.image;
          this.numberOfFrames =
            this.spriteSheetMirror.deathMirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
      case "takeHitMirror":
        if (this.image !== this.spriteSheetMirror.takeHitMirror.image) {
          this.image = this.spriteSheetMirror.takeHitMirror.image;
          this.numberOfFrames =
            this.spriteSheetMirror.takeHitMirror.numberOfFrames;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
