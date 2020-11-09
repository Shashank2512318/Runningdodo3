var player, playerImage;
var background1, background1Image;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstsacle8, obstacle9;
var play= 1;
var over= 0;
var gameState= play;
var score= 0;

function preload(){
  backgroundImage = loadImage("background2.jpg");
  obstacle1 = loadImage("obstacle 1.png");
  obstacle2 = loadImage("obstacle 2.png");
  obstacle3 = loadImage("obstacle 3.png");
  obstacle4 = loadImage("obstacle 4.png");
  obstacle5 = loadImage("obstacle 5.png");
  obstacle6 = loadImage("obstacle 6.png");
  obstacle7 = loadImage("obstacle 7.png");
  obstacle8 = loadImage("obstacle 8.png");
  obstacle9 = loadImage("obstacle 9.png");
  overImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
  
  jumpSound = loadSound("video-game-vintage-jump-ascend_zkBS6F4_.mp3");
  collideSound = loadSound("8-bit-basic-hit-5_WM.mp3");
  
  player_running = loadAnimation("dodo1.png", "dodo2.png", "dodo3.png", "dodo4.png");
  
}

function setup() {
 createCanvas(700, 600);
  
  
  player =createSprite(100, 530, 10, 10);
  player.addAnimation("running", player_running);
  player.scale= 0.3;
  
  background1 = createSprite(400, 250, 40, 10);
  background1.addImage(backgroundImage);
  background1.scale= 5;
  player.depth= background1.depth+1;
  
  iground = createSprite(100, 580, 130, 20);
  iground.visible= false;
  
  over = createSprite(350, 250, 10, 10);
  over.addImage(overImage);
  
  restart = createSprite(350, 300, 10, 10);
  restart.addImage(restartImage);
  restart.scale=0.4;
  
  obstacleGroup= new Group();
  
}

function draw() {
 background("black");
  player.collide(iground);
  
  if(gameState === play){
    background1.velocityX= -(5 + 1* score/100);
  
  if (background1.x < 0){
      background1.x = background1.width/2;
    }
    
    restart.visible= false;
    
    over.visible= false;
  
  score = score + Math.round(getFrameRate()/60);  
    
  if(keyDown("space") && player.y>= 500) {
    player.velocityY= -8;
    jumpSound.play();
  }
  
  player.velocityY= player.velocityY+0.3;
  
  
  
  spawnobstacle();
    
    if(player.isTouching(obstacleGroup)) {
      gameState= over;
      collideSound.play();
    }
  }else if(gameState === over) {
    obstacleGroup.destroyEach();
    background1.velocityX= 0;
    over.visible= true;
    restart.visible= true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
    
  drawSprites();
  textSize(20)
  text("Score:"+score, 580, 50);
}

function reset() {
  player.y= 530;
  score= 0;
  gameState= play;
}



function spawnobstacle() {
  if(frameCount % 100 === 0){
    obstacle = createSprite(600, 550, 10, 10);
    obstacle.velocityX= background1.velocityX
    obstacleGroup.add(obstacle);
    obstacleGroup.lifetime= 150;
    
    var rand = Math.round(random(1,9));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break;
      case 8: obstacle.addImage(obstacle8);
              break;
      case 9: obstacle.addImage(obstacle9);
              break;     
      default:break;
    }
    
    
  }
}