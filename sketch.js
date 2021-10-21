var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"





function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();




}

function draw() {
  background(200);
  
 if(gameState === "play"){

  if(tower.y > 400){
    tower.y = 300
  }

  if(keyDown("space")){

    ghost.velocityY = -10;

  }

  ghost.velocityY = ghost.velocityY + 0.7

if(keyDown("right_arrow")){
  ghost.x = ghost.x + 2;

}

if(keyDown("left_arrow")){
  ghost.x = ghost.x - 2;

}

spawnDoors();

if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;

}

if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
  gameState = "end";
  ghost.destroy();
  tower.destroy();
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  invisibleBlockGroup.destroyEach();


}


 }


if(gameState === "end"){
  textSize(40);
  fill("red")
  text("Game Over",230,230);




}


  

    drawSprites();
}

function spawnDoors(){
  
  if(frameCount%250===0){
    var door = createSprite(200,-50);
   door.addImage(doorImg);

    var climber = createSprite(200,10);
  climber.addImage(climberImg);

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.x = Math.round(random(200,400));
   climber.x = door.x;
   invisibleBlock.x = door.x;

   doorsGroup.add(door);
   invisibleBlockGroup.add(invisibleBlock);
   climbersGroup.add(climber);

   ghost.depth = door.depth;
   ghost.depth = ghost.depth + 1;
     
  }

}








