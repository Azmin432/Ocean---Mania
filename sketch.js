var PLAY ;
var END ; 
var gameState = PLAY;

var octopus;
var backgroundImg;
var ground, invisibleGround, groundImage;

var jewelGroup, jewelImage;
var coralgroup,coral, coral1, coral2, coral3;
var score = 0;
var life = 6;

var gameOver, restart;
localStorage["Highest score"] = 0;

function preload(){
    octopusImg = loadImage("octopus.png");
    groundImage = loadImage("ground.jpg");
    getBackgroundImg();

    jewelImage = loadImage("jewel.png");
    coral1 = loadImage("coral.jpg");
    coral2 = loadImage("coral2.png");
    coral3 = loadImage("coral3.jpg");
    gameOverImg = loadImage("download.jpg");
    restartImg = loadImage("download.png");
}
function setup(){
    createCanvas(1200,600);
    octopus = createSprite(60,180,20,20);
    octopus.addImage(octopusImg);
    octopus.scale = 0.8;

    ground = createSprite(0,190,1200,10);
    ground.addImage(groundImage);
    ground.velocityX = -(6+3*score/100);

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(300,140);
    restart.addImage(restartImg);
  
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    gameOver.visible = false;
    restart.visible = false;
    
    jewelGroup = new Group();
    coralGroup = new Group();
    
    score = 0;
}
function draw(){
    if (backgroundImg)
    background(backgroundImg);
    textSize(20);
  fill(255);
  text("Score: "+ score, 500,40);
text("life: "+ life , 500,60);
  drawSprites();
  if (gameState===PLAY){
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && octopus.y >= 139) {
      octopus.velocityY = -12;
    }
  
  octopus.velocityY = octopus.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
      octopus.collide(ground);
    
    spawnJewel();
    spawnCoral();
  
   if(CoralGroup.isTouching(octopus)){
     life = life-1;
        gameState = END;
   } 
    }
    if(jewelGroup.isTouching (octopus)) {
        score = score+1; 
        jewelGroup[0].destroy();
         
      } 
    }
    
    else if (gameState === END ) {
      gameOver.visible = true;
      restart.visible = true;
      octopus.addImage(octopusImg);

      ground.velocityX = 0;
    octopus.velocityY = 0;
    CoralGroup.setVelocityXEach(0);
    jewelGroup.setVelocityXEach(0);

    octopus.changeImage(octopusImg);
    octopus.scale =0.35;

    CoralGroup.setLifetimeEach(-1);
    jewelGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)&& life>0 ){
      reset();
    }
  }
  function spawnJewel() {
    if (frameCount % 60 === 0) {
      var jewel = createSprite(600,120,40,10);
      jewel.y = Math.round(random(80,120));
      jewel.addImage(coinImage);
      jewel.scale = 0.1;
      jewel.velocityX = -3;
      
       
      jewel.lifetime = 200;
      
      
      jewel.depth = mario.depth;
      jewel.depth = mario.depth + 1;
      
      
      jewelGroup.add(jewel);
    }
    function spawnCoral() {
        if(frameCount % 60 === 0) {
          var coral = createSprite(600,165,10,40);    
          //generate random obstacles
          var rand = Math.round(random(1,3));
          switch(rand) {
            case 1: coral.addImage(coral1);
                    break;
            case 2:coral.addImage(coral2);
                    break;
            case 3: coral.addImage(coral3);
                    break;
          }
              
          coral.velocityX = -(6 + 3*score/100);
          
         coral.scale = 0.2;
 coral.lifetime = 300;

CoralGroup.add(coral);
  }
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    CoralGroup.destroyEach();
    jewelGroup.destroyEach();
    
    octopus.changeImage(octopusImg);
    octopus.scale =0.5;

    async function getBackgroundImg(){
        var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        var responseJSON = await response.json();
    
        var datetime = responseJSON.datetime;
        var hour = datetime.slice(11,13);
        
        if(hour>=0600 && hour<=1900){
            bg = "Oceanbgday.jpg"
        }
        else{
            bg = "Oceanbgnight.jpg";
        }
    
        backgroundImg = loadImage(bg);
        console.log(backgroundImg);
    }
}
  }
}