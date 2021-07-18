
var dog,dogImage,dogHappy, database, foodS, foodStock,feed,addFood;
var feedDog,addFood;
var fedTime, lastFed;
var foodObj;


function preload()
{
  dogImage=loadImage("dogImg.png");
  dogHappy=loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1100, 500);

  dog=createSprite(550,380,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed The Dog");
  feed.position(800,80);
  feed.mousePressed(feedDog)

  
  
  addFood=createButton("Add Food");
  addFood.position(900,80);
  addFood.mousePressed(addFoods);
  

  foodObj= new Food();




}

function draw() {  
  background(46, 139, 87);

  
  
  dog.display();
  foodObj.display();

  drawSprites();
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12 + "PM",450,20);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM",450,20);
  }
  else{
    text("Last Feed:"+lastFed+"AM",450,20);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
} 

function feedDog(){
  dog.addImage(dogHappy);
  
  dog.x=dog.x-5;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;

  database.ref('/').update({
    Food:foodS
  })
 
}

 if(foodObj<0){
    dog.addImage(dogImage);

  }

