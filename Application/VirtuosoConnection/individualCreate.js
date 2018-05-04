const {Client, Node, Text, Data, Triple} = require('virtuoso-sparql-client'); 

exports.setRelated= (arrayItems) => {

  return new Promise((resolve,reject) => {

        const SaveClient = new Client('http://localhost:8890/sparql');

        SaveClient.setOptions( 
          "application/json",
          {"tutr": "http://w3id.org/tutr/"},
          "http://w3id.org/tutr"
        );


        for(let item of arrayItems){
            
            if(item.tags.name){
                SaveClient.getLocalStore().add(
                  new Triple(
                    `tutr:${item.id}`,
                    "rdfs:label",
                    new Text(`${item.tags.name}`, "en"),
                    Triple.ADD
                  )
                );
                
            }
                SaveClient.getLocalStore().add(
                  new Triple(
                    `tutr:${item.id}`,
                    "tutr:hasPoint",            
                    new Data(`Point(${item.coordinates[0][0]} ${item.coordinates[0][1]})`, "ogcgs:wktLiteral"),
                    Triple.ADD
                  )
                );
                
                SaveClient.getLocalStore().add(
                  new Triple(
                    `tutr:${item.id}`,
                    "tutr:hasPoint",            
                    new Data(`Point(${item.coordinates[0][0]} ${item.coordinates[0][1]})`, "ogcgs:wktLiteral"),
                    Triple.ADD
                  )
                );
                

        }

        SaveClient.store(true)
        .then((result)=>{
          return resolve(result);
        })
        .catch((err) => {
          return reject(err);
        });

  });
 
}
