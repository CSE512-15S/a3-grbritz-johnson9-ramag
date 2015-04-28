(function () {
  var map_width = 1024;
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

  function countyClickHandler (datum, index) {
    if (! datasetCache['countyDetails']) {
      console.warn("Clicked on county before data loaded");
      return;
    }

    var stateId = datasetCache['countyDetails'][datum.id]['stateId'];
    console.log(stateId, [datum.id]);
    var chart = StateChart(stateId, [datum.id]);
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

  // "Main" fn; starts after all DOM elements have loaded
  $(document).ready(function() {
    var svg = d3.select('#map')
      .append('svg')
      .attr({
        'width' : map_width,
        'height' : map_height
      });
    var path = d3.geo.path();

    // Load map tiles
    d3.json('/datasets/topojson/us.json', function(err, topology) {

      svg.selectAll('path')
         .data(topojson.feature(topology, topology.objects.counties).features, 
          function (datum) {
           return datum.id;
         })
         .enter()
         .append('path')
         .attr('d', path)
         .attr('id', countyId)
         .classed('county', true)
         .on('mouseover', function(datum, index) {
            d3.select(this).classed('hover', true);
            toggleCountyTooltip(this.id, true);
         })
         .on('mouseout', function(datum, index) {
            d3.select(this).classed('hover', false);
            toggleCountyTooltip(this.id, false);
         })
         .on('click', countyClickHandler);
    });

    // Load county reference details
    d3.json('/datasets/reference/county-codes.json', function(err, countyDetails) {
      datasetCache['countyDetails'] = countyDetails;
    });
  
    // Load zip code to county reference details & activate search box
    d3.json('/datasets/reference/zip-codes-to-counties.json', 
      function(err, zipCodesToCounties) {
      var searchBox = new SearchBox(zipCodesToCounties);
      
      datasetCache['zipCodesToCounties'] = zipCodesToCounties;
    });
  });


  function StateChart (stateId, countyIds) {
    
    d3.json('/datasets/topojson/washington.json', function(err, topology) {
      var svg = d3.select('#state')
        .append('svg')
        .attr('width', map_width / 2)
        .attr('height', map_height / 2);
        var path = d3.geo.path();
        
        svg.selectAll('path')
           .data(topojson.feature(topology, topology.objects.washington).features)
           .enter()
           .append('path')
           .attr('d', path);

    });
  }


  function SearchBox (zipCodesToCounties) {
    var self = this;
    self.zipCodesToCounties = zipCodesToCounties;

    self.searchMethodType = "zipcode";


    $('input[name=search-mode-toggle]').on('change', function() {
      var mode = $(this).val();
      self.searchMethodType = mode;
      console.log(mode);
    });


    $(".controls-wrapper").removeClass('hide');
    $(".controls-wrapper input[name=zip-code-filter]").on('input', function() {
      d3.selectAll('.county').classed('selected', false);
     
      var $this = $(this);
      var searchString = $this.val();
      // Lets not have empty string show map as blue
      if (! searchString) return;

      var countyDivs;
      if (self.searchMethodType === "zipcode") {
        var matchingZips = self.zipCodesMatchingSubstring(searchString, Object.keys(self.zipCodesToCounties));
        countyDivs = self.countyDivsMatchingZips(matchingZips, self.zipCodesToCounties);
      }
      else if (self.searchMethodType === "county") {
        countyDivs = self.countyDivsMatchingEntry(searchString);
      }

      
      d3.selectAll(countyDivs).classed('selected', true);
    });

    this.countyDivsMatchingEntry = function(entry) {
      var counties = Object.keys(datasetCache['countyDetails']);
      counties = _.filter(counties, function(countyId) {
        return countyId.indexOf(entry) === 0;
      });
      counties = _.map(counties, function(countyId) {
        return "#cid-" + countyId;
      });
      return $(counties.join(', ')).get();
    }

    this.countyDivsMatchingZips = function(zipCodes, zipCodesToCounties) {
      var counties = {};
      _.each(zipCodes, function(zipCode) {
        _.each(zipCodesToCounties[zipCode], function(county) {
          // Convert countyid into classname
          county = "#cid-" + county;
          if (! counties.hasOwnProperty(county)) {
            counties[county] = true;
          }
        });
      });

      counties = Object.keys(counties);
      return $(counties.join(", ")).get();
    }

    this.zipCodesMatchingSubstring = function(zipSubStr, zipCodes) {
      return _.filter(zipCodes, function(zipCode) {
        zipCode = zipCode + ""; // Massage into string just in case
        return zipCode.indexOf(zipSubStr) === 0;
      });
    }  
  }

})();

