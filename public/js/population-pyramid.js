function createPopulationPyramid (countyId, json) {
  var width = 700, 
  height = 300;
  
  var margin = {
    top: 20,
    right: 10,
    bottom: 40,
    left: 10
  };

  margin.middle = 28;
  var regionWidth = (width/2) - margin.middle;

  var pointA = regionWidth,
    pointB = width - regionWidth;

  var exampleData = [
    {group: '0-9', male: 10, female: 12},
    {group: '10-19', male: 14, female: 15},
    {group: '20-29', male: 15, female: 18},
    {group: '30-39', male: 18, female: 18},
    {group: '40-49', male: 21, female: 22},
    {group: '50-59', male: 19, female: 24},
    {group: '60-69', male: 15, female: 14},
    {group: '70-79', male: 8, female: 10},
    {group: '80-89', male: 4, female: 5},
    {group: '90-99', male: 2, female: 3},
    {group: '100-109', male: 1, female: 1},
  ];

  var totalPopulation = d3.sum(exampleData, function(d) { return d.male + d.female; }),
  percentage = function(d) { return d / totalPopulation; };


  var svg = d3.select('#pyramid').append('svg')
    .attr('width', margin.left + width + margin.right)
    .attr('height', margin.top + height + margin.bottom)
    .append('g')
    .attr('class', 'inner-region')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // find the maximum data value on either side
  // since this will be shared by both of the x-axes
  var maxValue = Math.max(
    d3.max(exampleData, function(d) { return percentage(d.male); }),
    d3.max(exampleData, function(d) { return percentage(d.female); })
  );
  
  // the xScale goes from 0 to the width of a region
  //  it will be reversed for the left x-axis
  var xScale = d3.scale.linear()
    .domain([0, maxValue])
    .range([0, regionWidth])
    .nice();

  var xScaleLeft = d3.scale.linear()
    .domain([0, maxValue])
    .range([regionWidth, 0]);

  var xScaleRight = d3.scale.linear()
    .domain([0, maxValue])
    .range([0, regionWidth]);

  var yScale = d3.scale.ordinal()
    .domain(exampleData.map(function(d) { return d.group; }))
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
    .tickFormat(d3.format('%'));

  var xAxisLeft = d3.svg.axis()
    // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
    .scale(xScale.copy().range([pointA, 0]))
    .orient('bottom')
    .tickFormat(d3.format('%'));

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
    .call(xAxisLeft);

  svg.append('g')
    .attr('class', 'axis x right')
    .attr('transform', translation(pointB, height))
    .call(xAxisRight);
}

function translation(x,y) {
  return 'translate(' + x + ',' + y + ')';
}