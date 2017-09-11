const overpassQuery = require('./overpassQuery');
var Way = require('./Way');
const Point = require('./Point');
var Relation = require('./Relation');
const overpassExtractor = require('./overpassExtractor');
var fs = require("fs");

if (process.argv[2]) {

    console.log(process.argv[2]);
    if (process.argv[2].includes("=")) {

          console.log("includes = && vlues exist");
          overpassQuery.generalQuery(process.argv[2])
              .then((overpassTurbo) => {

                    let promises=[];
                    promises.push(overpassExtractor.relationFeatureExtractor(overpassTurbo));
                    promises.push(overpassExtractor.wayFeatureExtractor(overpassTurbo));
                    promises.push(overpassExtractor.pointFeatureExtractor(overpassTurbo));

                    return Promise.all(promises);

              })
              .then((results) => {
                    //for(let item of results.relationMap){
                      //console.log(results[1]);
                      overpassExtractor.setRelated(results[0],results[1]);
                      console.log(results[1][1].getCoordinatesWKt(),results[1][1]);
                      //console.log(results[0][1].getRelatedWith().length);
                    //}
              })
              .catch((err) => {

                    console.log("Errore");
                    console.log(err);
              });



    } else if (process.argv[2]=="-i") {
        /**
        Bootstrap per inserire nell'Onotlogia toti/geo gli individui presi dai json scaricati precedentemente da Overpass-turbo
        **/
        individualInsert.sparqlUpdate("http://localhost:8890/sparql", "https://w3id.org/toti/geo/",  process.argv[3]);

    }
}
