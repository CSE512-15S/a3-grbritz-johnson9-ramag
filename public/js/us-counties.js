(function () {
  var map_width = 960;
  var map_height = 500;

  $(document).ready(function() {
    var svg = d3.select('#map')
      .append('svg')
      .attr({
        'width' : map_width,
        'height' : map_height
      });
    var path = d3.geo.path();

    // d3.json('/datasets/census-maps/us.json', function(err, topology) {

    //   svg.selectAll('path')
    //      .data(topojson.feature(topology, topology.objects.counties).features)
    //      .enter()
    //      .append('path')
    //      .attr('d', path);
    // });

    d3.json('/datasets/census-maps/reference/county-codes.json', function(err, data) {
      console.log("Num County Codes:", Object.keys(data).length);
    });

    d3.json('/datasets/census-maps/reference/zip-codes.json', function(err, zipCodes) {
      var counties = {};

      _.each(zipCodes, function(stateAndCounty, zipCode) {
        // console.log("stateAndCounty", stateAndCounty);
        _.each(stateAndCounty.countyId, function(countyId) {
          // console.log("countyId", countyId);
          if (! counties.hasOwnProperty(countyId)) {
            counties[countyId] = true;
          }
        });
      });

      console.log("Num Counties in Zip-codes: ", Object.keys(counties).length);
    });


    d3.json('/datasets/census-maps/reference/zips-by_county.json', function(err, data) {
      console.log("Num County Codes (zips-by_county):", Object.keys(data).length);

    });
  });
})();

