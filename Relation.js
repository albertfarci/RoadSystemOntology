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
    stringCoordinates=stringCoordinates+this.relatedWith[i].getCoordinates();
    if(i+1<this.relatedWith.length){
      stringCoordinates=stringCoordinates+",";
    }
  }
  return 'MULTILINESTRING('+stringCoordinates+')';
}

Relation.prototype.setRelated= function(id){
  this.relatedWith.push(id);
}


// export the class
module.exports = Relation;
