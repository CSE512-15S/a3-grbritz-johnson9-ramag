var _ = require('underscore');
var fs = require('fs');

fs.readFile('./public/datasets/reference/zips-by_county.json', function(err, fileContents) {
  if (err) throw Error(err);
  var countiesToZips = JSON.parse(fileContents);
  writeZipsToFile(zipsToCounties(countiesToZips));
});

// fs.readFile('./public/datasets/census-maps/reference/missingCountyToZipcodes.json', function(err, fileContents) {
//     if (err) throw Error(err);
//     var countiesToZips = JSON.parse(fileContents);
//     var transformed = {};
//     _.each(countiesToZips, function(obj) {
//       transformed[obj.countyId] = obj.zipCodes;
//     });
//     console.log(transformed);
// });


function writeZipsToFile(zips) {
  fs.writeFile('./public/datasets/reference/zip-codes-to-counties.json', 
    JSON.stringify(zips),
    function(err) {
      if (err) throw Error(err);
    });
}

function existsZipWithMultCounties(zipsToCounties) {
  return _.filter(zipsToCounties, function(counties) {
    return counties.length > 1;
  }).length > 0;
}

// Takes mapping from county code to zip codes within that county
// Returns mapping from zip code to counties that zip code is in
function zipsToCounties(countiesToZips) {
  var zipsToCounties = {};
  _.each(countiesToZips, function(zips, county) {
    _.each(zips, function(zip) {
      // !important - object keys in JS must be non-numeric
      zip = zip + ""; 
      county = county + "";
      if (! zipsToCounties.hasOwnProperty(zip)) {
        zipsToCounties[zip] = [];

      }
      
      zipsToCounties[zip].push(county);
    });
  });
  return zipsToCounties;
}