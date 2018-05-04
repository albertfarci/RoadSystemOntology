var fs = require("fs");
var request = require('request');
var Graph = require('node-dijkstra')
var concat = require('unique-concat');
var Way = require('../Model/Way');
var Point = require('../Model/Point');
var Relation = require('../Model/Relation');
var overpassQuery = require('../Overpass Modules/overpassQuery');


exports.setRelated= function(mapRelationArray,mapWayArray){

  for(let itemWay of mapWayArray){
    for(let itemRelation of mapRelationArray){
        let relations=itemWay.getRel();
        for(let idRelation of relations){
          if(itemRelation.getId()==idRelation){
            itemRelation.setRelatedWith(itemWay);

          }
        }

    }
  }
}

exports.setPathToWay= function(pathFind,mapWayArray){
  let pathRelated=[];
  for(let pathItem of pathFind){

    pathRelated.push(mapWayArray.find((wayItem) => {

        //console.log(wayItem.getId() === pathItem);
        return wayItem.getId() === pathItem;
    }));


  }
  return pathRelated
}

exports.getWayGraph=function(mapWayArray){
  //console.log(mapWayArray);
  let ordered={};
  for (var i = 0; i < mapWayArray.length; i++) {

      let id=mapWayArray[i].getId();

      if(!ordered[id]){
         ordered[id]=mapWayArray[i];
         ordered[id]["hasNext"]=[];
         //ordered[relatedWith[i].getId()]={"hasNext":[]};
      }

      for (var j = 0; j < mapWayArray.length; j++) {
        if(ordered[id].getCoordinates()[1][0]==mapWayArray[j].getCoordinates()[0][0] &&
           ordered[id].getCoordinates()[1][1]==mapWayArray[j].getCoordinates()[0][1] &&
           ordered[id].getId()!=mapWayArray[j].getId()){

              ordered[id]["hasNext"].push(mapWayArray[j].getId());
           }
        if(ordered[id].getCoordinates()[1][0]==mapWayArray[j].getCoordinates()[1][0] &&
           ordered[id].getCoordinates()[1][1]==mapWayArray[j].getCoordinates()[1][1] &&
           ordered[id].getId()!=mapWayArray[j].getId()){

              ordered[id]["hasNext"].push(mapWayArray[j].getId());
           }

        if(ordered[id].getCoordinates()[0][0]==mapWayArray[j].getCoordinates()[1][0] &&
           ordered[id].getCoordinates()[0][1]==mapWayArray[j].getCoordinates()[1][1] &&
           ordered[id].getId()!=mapWayArray[j].getId()){

              ordered[id]["hasNext"].push(mapWayArray[j].getId());
        }
           //ordered[id].getCoordinates()[1][0];
        if(ordered[id].getCoordinates()[0][0]==mapWayArray[j].getCoordinates()[0][0] &&
          ordered[id].getCoordinates()[0][1]==mapWayArray[j].getCoordinates()[0][1] &&
          ordered[id].getId()!=mapWayArray[j].getId()){

              ordered[id]["hasNext"].push(mapWayArray[j].getId());
        }
      }

  }


  let route=new Graph();

  for (var key in ordered){
    for (nextNode of ordered[key].hasNext) {
       if(route["graph"].get(key)){
         route["graph"].get(key).set(`${nextNode}`,"1");
       }else{
         let tmp={};
         tmp[nextNode]=1;
         route.addNode(key, tmp);
       }
    }
  }

  return route;

}

exports.getRelationGraph=function(mapRelationArray,mapWayArray){
     this.setRelated(mapRelationArray,mapWayArray);
     let graphRoad=[]
     for (var i = 0; i < mapRelationArray.length; i++) {
          graphRoad.push(JSON.stringify(mapRelationArray[i].getGraphRelatedWith()));

     }
      let route=new Graph();
      for (var i = 0; i < graphRoad.length; i++) {
          for (var key in JSON.parse(graphRoad[i])) {
            for (nextNode of JSON.parse(graphRoad[i])[key].hasNext) {

               if(route["graph"].get(key)){
                 //console.log("vero",nextNode);
                 route["graph"].get(key).set(`${nextNode}`,"1");
                 //console.log(route["graph"].get(key));
               }else{
                 let tmp={};
                 tmp[nextNode]=1;
                 route.addNode(key, tmp);
               }

            }

          }
      }

     //console.log(route);
     return route;
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

          for (var i = 0; i < jsonContent.features[k].geometry.coordinates.length; i++) {

            if(i+1 < jsonContent.features[k].geometry.coordinates.length){

              let simpleCoordinates=[];
              simpleCoordinates.push(jsonContent.features[k].geometry.coordinates[i]);
              simpleCoordinates.push(jsonContent.features[k].geometry.coordinates[i+1]);
              let identif=`${i}-${jsonContent.features[k].properties.id}`;

              mapWayArray.push(new Way(identif,jsonContent.features[k].geometry.type,simpleCoordinates,jsonContent.features[k].properties.tags,relationArray));

            }

          }

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
            mapPointArray.push(new Point(stringCoordinates));

          }
        }

    }

    return resolve(mapPointArray);
  });
};
