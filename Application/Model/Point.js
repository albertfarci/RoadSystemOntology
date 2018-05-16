function Point(stringCoordinates,nextPoint) {
   //Variables
   this.stringCoordinates = stringCoordinates;
   this.next=nextPoint;
}

Point.prototype.getCoordinatesWKt=function() {
   return `Point(${this.stringCoordinates})`;
}

Point.prototype.getPoint=function() {
   return `${this.stringCoordinates}`;
}

Point.prototype.getNext=function() {
   return this.next;
}

Point.prototype.addNext=function(coordinates) {
   this.next.push(coordinates);
}

// export the class
module.exports = Point;
