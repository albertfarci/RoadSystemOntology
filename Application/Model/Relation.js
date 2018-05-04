function Relation(identif, tagsOfRelation) {
   //Variables
   this.id=identif;
   this.tags=tagsOfRelation;
   this.relatedWith=[];

}

Relation.prototype.getId= function(){
  return this.id;
}

Relation.prototype.getTags= function(){
  return this.tags;
}

Relation.prototype.getRelatedWith= function(){
  return this.relatedWith;
}

Relation.prototype.getCoordinatesWKt= function(){
  var stringCoordinates='';
  for (let i=0;i<this.relatedWith.length;i++){
    stringCoordinates=stringCoordinates+this.relatedWith[i].getCoordinatesString();
    if(i+1<this.relatedWith.length){
      stringCoordinates=stringCoordinates+",";
    }
  }
  return 'MULTILINESTRING('+stringCoordinates+')';
}

Relation.prototype.setRelatedWith= function(id){
  this.relatedWith.push(id);
}

Relation.prototype.getGraphRelatedWith= function(){

  let ordered={};

  for (var i = 0; i < this.relatedWith.length; i++) {

      if(!ordered[this.relatedWith[i].id]){
         ordered[this.relatedWith[i].id]=this.relatedWith[i];
         ordered[this.relatedWith[i].id]["hasNext"]=[];
         //ordered[this.relatedWith[i].id]={"hasNext":[]};
      }

      for (var j = 0; j < this.relatedWith.length; j++) {
        if(ordered[this.relatedWith[i].id].coordinates[1][0]==this.relatedWith[j].coordinates[0][0] &&
           ordered[this.relatedWith[i].id].coordinates[1][1]==this.relatedWith[j].coordinates[0][1] &&
           ordered[this.relatedWith[i].id].id!=this.relatedWith[j].id){
              ordered[this.relatedWith[i].id]["hasNext"].push(this.relatedWith[j].id);
           }

      }

  }

  return ordered;

}


// export the class
module.exports = Relation;
