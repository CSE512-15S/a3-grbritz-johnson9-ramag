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

    d3.json('/datasets/census-maps/us.json', function(err, topology) {

      svg.selectAll('path')
         .data(topojson.feature(topology, topology.objects.counties).features, 
          function (datum) {
           return datum.id;
         })
         .enter()
         .append('path')
         .attr('d', path)
         .attr('class', function(d) { 
          var id = d.id + "";
          while(id.length < 5) {
            id = "0" + id;
          }

          return "cid-" + id;
        })
         .classed('county', true)
         .on('mouseover', function(datum, index) {
            d3.select(this).classed('hover', true);
         })
         .on('mouseout', function(datum, index) {
            d3.select(this).classed('hover', false);
         });
    });
  });

  d3.json('/datasets/census-maps/reference/zip-codes-to-counties.json', 
    function(err, zipCodesToCounties) {
      $(".controls-wrapper").removeClass('hide');



    $(".controls-wrapper input[name=zip-code-filter]").on('input', function() {
      d3.selectAll('.county').classed('selected', false);
      var $this = $(this);
      var zipCode = $this.val();

      var matchingZips = zipCodesMatchingSubstring(zipCode, Object.keys(zipCodesToCounties));

      var countyDivs = countyDivsMatchingZips(matchingZips, zipCodesToCounties);
      // console.log(countyDivs);
      // countyDivs.addClass('selected');
      d3.selectAll(countyDivs).classed('selected', true);
    });
  });

  function countyDivsMatchingZips (zipCodes, zipCodesToCounties) {
    var counties = {};
    _.each(zipCodes, function(zipCode) {
      _.each(zipCodesToCounties[zipCode], function(county) {
        // Convert countyid into classname
        county = ".cid-" + county;
        if (! counties.hasOwnProperty(county)) {
          counties[county] = true;
        }
      });
    });

    counties = Object.keys(counties);
    return $(counties.join(", ")).get();
  }

  function zipCodesMatchingSubstring (zipSubStr, zipCodes) {
    return _.filter(zipCodes, function(zipCode) {
      zipCode = zipCode + ""; // Massage into string just in case
      return zipCode.indexOf(zipSubStr) === 0;
    });
  }
})();

