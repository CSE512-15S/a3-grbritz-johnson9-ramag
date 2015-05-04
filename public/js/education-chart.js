
function EducationChart(countyData, gender) {
  var genderData;
  if(gender === 0) {
    genderData = countyData['total']['education'];
  } else if(gender === 1){
    genderData = countyData['female']['education']
  } else if(gender === 2){
    genderData = countyData['male']['education'];
  } else {
    // ??
    console.error("EducationChart - unknown gender code: ", gender);
  }
  var margin = {top: 10, right: 10, bottom: 10, left: 10};
  var width = 300 - margin.left - margin.right, 
      height = 300 - margin.top - margin.bottom,
      self = this;

  var radius = Math.min(width, height) / 1.75;
  var donutWidth = 25;
  var color = d3.scale.category10(); // TODO should this be a ordinal scale? can't figure out how to do it


  // Private fns
  function translation(x,y) {
    return 'translate(' + x + ',' + y + ')';
  }
    
  function draw(selector) {
    // Clear old svg
    $(selector).find('svg').remove();
    var svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', translation(width/2, height/2));

    svg.append("g").attr("class", "labels");
    
    var arc = d3.svg.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.layout.pie()
      .value(function(d) { return d.value; })
      .sort(null);

    var path = svg.selectAll('path')
      .data(pie(genderData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) { 
        return color(d.data.id);
      });

      drawLabels(svg);
  }
  
  function drawLabels (svg) { // currently the legend is in an awkward place, TODO make better
      var legendRectSize = 18;
      var legendSpacing = 4;
     
      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + legendSpacing;
          var offset =  height * color.domain().length / 2;
          var horz = -5 * legendRectSize;
          var vert = i * height - offset;
          return translation(horz, vert);
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
          var allEduData = genderData;
          // console.log(d);
          // console.log(allEduData);
          getElement = function(data, value){
            for (var i = 0; i < data.length; i++) {
              if(data[i].id === value){
                return data[i];
              }
            };
            return -1;
          };

          var curVal = getElement(allEduData, d).value;
          return d + ": " + curVal + "%";
        });
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
