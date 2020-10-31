//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;

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
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(16);
  fill("white");
  text("NOTE:Press UP_ARROW key to feed Drago milk!", 75, 50);
  text("Food remaining:" + foodS, 180, 390);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

