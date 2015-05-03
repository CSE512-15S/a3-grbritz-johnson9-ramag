var _ = require('underscore');
var fs = require('fs');

var WA_STATE_ID = "53";

fs.readFile('../public/datasets/reference/county-codes.json', function(err, fileContents) {
  if (err) throw err;
  var waCountyCodes = {};

   _.each(JSON.parse(fileContents), function(countyDetails, countyId) {
    if (countyDetails.stateId === WA_STATE_ID) {
      waCountyCodes[countyId] = countyDetails;
    }
  });

  fs.writeFile('../public/datasets/reference/wa-county-codes.json', JSON.stringify(waCountyCodes), function(err) {
    if (err) throw err;
  });

});