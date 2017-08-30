var fs = require("fs");
var request = require('request');

var Way = require('./Way');
var Point = require('./Point');
var Relation = require('./Relation');
var overpassQuery = require('./overpassQuery');
var Animal = require("./Animal.js");


exports.setRelated= function(mapRelationArray,mapWayArray){

  for(let itemWay of mapWayArray){
    for(let itemRelation of mapRelationArray){
        let relations=itemWay.getRel();
        for(let idRelation of relations)
        if(itemRelation.getId()==idRelation){
          itemRelation.setRelated(itemWay);
        }
    }
  }

  //console.log(mapWayArray.length);

}

/**
Estrae dal json le map features,
  inserendo gli oggetti trovati in un array di supporto.
Return:
  -Array di oggetti JSON
**/
exports.relationFeatureExtractor = (jsonContent)=>{
  return new Promise((resolve,reject) => {

      let indexMapFeatureArray=[];
      let mapFeatureArray=[];
      for(let k=0;k<jsonContent.features.length;k++) {
          for(let i=0;i<jsonContent.features[k].properties.relations.length;i++) {
            if(indexMapFeatureArray.indexOf(jsonContent.features[k].properties.relations[i].rel)<0){
               indexMapFeatureArray.push(jsonContent.features[k].properties.relations[i].rel);
               mapFeatureArray.push(new Relation(jsonContent.features[k].properties.relations[i].rel,jsonContent.features[k].properties.relations[i].reltags));
            }
          }
      }

      return resolve(mapFeatureArray);

    });
};

/**
Estrae dal json le map features,
  inserendo gli oggetti trovati in un array di supporto.
Return:
  -Array di oggetti JSON
**/
exports.wayFeatureExtractor = (jsonContent)=>{
  return new Promise((resolve,reject) => {
    let mapWayArray=[];

    for(let k=0;k<jsonContent.features.length;k++) {

        if(jsonContent.features[k].properties.type=="way"){
          let relationArray=[];
          for(let i=0;i<jsonContent.features[k].properties.relations.length;i++) {
              relationArray.push(jsonContent.features[k].properties.relations[i].rel);
          }
          mapWayArray.push(new Way(jsonContent.features[k].properties.id,jsonContent.features[k].geometry.type,jsonContent.features[k].geometry.coordinates,jsonContent.features[k].properties.tags,relationArray));
        }
    }

    return resolve(mapWayArray);

  });
};

/**
Estrae dal json le map features,
  inserendo gli oggetti trovati in un array di supporto.
Return:
  -Array di oggetti JSON
**/
exports.pointFeatureExtractor = (jsonContent)=>{
  return new Promise((resolve,reject) => {
    let mapPointArray=[];
    for(let k=0;k<jsonContent.features.length;k++) {
        if(jsonContent.features[k].properties.type=="way"){
          for (let i=0;i<jsonContent.features[k].geometry.coordinates.length;i++){
            let stringCoordinates='';
            for (let j=0;j<jsonContent.features[k].geometry.coordinates[i].length;j++){
              stringCoordinates=stringCoordinates+ ` ${jsonContent.features[k].geometry.coordinates[i][j]} `;
            }

            mapPointArray.push(new Point(stringCoordinates))
          }
        }

    }

    return resolve(mapPointArray);
  });
};
