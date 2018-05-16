const overpassQuery = require('./Overpass Modules/overpassQuery');
const arrayUniq = require('array-uniq');
var Way = require('./Model/Way');
const Point = require('./Model/Point');
var Relation = require('./Model/Relation');
const overpassExtractor = require('./Overpass Modules/overpassExtractor');
const individualCreator = require('./VirtuosoConnection/individualCreate');
var fs = require("fs");

if (process.argv[2]) {

    console.log(process.argv[2]);
    if (process.argv[2]=="-graph") {
        console.log("graph create");
        if (process.argv[3].includes("=")) {
            console.log("includes = && vlues exist");

            overpassQuery.generalQuery(process.argv[3])
              .then((overpassTurbo)=>{
                  let promises=[];
                  //promises.push(overpassExtractor.relationFeatureExtractor(overpassTurbo));
                  promises.push(overpassExtractor.wayFeatureExtractor(overpassTurbo));
                  //promises.push(overpassExtractor.pointFeatureExtractor(overpassTurbo));
                  //promises.push(overpassExtractor.pointGraphExtractor(overpassTurbo));
                  return Promise.all(promises);

              })
              .then((results)=>{

                //return individualCreator.setRelated(results[0]);
                               
                let graphWKt = overpassExtractor.getWayGraph(results[0]);

                let pathRelation=new Relation("1path",{});

                for(let segment of overpassExtractor.setPathToWay(graphWKt.path('0-107701896','0-144782902',{ reverse: true }),results[0]) ){
                    console.log(segment);
                    pathRelation.setRelatedWith(segment);
                }
                console.log(pathRelation.getCoordinatesWKt());

              })
              .then((virtuosoItems)=>{

                    console.log("ALBE",virtuosoItems[0].requestOptions.body);
              })
              .catch(()=>{

              });

        }
    }
}
