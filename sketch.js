var shooter, star1,canvas;
var boundry, edges,bullet;
// Declaring some variables...

var x = 30;
var y = 0;
var bulletGroup;
var starGroup;

function preload(){
  shooterImg = loadImage("images/shooter.png");
  starImg = loadImage("images/coin.png");
}
function setup(){
  canvas= createCanvas(windowWidth, windowHeight);

  shooter = createSprite(windowWidth/2,windowHeight-50);
  shooter.addImage("shooter",shooterImg);
  shooter.scale= 0.4;

  bulletGroup = new Group();
  starGroup = new Group();

  // The following sprite will serve as a boundary line between the intruders
// and the destroyer.
boundry = createSprite(0,windowHeight-100, 2*width, 10);
boundry.shapeColor="red";


edges= createEdgeSprites();
console.log(mouseX,mouseY)
}

function draw(){
  background(0);
 // drawSprites();
   // Count of the bullets left.
   strokeWeight(5);
   stroke('red');
 textSize(30);
 fill("yellow");
 text("Bullets left - ", 35, 45);
 text(x, 195, 45);

 text("Score - "+ y, 1095, 45);
 


   // Directional Control for the player-sprite.
 if (keyDown("LEFT_ARROW")) {
  shooter.x = shooter.x - 5;
}
if (keyDown("RIGHT_ARROW")) {
  shooter.x = shooter.x + 5;
}

if(World.frameCount % 60 ===0){
  star1 = createSprite(Math.round(random(10,width-30)),65,10,10);
  star1.addImage(starImg);
  star1.scale = 0.2;
  star1.setVelocity(Math.round(random(-17,20)),7);
  starGroup.add(star1);
}

 
 
// Attack Control for the player-sprite.
if (keyWentDown("space")){
  if (x > 0) {
    
    bullet = createSprite(shooter.x,shooter.y-5,10,30) ;
      bullet.velocityY = -7;
      bullet.shapeColor = 'blue';
      bulletGroup.add(bullet);
      bullet.setCollider("circle",0,0,30);
      bullet.debug = true;
      x--;
  }  
}
   else if(x===0) {
 starGroup.setVelocityEach(0);
 textSize(50);
    text("You Lost! You have exhausted all your ammunition!", 50, 200);
   
  }
 
 
 // Recogntion whether the bullet is touching the enemy.
 for(var i =0; i< starGroup.length;i++)
 {
 if (starGroup.isTouching(bulletGroup)) {
  starGroup.get(i).destroy();
   
   y = y + 1;
  
  
 }
}

 // Declaration of Victory.
 if (y >= 30) {
   starGroup.setVelocityEach(0);
   textSize(50);
   text("You Won! You eliminated the intruders!", 50, 200);
   textSize(15);
   text("As a reward, here is the code for this game - spce1337", 10, 250);
 }
 
 // Easter Egg to give 10000 bullets to plyer.
 if (mouseIsOver(shooter)) {
   if (keyDown("m")) {
     x = 10000;
     textSize(30);
     fill("green");
     text("Master control unlocked! You didn't check the code, did you?", 200, 600, 200, 100);
   }
 }


drawSprites();

starGroup.bounceOff(edges);


starGroup.bounceOff(boundry);




}
