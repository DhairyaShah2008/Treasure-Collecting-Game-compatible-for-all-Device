var path,boy,cash,diamonds,jwellery,sword;
var pathImg,pathImg1,pathImg2
var boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordG;
var Restart,RestartImg
var Coin
var OverSound
var Dhairya,DhairyaImg
var Loading,LoadingImg

//Game States

var PLAY=1;
var END=0;
var gameState=1;
var PreStart

function preload(){
  pathImg = loadImage("Road.png");
  pathImg1 = loadImage("Road.png");
  pathImg2= loadImage("Road.png");
  boyImg= loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg=loadAnimation("gameOver.png");
  RestartImg=loadImage("Restart.png")
  Coin=loadSound("Coin.Mp3")
  OverSound=loadSound("GameOverSound.Mp3")
  DhairyaImg=loadImage("Dhairya.PNG")
  LoadingImg=loadImage("Loading.gif")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height-10,width,125);
path.addImage(pathImg);
path.velocityY = 10;
  path.scale=(width/height)+(width/height)
  

   


//creating boy running
boy= createSprite(width,height,20,20);
boy.addAnimation("SahilRunning",boyImg);

boy.scale=(width/height)/20;
boy.debug=true
boy.setCollider('circle',0,0,500)
  
gameOver=createSprite(width/2,(height/2)-300,30,30)
gameOver.scale=(width/height)
Restart=createSprite(width/2,height/2,20,20)
  Restart.scale=width/5
Restart.visible=false

      Dhairya=createSprite(width/2,height/2.5)
  Dhairya.addImage(DhairyaImg)
  Dhairya.scale=(width/height)+0.8
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordG=new Group();
  gameState=PreStart

       Loading=createSprite(width/2,height/6)
    Loading.addImage(LoadingImg)
  

}


function draw(){
 background('white')
  
  
 
  //gameOver.visible=false
  
if(gameState===PreStart){
  Loading.visible=true
  
  
  Dhairya.lifetime=100
  Dhairya.visible=true

   
  if((touches.length>0)||(keyWentDown("s"))){
    gameState=PLAY
    Loading.visible=false

  

}
}
  
  if(gameState===PLAY){
    Dhairya.visible=false
    Loading.visible=false
    
    
      textSize(100);
  fill('bLUE');
  text("Treasure: "+treasureCollection,330,100);
    OverSound.stop()
    swordG.setVelocityYEach(10)
    cashG.setVelocityYEach(10)
    diamondsG.setVelocityYEach(10)
    jwelleryG.setVelocityYEach(10)

    gameOver.visible=false
    
      if(path.y > height ){
    path.y = height/2;
  }
    
 
  boy.x = World.mouseX;
    boy.y = World.mouseY;
    
    
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background

    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    
    if (cashG.isTouching(boy)) {
      
   cashG.destroyEach()
      treasureCollection=treasureCollection+50;
      Coin.play()
    
    }
    else if (diamondsG.isTouching(boy)) {
           
   diamondsG.destroyEach()
treasureCollection=treasureCollection+50;
Coin.play()
    }
    else if(jwelleryG.isTouching(boy)) {
      
   jwelleryG.destroyEach()
treasureCollection=treasureCollection+50;
     Coin.play()
      
    }
    else if(swordG.isTouching(boy)) {
      swordG.destroyEach()
      OverSound.play()
          sword.velocityY=0  
   sword.rotate=0
      sword.rotationSpeed=0
gameState=END
    diamondsG.setVelocityYEach(0)
      diamondsG.setLifetimeEach(-1)
cashG.setVelocityYEach(0)
      cashG.setLifetimeEach(-1)
jwelleryG.setVelocityYEach(0)
      jwelleryG.setLifetimeEach(-1)
swordG.setVelocityYEach(0)
      swordG.setLifetimeEach(-1)
      
    
    }
    
  }
  
  console.log(frameCount)
        
          if(gameState===END){  
            

            
Restart.visible=true
Restart.addImage(RestartImg)
Restart.scale=1
  
            
            
gameOver.visible=true
            
            gameOver.addAnimation("gameOver",endImg);
  treasureCollection=0;
            
            path.velocityY=0
          }
    if(keyWentDown("r")||touches.length>0){
      boy.changeAnimation("SahilRunning",boyImg)
gameOver.visible=false
      Restart.visible=false

      
      
  gameState=PLAY
              if(path.y > height ){
    path.y = height/2;
  }
        }
    
    

    console.log(gameState)

  
    

  
    

  
  drawSprites();
    

  



}


function createCash() {
  if (World.frameCount % 10 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=(width/height)/10;
    
  cash.velocityY = 10;
  cash.lifetime = 250;
  cashG.add(cash);
    cash.debug=true

  }
}

function createDiamonds() {
  if (World.frameCount % 20 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=(width/height)/25;
  diamonds.velocityY = 10;
    
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
    diamonds.debug=true

}
}

function createJwellery() {
  if (World.frameCount % 30 == 0) {
  var jwellery = createSprite(Math.round(random(100, width-100),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=(width/height)/10
  jwellery.velocityY = 10;
    
  jwellery.lifetime = 250;
  jwelleryG.add(jwellery);
    jwellery.debug=true

  }
  
}

function createSword(){
  if (World.frameCount % 15 == 0) {
  sword = createSprite(Math.round(random(100,windowWidth-100),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=(width/height)/4;
  sword.velocityY =10;
  sword.lifetime = 250;
    
    sword.shapeColor="blue";

  swordG.add(sword);
    sword.debug=true
    sword.rotate=100
sword.rotationSpeed = 10;

  }
  
  
}