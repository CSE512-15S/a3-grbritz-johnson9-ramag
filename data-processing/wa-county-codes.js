var _ = require('underscore');
var fs = require('fs');

var WA_STATE_ID = "53";

fs.readFile('../public/datasets/reference/county-codes.json', function(err, fileContents) {
  if (err) throw err;
  var waCountyCodes = _.filter(JSON.parse(fileContents), function(countyDetails, countyId) {
    return countyDetails.stateId === WA_STATE_ID;
  });

  fs.writeFile('../public/datasets/reference/wa-county-codes.json', JSON.stringify(waCountyCodes), function(err) {
    if (err) throw err;
  });

});