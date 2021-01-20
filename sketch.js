var dog,happyDog,database,foodStock,foodS,lastFed,fedTime,count=0;
var readGameState=null;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  dogHappyImage=loadImage("images/dogImg1.png");
  bedRoomImage=loadImage("virtual pet images/Bed Room.png");
  washRoomImage=loadImage("virtual pet images/Wash Room.png");
  gardenImage=loadImage("virtual pet images/Garden.png");
  lazyDog=loadImage("virtual pet images/Lazy.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog=createSprite(450,300);
  dog.addImage(dogImage);
  dog.scale=0.1;

  feedDog=createButton("Feed the Dog");
  feedDog.position(450,95);
 
  
  addFood=createButton("Add Food");
  addFood.position(550,95);
  
  food = new Food();
  foodS=0;
}


function draw() {  
  background(0);

  currentTime=hour();
  
  //Reading gameState from database
  gameStateRef=database.ref('gameState');
  gameStateRef.on("value",function(data){
    readGameState = data.val();
  })
  console.log(readGameState);
  if(readGameState!=="hungry"){
    addFood.hide();
    feedDog.hide();
    //dog.remove();
    console.log("dog is not hungry");
  }
  else{
    addFood.show();
    feedDog.show();
    //dog.addImage(dogImage);
  }
  
  //Reading lastFed from database
  food.getFoodStock();
  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  
  if(currentTime===lastFed+1){
    garden();
  }
  else if(currentTime===lastFed+2){
    bedRoom();
  }
  else if(currentTime -lastFed >2  && currentTime -lastFed <4){
    washRoom();
  }
  else{
    gameState="hungry";
    database.ref('/').update({
      gameState : gameState
    })
    food.display();
  }

  feedDog.mousePressed(function(){
    dog.addImage(dogHappyImage);
    food.deductFood(-1);
    database.ref('/').update({
      fedTime : currentTime
    })
  });

  addFood.mousePressed(function(){
    food.deductFood(1);
    dog.addImage(dogImage);
  });

  fill(255,255,254);
  textSize(14);
  if(lastFed>=12){
    text("Last fed time : " + lastFed%12 + "PM" ,350,30 );
  }
  else if(lastFed==0){
    text("Last fed time : 12 AM" ,350,30 );
  }
  else{
    text("Last fed time : " + lastFed + "AM" ,350,30 );
  }
  food.display();
  food.updateFoodStock(count);
  drawSprites();
}

function washRoom(){
  dog.remove();
  gameState="bathing";
    database.ref('/').update({
      gameState : gameState
    })
  imageMode(CENTER);
  image(washRoomImage,250,250,500,500);
}

function bedRoom(){
  gameState="sleeping";
  dog.remove();
    database.ref('/').update({
      gameState : gameState
  })
  imageMode(CENTER);
  image(bedRoomImage,250,250,500,500);
}

function garden(){
  dog.remove(); 
  gameState="playing";
    database.ref('/').update({
      gameState : gameState
    })
    imageMode(CENTER);
    image(gardenImage,250,250,500,500);
}