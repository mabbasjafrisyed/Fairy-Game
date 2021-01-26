var starImg, fairyImg, bgImg;
var star, fairy, fairyVoice;
var starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;

function preload()
{
   //preload the images here
  starImg = loadImage("images/star.png");
  fairyImg = loadAnimation("images/fairy1.png", "images/fairy2.png");
  bgImg = loadImage("images/starnight.png");
  fairyVoice = loadSound("sound/JoyMusic.mp3");
}

function setup() {
  createCanvas(800, 750);
  
  engine = Engine.create();
  world = engine.world;

  fairy = createSprite(130,520);
  fairy.addAnimation("fairyFlying", fairyImg);
  fairy.scale = 0.25;

  star = createSprite(650,30);
  star.addImage("star", starImg);
  star.scale = 0.2;

  var star_options = {
    isStatic : true,
    frictionAir : 0.5,
    density : 0.5 
  }
  starBody = Bodies.circle(650, 30, 5,star_options);
  World.add(world,starBody);

  Engine.run(engine);

}


function draw() {
//  background("black");
  background(bgImg);
  Engine.update(engine);
  fairy.velocityX = 0;

  if(keyDown(RIGHT_ARROW)){
    fairy.velocityX = 5;
  }

  if(keyDown(LEFT_ARROW)){
    fairy.velocityX = -5;
  }

  star.x = starBody.position.x;
  star.y = starBody.position.y;

  
  if(starBody.position.y>470){
    Matter.Body.setStatic(starBody,true);
  }
  
  drawSprites();
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    Matter.Body.setStatic(starBody,false);
  }
}