function Way(identif,typeOfWay, coordinatesOfPoint, tagsOfWay,relationsArray) {

   //Variables
   this.type = typeOfWay;
   this.coordinates = coordinatesOfPoint;
   this.tags=tagsOfWay;
   this.id=identif;
   this.rel=relationsArray;

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

Way.prototype.getCoordinatesWKt= function(){
   var stringCoordinates=this.type+"(";
   for (let i=0;i<this.coordinates.length;i++){
     if(this.type=="Polygon"){
       for (let k=0;k<this.coordinates[i].length;k++){
         for (let j=0;j<this.coordinates[i][k].length;j++){
           stringCoordinates=stringCoordinates+ ` ${this.coordinates[i][k][j]} `;
         }
         if(k+1<this.coordinates[i].length){
           stringCoordinates=stringCoordinates+",";
         }
       }
     }
     else{
       for (let j=0;j<this.coordinates[i].length;j++){
         stringCoordinates=stringCoordinates+ ` ${this.coordinates[i][j]} `;

       }
       if(i+1<this.coordinates[i].length){
         stringCoordinates=stringCoordinates+",";
       }
     }

   }
   stringCoordinates=stringCoordinates+")";
   return stringCoordinates;
}

Way.prototype.getCoordinates= function(){
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
