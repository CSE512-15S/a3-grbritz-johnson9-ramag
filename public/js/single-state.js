(function () {
  var map_width = 960;
  var map_height = 500;

  var datasetCache = {};

  function countyId (datum) {
    var id = datum.id + "";
    // Make sure that all counties have leading 0's
    while(id.length < 5) {
      id = "0" + id;
    }
    return "cid-" + id;
  }

  function toggleCountyTooltip (countyId, showToolTip) {
    var referenceId = countyId.split('-')[1];
    // For now, fail silently when data is not loaded
    if (! datasetCache['countyDetails']) return;
    

    var boundingBox = d3.select('#' + countyId).node().getBBox();
    tooltipPosition = {
      'left' : (boundingBox.x + (boundingBox.width / 2)) + "px",
      'top' : (boundingBox.y + (boundingBox.height / 2)) + "px"
    }

    var details = datasetCache['countyDetails'][referenceId];

    if (showToolTip) {
      $(".county-tooltip").css(tooltipPosition)
                          .text(details.name)
                          .css('visibility', 'visible');
    }
    else {
      $(".county-tooltip").css('visibility', 'hidden')
                          .text("");
    }
  }

  function StateChart () {
    
      d3.json('/datasets/geojson/washington.json', function(err, geojson) {
        var svg = d3.select('#map')
          .append('svg')
          .attr('width', map_width)
          .attr('height', map_height);
          var path = d3.geo.path();
          
          console.log(geojson);
          
          svg.selectAll('path')
             .data(geojson.features)
             .enter()
             .append('path')
             .attr('d', path)
             .attr('fill', 'none')
             .attr('stroke', '#000');

      });
    }

  // "Main" fn; starts after all DOM elements have loaded
  $(document).ready(function() {
    var chart = StateChart();

    // Load county reference details
    d3.json('/datasets/reference/county-codes.json', function(err, countyDetails) {
      datasetCache['countyDetails'] = countyDetails;
    });
  });

})();