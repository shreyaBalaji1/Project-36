//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock, foodObj;
var feed, addFood;
var fedTime, lastFed;
var readState;
var bedroomImg, gardenImg, washroomImg;
var currentTime;
var gameState;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomImg = loadImage("virtual pet images/Bed Room.png");
  gardenImg = loadImage("virtual pet images/Garden.png");
  bedroomImg = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 305, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.18;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new food();

  feed = createButton("Feed the dog");
  feed.position(130,15);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(230,15);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value", function(data) {
    gameState = data.val();
  });
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("Last Fed: " + lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed==0) {
    text("Last Fed: 12 AM", 350, 30);
  }
  else{
    text("Last Fed: " + lastFed + " AM", 350, 30);
  }

  drawSprites();
  //add styles here
  textSize(16);
  fill("white");
  //text("NOTE:Press UP_ARROW key to feed Drago milk!", 75, 50);
  text("Food remaining:" + foodS, 180, 390);

  if(gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    //dog.remove();
  }
  else {
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)) {
    updateState("Playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed+2)) {
    updateState("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4)) {
    updateState("Bathing");
    foodObj.washroom();
  }
  else{
    updateState("Hungry");
    foodObj.display();
  }
}

function readStock(data) {
  //foodS is where the info is being stored and foodStock is refering to the database
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.getFoodStock(foodObj.deduct());
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function updateState(state) {
  database.ref('/').update({
    gameState: state
  });
}

