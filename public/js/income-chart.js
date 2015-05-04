// Code modified from Mike Bostock - http://bl.ocks.org/mbostock/3887051#data.csv


function IncomeChart(countyData) {
  var width = 500, 
      height = 200
      self = this;

  // Private fns
  function translation(x,y) {
    return 'translate(' + x + ',' + y + ')';
  }
    
  function draw(selector) {
    // var margin = {top: 20, right: 20, bottom: 30, left: 40},
    // width = 960 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;

    $(selector).find('svg').remove();
    var margin = {
      top: 20,
      right: 20,
      bottom: 140,
      left: 40,
      middle: 28
    };

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["firebrick", "steelblue"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr('class', 'inner-region')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../datasets/reference/mbostockexdata.csv", function(error, data) {
      var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

      data.forEach(function(d) {
        d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
      });


      x0.domain(data.map(function(d) { return d.State; }));
      x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .style("font-size" , "10px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .style("text-anchor", "end")
          .style("font-size", "10px")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em");
      svg.selectAll('.y.axis')
          .selectAll('.tick')
          .style('font-size', '11px')

      var data1 = [];
      for (i = 0; i < 6; i++) {
        var income = [];
        income[0] = {name: "Female", value: countyData['female']['income'][i].value};
        income[1] = {name: "Male", value: countyData['male']['income'][i].value};

        data1[i] = {Female: countyData['female']['income'][i].value, Male: countyData['male']['income'][i].value,State: countyData['male']['income'][i].id, ages: income};
      }

      var state = svg.selectAll(".state")
          .data(data1)
          .enter().append("g")
          .attr("class", "gbar")
          .attr("transform", function(d) {return "translate(" + x0(d.State) + ",0)";});

      state.selectAll("rect")
          .data(function(d) { return d.ages; })
          .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return color(d.name); });

      var legend = svg.selectAll(".legend")
          .data(ageNames.slice())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(-400," + i * 20 + ")"; })
          //.attr("transform", "translate(" + 0 + "," + 0 + ")")
          ;

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
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
