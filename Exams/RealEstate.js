
function validateBool(val)
{
    if(val === true || val === false)
{
   return true;
}else{
        return false;
    }

}

var estate =(function(){
    var Estate ={
        init:function(name,area,location,isFurnitured){
            this.name = name;
            this.area = area;
            this.location = location;
            this.isFurnitured = isFurnitured;
            return this;
        },
        get name(){
            return this._name;
        },
        set name(val){
            if(val.trim()===''){
                throw  new Error();
            }
            this._name = val;
        },
        get area(){
            return this._area;
        },
        set area(val){
          if(val<1 || val>10000)
          {
              throw  new Error();
          }
            this._area = val;
        },
        get isFurnitured(){
            return this._isFurnitured;
        },
        set isFurnitured(val){
            if(validateBool(val))
            {
                this._isFurnitured = val;
            }
            else{
                throw  new Error();
            }
        }
    }
    return Estate;
}());

var buildingEstate = (function(parent){

    var BuildingEstate =Object.create(parent);

    Object.defineProperty(BuildingEstate,'init',{
        value:function(name,area, location,isFurnitured,rooms,hasElevator){
            parent.init.call(this,name,area, location,isFurnitured);
            this.rooms = rooms;
            this.hasElevator = hasElevator;
            return this;
        }
    });
    Object.defineProperty(BuildingEstate,'rooms',{

        get:function(){
            return this._rooms;
        },
        set:function(val){
            if(val<0 || val>100)
            {
                throw  new Error();
            }else{
                this._rooms = val;
            }
        }
    });
    Object.defineProperty(BuildingEstate,'hasElevator',{
        get:function(){
            return this._hasElevator;
        },
        set:function(val){
            if(validateBool(val)){
                this._hasElevator = val;
            }else
            {
                throw  new Error();
            }
        }
    });
    return BuildingEstate;

}(estate));

var apartment = (function(parent){
    var apartment = Object.create(parent);
    return apartment;

}(buildingEstate));

var office = (function(parent){
    var ofice = Object.create(parent);
    return ofice;
}(buildingEstate));

var house=(function(parent){
    var house = Object.create(parent);

    Object.defineProperty(house,'init',{
        value:function(name,area,location,isFurnitured,floors){
            parent.init.call(this,name,area,location,isFurnitured);
            this.floors = floors;
        }
    });
    Object.defineProperty(house,'floors',{
        get:function(){
            return this._floors;
        },
        set:function(val){
            if(val<1||val>10){
                throw  new Error();
            }else{
                this._floors = val;
            }
        }
    });
return house;
}(estate));

var garage = (function(parent){
    var garage = Object.create(parent);

    Object.defineProperty(garage,'init',{
        value:function(name,area,location,isFurnitured,width,height){
            parent.init.call(this,name,area,location,isFurnitured);
            this.widht = width;
            this.height = height;
            return this;
        }
    });

    Object.defineProperty(garage,'width',{
        get:function(){
            return this._width;
        },
        set:function(val){
            if(val<1 || val>500)
            {
                throw  new Error();
            }else{
                this._width = val;
            }
        }
    })
    Object.defineProperty(garage,'height',{
        get:function(){
            return this._height;
        },
        set:function(val){
            if(val<1 || val>500)
            {
                throw  new Error();
            }else{
                this._height = val;
            }
        }
    });

    return garage;
}(estate));

var offer = (function(){
   var offer = {
       init:function(estate,price){
           this._estate = estate;
           this.price = price;
       },
       set price(val){
           if(price<1)
           {
               throw  new  Error();
           }else{
               this._price = price;
           }
       },
       get price(){
           return this._price;
       }
   }
    return offer;
}());

var rentOffer = (function(parent){
    var rentOffer = Object.create(parent);
    return rentOffer;
}(offer));

var saleOffer = (function(parent){
    var saleOffer = Object.create(parent);
}(offer));



