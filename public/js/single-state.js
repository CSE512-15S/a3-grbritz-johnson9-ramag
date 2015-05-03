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

  function createPopulationPyramid (countyId) {
    var width = 800, 
    height = 300;
    
    var margin = {
      top: 20,
      right: 10,
      bottom: 70,
      left: 30,
      middle: 28
    };

    var regionWidth = (width/2) - margin.middle;

    var pointA = regionWidth,
      pointB = width - regionWidth;

    d3.json('/datasets/reference/wa-education-data-simple.json', function(err, json){
      var countyData = getCountyData(countyId, json);
      if(countyData) {
        // the id exists
      } 

      var sumPop = function(data){
        var sum = 0;
        $.each(data, function(key, val){
          sum += val;
        });
        return sum;
      };

      var malePop = sumPop(countyData['male']['population']);
      var femalePop = sumPop(countyData['female']['population']);
      var totalPopulation = malePop + femalePop;
      
      console.log(totalPopulation);
      percentage = function(d) { return d / totalPopulation; };
      maxVal = function(d) {
        var max = -1; // population is always positive
        $.each(d, function(key, val) {
          if(val > max){
            max = val;
          }
        });
        return max;
      }
      var svg = d3.select('#pyramid').append('svg')
        .attr('width', margin.left + width + margin.right)
        .attr('height', margin.top + height + margin.bottom)
        .append('g')
        .attr('class', 'inner-region')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // find the maximum data value on either side
      // since this will be shared by both of the x-axes
      var maxValue = Math.max(
        maxVal(countyData['male']['population']),
        maxVal(countyData['female']['population'])
      );
      alert(maxValue);

      // the xScale goes from 0 to the width of a region
      //  it will be reversed for the left x-axis
      var xScale = d3.scale.linear()
        .domain([0, maxValue])
        .range([0, regionWidth])
        .nice();

      var yScale = d3.scale.ordinal()
        .domain(Object.keys(countyData['male']['population']))
        .rangeRoundBands([height,0], 0.1);

      var yAxisLeft = d3.svg.axis()
        .scale(yScale)
        .orient('right')
        .tickSize(4,0)
        .tickPadding(margin.middle - 4);

      var yAxisRight = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickSize(4,0)
        .tickFormat('');

      var xAxisRight = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickFormat(d3.format(''));

      var xAxisLeft = d3.svg.axis()
        // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
        .scale(xScale.copy().range([pointA, 0]))
        .orient('bottom')
        .tickFormat(d3.format(''));

      // MAKE GROUPS FOR EACH SIDE OF CHART
      // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
      var leftBarGroup = svg.append('g')
        .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
      var rightBarGroup = svg.append('g')
        .attr('transform', translation(pointB, 0));

      // DRAW AXES
      svg.append('g')
        .attr('class', 'axis y left')
        .attr('transform', translation(pointA, 0))
        .call(yAxisLeft)
        .selectAll('text')
        .style('text-anchor', 'middle');

      svg.append('g')
        .attr('class', 'axis y right')
        .attr('transform', translation(pointB, 0))
        .call(yAxisRight);

      svg.append('g')
        .attr('class', 'axis x left')
        .attr('transform', translation(0, height))
        .call(xAxisLeft)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-65)";
        });

      svg.append('g')
        .attr('class', 'axis x right')
        .attr('transform', translation(pointB, height))
        .call(xAxisRight).selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-65)";
        });

        console.log(countyData['male']['population']);
      // DRAW BARS
      leftBarGroup.selectAll('.bar.left')
        .data(countyData['male']['population'])
        .enter().append('rect')
        .attr('class', 'bar left')
        .attr('x', 0)
        .attr('y', function(d) { return yScale(Object.keys(countyData['male']['population'])); })
        .attr('width', function(d) { return xScale(percentage(Object.values(countyData['male']['population']))); })
        .attr('height', yScale.rangeBand());
    });
  }
  
  function translation(x,y) {
    return 'translate(' + x + ',' + y + ')';
  }

  function getCountyData (countyId, json) {
    console.log(json);
    for (var i = 0; i < json.length; i++) {
      if("" + json[i]['countyId'] === countyId){
        return json[i];
      }
    }
    return false;
  }

  function StateChart () {
      d3.json('/datasets/topojson/wa-counties.json', function(err, json) {
        var svg = d3.select('#map')
          .append('svg')
          .attr('width', map_width)
          .attr('height', map_height);
          var path = d3.geo.path();

          var projection = d3.geo.mercator()
                             .scale(3300)
                             .translate([7200, 3250]);

          // TODO: Rotate the map so that its aligned with the screen, not on a globe
          // projection.scale(5500)
          //           // .parallels([45.32, 49])
          //           .translate([1800,1300])

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
          })
          .on('click', function(datum, index) {
            // show div
            // pass in county id
            var referenceId = this.id.split('-')[1];
            console.log(referenceId);
            createPopulationPyramid(referenceId);
            // $('#pyramid').remove('hidden');

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

  // TODO:
  // function DataChart()

})();