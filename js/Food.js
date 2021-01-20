class Food{
    constructor(){
        this.image=loadImage("images/Milk.png");
        
    }

    getFoodStock(){
        var foodStockRef= database.ref('foodStock');
        foodStockRef.on("value",function(data){
        foodS=data.val();
       
        })
    }

    deductFood(x){
       
        count=foodS+x;
    }

    updateFoodStock(count){
        database.ref('/').update({
            foodStock : count
        })
        
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(count!=0){
            for(var i=0;i<count;i++){
                if(i%10===0){
                    x=80;
                    y+=50;
                }

                imageMode(CENTER);
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}