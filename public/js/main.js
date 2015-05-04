var main = (function () {
  var map_width = 480;
  var map_height = 300;
  var datasetCache = {};
  
  // "Main" fn; starts after all DOM elements have loaded
  $(document).ready(function() {
    // Load county reference details
    d3.json('/datasets/reference/wa-county-codes.json', function(err, countyCodes) {
      datasetCache['countyCodes'] = countyCodes;
    });

    d3.json('/datasets/reference/wa-education-data-simple.json', function(err, educationData) {
      datasetCache['educationData'] = educationData;
    });

    var cacheInterval = setInterval(function() {
      if (cacheLoaded()) {
        var chart = StateChart(datasetCache)
                      .width(map_width)
                      .height(map_height);
        chart('#map');
        clearInterval(cacheInterval);
      }
    }, 50);
  });

  function cacheLoaded() {
    var cacheKeys = ['educationData', 'countyCodes'];
    return _.difference(cacheKeys, Object.keys(datasetCache)).length === 0;
  }
});

main();