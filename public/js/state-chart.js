function StateChart (datasetCache) {
  var width = 480,
      height = 500,
      mapData = null,
      self = this;

  self.datasetCache = datasetCache;

  // Private functions
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
    if (! self.datasetCache['countyCodes']) return;
    

    var boundingBox = d3.select('#' + countyId).node().getBBox();
    tooltipPosition = {
      'left' : (boundingBox.x + (boundingBox.width / 2)) + "px",
      'top' : (boundingBox.y + (boundingBox.height / 2)) + "px"
    }

    var details = self.datasetCache['countyCodes'][referenceId];

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
  // Load topojson
  d3.json('/datasets/topojson/wa-counties.json', function(err, json) {
    if (err) {
      console.error("Could not load topojson for county map: ", err);
      return;
    }
    
    self.mapData = json;
  });

  // "Constructor"
  function draw(selector) {
    if (!self.mapData) {
      setTimeout(draw.bind(self, selector), 25);
      return;
    }

    // Remove loading text
    d3.select(selector)
      .classed('loading', false);

    var svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
      var path = d3.geo.path();

      var projection = d3.geo.mercator()
                         .scale(3300)
                         .translate([7200, 3250]);

      path.projection(projection);
      svg.selectAll('path')
         .data(topojson.feature(self.mapData, self.mapData.objects['wa-counties']).features, 
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
  }

  draw.width = function(val) {
    if (!arguments.length) return width;
    width = val;
    return draw.bind(self);
  };

  draw.height = function(val) {
    if (!arguments.length) return height;
    height = val;
    return draw.bind(self);
  };

  return draw;
}
