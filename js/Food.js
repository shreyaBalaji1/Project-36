class food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;

        /*this.body = Bodies.rectangle(x, y, width, height);
        this.width = width;
        this.height = height;
        */
        this.image = this.image = loadImage("images/milk.png");
       //World.add(world, this.body);
    }

    display() {
      var x = 80, y = 100;

      imageMode(CENTER);
      image(this.image, 720, 220, 70, 70);

      if(this.foodStock != 0) {
        for(var i = 0; i<this.foodStock; i++) {
          if(i%10 == 0) {
            x = 80;
            y = y+50;
          }
          image(this.image, x, y, 50, 50);
          x = x+30;
        }
      }
    }

    //read food from database
  getFoodStock(){
      return this.foodStock;
  }

  //writing food into database
  updateFoodStock(food){
      this.foodStock = food;
  }

  deduct() {
    if(this.foodStock>0)
      this.foodStock--;
  }

  bedroom() {
    background(bedroomImg, 550, 500);
  }

  garden() {
    background(gardenImg, 550, 500);
  }

  washroom() {
    background(washroomImg, 550, 500);
  }
}
