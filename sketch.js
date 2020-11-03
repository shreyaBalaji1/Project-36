//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock, foodObj;
var feed, addFood;
var fedTime, lastFed;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
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

