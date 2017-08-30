function Point(stringCoordinates) {
   //Variables
   this.stringCoordinates = stringCoordinates;

}

Point.prototype.getCoordinatesWKt=function() {
   return `Point(${this.stringCoordinates})`;
}

Point.prototype.getPoint=function() {
   return `${this.stringCoordinates}`;
}


// export the class
module.exports = Point;
