var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsb1, obsb2, obsb3
var obst1, obst2
var obstops
var obsbots
var gameOver, gmimg
var restart, rimg
const PLAY = 1, END = 0
var gameState = PLAY
var score = 0

function preload() {
  bgImg = loadImage("assets/bg.png")
  jump = loadSound("assets/jump.mp3")
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obsb1 = loadImage("assets/obsBottom1.png")
  obsb2 = loadImage("assets/obsBottom2.png")
  obsb3 = loadImage("assets/obsBottom3.png")
  obst1 = loadImage("assets/obsTop1.png")
  obst2 = loadImage("assets/obsTop2.png")
  rimg = loadImage("assets/restart.png")
  gmimg = loadImage("assets/gameOver.png")
  die = loadSound("assets/die.mp3")
}

function setup() {

  createCanvas(windowWidth - 175, windowHeight - 50)
  bg = createSprite(width / 2, height / 2, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1

  obsbots = new Group()
  obstops = new Group()

  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;

  gameOver = createSprite(width / 2, height / 2 - 100, 1, 1)
  gameOver.addImage(gmimg)
  gameOver.visible = false

  restart = createSprite(width / 2, height / 2 + 50, 1, 1)
  restart.addImage(rimg)
  restart.visible = false

}

function draw() {

  background("black");

  if (gameState == PLAY) {

    if (keyDown("space")) {
      balloon.velocityY = -5;
      jump.play()
    }

    spawnTops()
    spawnBots()

    balloon.velocityY = balloon.velocityY + 0.5;

    if (balloon.isTouching(obsbots) || balloon.isTouching(obstops)) {
      die.play()
      gameState = END
    }

    if (balloon.y > height) {
      gameState = END
    }

    score += Math.round(frameRate() / 60)

  }

  if (gameState == END) {

    balloon.velocityY = 0

    reset()

    if (mousePressedOver(restart)) {
      restartGame()
    }
  }

  drawSprites();

  textSize(20)
  text("score: " + score, 10, 20)

}

function spawnTops() {
  if (frameCount % 60 == 0) {
    var obstop = createSprite(width, random(50, 180))
    obstop.velocityX = -7
    obstop.scale = 0.1775
    var rantop = Math.round(random(1, 2))
    switch (rantop) {
      case 1: obstop.addImage(obst1)

        break;

      case 2: obstop.addImage(obst2)

        break;

      default:
        break;
    }
    obstop.lifetime = 200
    obstops.add(obstop)
  }

}

function spawnBots() {
  if (frameCount % 75 == 0) {
    var obsbot = createSprite(width, 480)
    obsbot.velocityX = -7
    obsbot.scale = 0.1
    var ranbot = Math.round(random(1, 3))
    switch (ranbot) {
      case 1: obsbot.addImage(obsb1)
        obsbot.scale = 0.15
        obsbot.y = 440

        break;

      case 2: obsbot.addImage(obsb2)

        break;

      case 3: obsbot.addImage(obsb3)
        obsbot.scale = 0.15
        obsbot.y = 440

        break;

      default:
        break;
    }
    obsbot.lifetime = 200
    obsbots.add(obsbot)
  }
}

function reset() {
  obstops.destroyEach()
  obsbots.destroyEach()

  gameOver.visible = true
  restart.visible = true
}

function restartGame() {
  gameState = PLAY

  gameOver.visible = false
  restart.visible = false

  balloon.x = 100
  balloon.y = 200

  score = 0
}