function Way(identif,typeOfWay, coordinatesOfPoint, tagsOfWay,relationsArray,geoWkt) {

   //Variables
   this.type = typeOfWay;
   this.coordinates = coordinatesOfPoint;
   this.tags=tagsOfWay;
   this.id=identif;
   this.rel=relationsArray;
   this.wkt=geoWkt;

}

Way.prototype.getWkt= function(){
   return this.wkt;
}

Way.prototype.getRel= function(){
   return this.rel;
}

Way.prototype.getId= function(){
   return this.id;
}

Way.prototype.getType= function(){
  return this.type;
}

Way.prototype.getTags= function(){
  return this.tags;
}

Way.prototype.getCoordinates= function(){
  return this.coordinates;
}


Way.prototype.getCoordinatesWKt= function(){
   var stringCoordinates=this.type+"(";
   for (let i=0;i<this.coordinates.length;i++){
     if(this.type=="Polygon"){
       for (let k=0;k<this.coordinates[i].length;k++){
         for (let j=0;j<this.coordinates[i][k].length;j++){
           stringCoordinates=stringCoordinates+ ` ${this.coordinates[i][k][j]} `;
         }
       }
     }
     else{
       for (let j=0;j<this.coordinates[i].length;j++){
         stringCoordinates=stringCoordinates+ ` ${this.coordinates[i][j]} `;

       }

     }
     console.log(i,this.coordinates.length);
     if(i+1<this.coordinates.length){
       stringCoordinates=stringCoordinates+",";
     }

   }
   stringCoordinates=stringCoordinates+")";
   return stringCoordinates;
}

Way.prototype.getCoordinatesString= function(){
   var stringCoordinates="(";
   for (let i=0;i<this.coordinates.length;i++){
     for (let j=0;j<this.coordinates[i].length;j++){
       stringCoordinates=stringCoordinates+ ` ${this.coordinates[i][j]} `;
     }

     if(i+1<this.coordinates.length){
       stringCoordinates=stringCoordinates+",";
     }

   }
   stringCoordinates=stringCoordinates+")";
   return stringCoordinates;
}

// export the class
module.exports = Way;
