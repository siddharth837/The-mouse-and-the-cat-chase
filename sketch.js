var mouse;
var cat;
var mouseAnimation,catAnimation,bgImage,foodImage;
var score=0;
var cheeseScore=0;

var gameState="SERVE";
var obstacle,food;
var gameOver,gameOverImage;
var restart,restartImage;
var invisibleGround;


function preload(){
mouseAnimation=loadAnimation("Images/rat0.png","Images/rat1.png","Images/rat2.png","Images/rat3.png","Images/rat4.png","Images/rat5.png","Images/rat6.png")
catAnimation=loadAnimation("Images/runningCat-0.png","Images/runningCat-1.png","Images/runningCat-2.png","Images/runningCat-3.png","Images/runningCat-4.png")
bgImage=loadImage("Images/Background.png");
foodImage=loadImage("Images/cheese.png");
cloudImage=loadImage("Images/cloud.png");
grassImage=loadImage("Images/grass.png");
mouseImage=loadImage("Images/rat0.png");
catImage=loadImage("Images/runningCat-0.png");
gameOverImage=loadImage("Images/gameOver.png");
restartImage=loadImage("Images/restart.png");
deadmouseImage=loadImage("Images/deadMouse.png");
playImage=loadImage("Images/play.png");
jumpSound=loadSound("Images/jump.mp3");
winSound=loadSound("Images/win.wav");
hitSound=loadSound("Images/hit.wav");
}
function setup(){
  createCanvas(1500,700);

  mouse=createSprite(468,687,40,40);
  mouse.addAnimation("moving",mouseAnimation);
  //mouse.addImage(deadmouseImage);
  mouse.scale=0.8;
  mouse.setCollider("rectangle",0,0,mouse.width,mouse.height);
  

  cat=createSprite(184,609,20,20);
  cat.addAnimation("moving",catAnimation);
  cat.scale=0.25;

  cheese=createSprite(1165,44,30,30);
  cheese.addImage(foodImage);
  cheese.scale=0.25;

  foodGroup=new Group();
  obstacleGroup=new Group();
  
  ground=createSprite(709,690,1600,20);
  ground.shapeColor="green";
 
  gameOver=createSprite(750,250,40,40);
  gameOver.addImage(gameOverImage);
  gameOver.visible=true;


  deadMouse=createSprite(756,474,30,30);
  deadMouse.addImage(deadmouseImage);
  
  invisibleGround=createSprite(700,700,1600,10);
  invisibleGround.shapeColor="white";

  play=createSprite(734,630,10,410);
  play.shapeColor="red";
  play.addImage(playImage);
  play.scale=0.3;
  
 
  
}

function draw(){
  background(bgImage);
  fill("white");
  text(mouseX+","+mouseY,mouseX,mouseY);
// PLAYSTATE .....

  if(gameState==="SERVE"){
    cat.visible=false;
    mouse.visible=false;
    cheese.visible=false;
    gameOver.visible=false;
    deadMouse.visible=false;
    textSize(50);
    strokeWeight(20);
    fill("brown");
    text("The mouse is being chased by its enemy cat .",100,250)
    text("Help him escape from the cat.",100,350)
    text("Press spacebar key to make the mouse jump .",100,450)
    text("Help him get the cheese and protection from obstacles.",100,550);

    textSize(70);
    fill("black");
    text("WELCOME TO THE MOUSE AND CAT CHASE ",8,100);
    text("GAME",670,187);
    if(mousePressedOver(play)){
      gameState="PLAY";
    }
  }
  if(gameState=="PLAY"){
    textSize(70);
    text(" :- "+cheeseScore,1200,64);
    deadMouse.visible=false;
    mouse.visible=true;
    cat.visible=true
    gameOver.visible=false;
    play.visible=false;
    cheese.visible=true;

    if(keyDown("space")){
      mouse.velocityY=-15;
      jumpSound.play();
    }

    if(foodGroup.isTouching(mouse)){
      foodGroup[0].destroy();
      cheeseScore=cheeseScore+1;
      winSound.play();
    }
    if(obstacleGroup.isTouching(mouse)){
      gameState="END";
      hitSound.play();
    }
    if(obstacleGroup.isTouching(cat)){
      cat.velocityY=-10;
    }

    cat.velocityY=cat.velocityY+0.9;
   mouse.velocityY=mouse.velocityY+0.9;
    
    obstacles();
    foods();
    mouse.collide(ground);
    cat.collide(invisibleGround);
//........
fill("black");
textSize(40);
strokeWeight(80);
  }
else if(gameState==="END"){
  mouse.visible=false;
  cat.visible=false;
  gameOver.visible=true;
  play.visible=false;
  cheese.visible=true;
  textSize(70);
  text(" :- "+cheeseScore,1200,64);
  fill("black");
  textSize(70);
  strokeWeight(30);
  

  text("Mouse dead as he hit the obstacle.",250,400);
  text("Press r to restart the game",350,500);
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
}
  if(keyDown("r")){
    gameState="PLAY";
    reset();
    }
    drawSprites();
  
}

function reset(){
  gameState="PLAY";
  obstacleGroup.destroyEach();
   foodGroup.destroyEach();
   
   cheeseScore=0;
}


function obstacles(){
  if(frameCount%120===0){
    obstacle=createSprite(1459,655,30,50);
    obstacle.shapeColor="brown";
    obstacle.velocityX=-10;
   // obstacle.debug=true;

    obstacleGroup.add(obstacle);
  }
}

function foods(){
  if(frameCount%180===0){
    food=createSprite(1359,452,50,50);
    food.addImage(foodImage);
    food.scale=0.25;
    food.velocityX=-10;
    food.lifetime=300;
    mouse.depth=food.depth+1;

    foodGroup.add(food);
  }
}
