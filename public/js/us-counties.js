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
    var path = d3.geo.path();

    d3.json('/datasets/census-maps/us.json', function(err, topology) {

      svg.selectAll('path')
         .data(topojson.feature(topology, topology.objects.counties).features, 
          function (datum) {
           return datum.id;
         })
         .enter()
         .append('path')
         .attr('d', path)
         .attr('id', function(d) { return d.id; });

      bindMapControls();
    });
  });



  function bindMapControls() {
    console.log("bind map controls");
    $(".controls-wrapper input[name=zip-code-filter]").on('input', function() {
      var $this = $(this);
      var zipCode = $this.val();
      highlightByZipcode(zipCode);
    });




  }

  function highlightByZipcode(zipCode) {
    console.log("filtering by: ", zipCode);

  }
})();

