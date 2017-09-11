var queryOverpass = require('query-overpass');


/**
Utilizza il modulo npm query-overpass.
Parametri:
Effettua la chiamata al servizio query-overpass;
  la query contienete il riferimento all' area, in questo caso la Sardegna;
  chiede nodi, ways e relations per i tags passati come paramento.
Return:
  - Promise
**/
exports.generalQuery = (tags) => {

  return new Promise((resolve,reject) => {

    queryOverpass(`[out:json];area(3606847723)->.searchArea;(way[${tags}](area.searchArea);relation[${tags}](area.searchArea););(._;>;);out;>;`, function(error, geojson){
      if(error){
        return reject(error);
      }
      return resolve(geojson);
    });

  });

};

/**
Utilizza il modulo npm query-overpass.
Parametri: serie di id (nodi o ways o relations)
Effettua la chiamata al servizio query-overpass;
  la query contienete un elenco di ids. Ogni id ha un tag e una coppia chiave valore con le map feature richieste..
Return:
  - Promise
**/
exports.IdQuery = (id) => {
  return new Promise((resolve,reject) => {
        queryOverpass(`[out:json];(${id});out;>;out skel qt;`, function(error, geojson){
          return resolve(geojson);
        });

  });
};
