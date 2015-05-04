
function EducationChart(countyData) {
  var width = 700, 
      height = 300
      self = this;

  // Private fns
  function translation(x,y) {
    return 'translate(' + x + ',' + y + ')';
  }
    
  function draw(selector) {
    // Clear old svg
    $(selector).find('svg').remove();
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
    console.log(countyData);

    var malePop = d3.sum(countyData['male']['education'], function(d) { return d.value; });
    var femalePop = d3.sum(countyData['female']['education'], function(d) { return d.value; });
    var totalPopulation = malePop + femalePop;
    
    console.log("hi");
    
    // find the maximum data value on either side
    //  since this will be shared by both of the x-axes
    var maxValue = Math.max(
      d3.max(countyData['male']['education'], function(d) { return d.value; }),
      d3.max(countyData['female']['education'], function(d) { return d.value; })
    );


    var svg = d3.select(selector).append('svg')
      .attr('width', margin.left + width + margin.right)
      .attr('height', margin.top + height + margin.bottom)
      .append('g')
      .attr('class', 'inner-region')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // alert("maxValue = " + maxValue);

    // the xScale goes from 0 to the width of a region
    //  it will be reversed for the left x-axis
    var xScale = d3.scale.linear()
      .domain([0, maxValue])
      .range([0, regionWidth])
      .nice();

    var yScale = d3.scale.ordinal()
      .domain(countyData['male']['education'].map(function(d) { return d.id; }))
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

    console.log(countyData['male']['education']);
    
    // DRAW BARS
    leftBarGroup.selectAll('.bar.left')
      .data(countyData['male']['education'])
      .enter().append('rect')
      .attr('class', 'bar left')
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.id); })
      .attr('width', function(d) { return xScale(d.value); })
      .attr('height', yScale.rangeBand());

    rightBarGroup.selectAll('.bar.right')
      .data(countyData['female']['education'])
      .enter().append('rect')
      .attr('class', 'bar right')
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.id); })
      .attr('width', function(d) { return xScale(d.value); })
      .attr('height', yScale.rangeBand());
  }
  

  draw.width = function(val) {
    if (!arguments.length) return width;
    width = val;
    return draw;
  };

  draw.height = function(val) {
    if (!arguments.length) return height;
    height = val;
    return draw;
  };

  return draw;
}
