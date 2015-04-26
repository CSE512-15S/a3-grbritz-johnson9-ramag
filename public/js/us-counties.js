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

    // $.get('/datasets/census-maps/county.json', {}, function(data) {
    //   console.log("data loaded", data);
    //   $("#results")
    //     .html(JSON.stringify(data, null, 2));
    // });
    // 
    var path = d3.geo.path();

    d3.json('/datasets/census-maps/us.json', function(err, topology) {
      console.log(topology);
      d3.select('#results')
        .text(JSON.stringify(topology, null, 2));

      svg.selectAll('path')
         .data(topojson.feature(topology, topology.objects.counties).features)
         .enter()
         .append('path')
         .attr('d', path);
    });
  });
})();

