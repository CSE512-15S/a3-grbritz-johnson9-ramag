(function () {
  var map_width = 960;
  var map_height = 500;

  var datasetCache = {};

  function countyId (datum) {
    var id = datum.properties['GEOID10'] + "";
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
    
      d3.json('/datasets/topojson/wa-counties.json', function(err, json) {
        var svg = d3.select('#map')
          .append('svg')
          .attr('width', map_width)
          .attr('height', map_height);
          var path = d3.geo.path();
          var projection = d3.geo.albers();
          // TODO: Rotate the map so that its aligned with the screen, not on a globe
          projection.scale(5500)
                    .parallels([45.32, 49])
                    .translate([1800,1300])

          path.projection(projection);
          
          svg.selectAll('path')
             .data(topojson.feature(json, json.objects['wa-counties']).features, 
                function (datum) {
                 return datum.properties['GEOID10'];
               })
             .enter()
             .append('path')
             .attr('d', path)
             .attr('fill', 'none')
             .attr('stroke', '#000')
             .attr('id', countyId)
             .classed('county', true)
             .on('mouseover', function(datum, index) {
                d3.select(this).classed('hover', true);
                toggleCountyTooltip(this.id, true);
             })
             .on('mouseout', function(datum, index) {
                d3.select(this).classed('hover', false);
                toggleCountyTooltip(this.id, false);
             });

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