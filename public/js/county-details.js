/* 
 * This file manages the county-details pane to the right of the map.
 */
function CountyDetails(educationData) {
  var self = this;
  function drawCharts(selector) {
    $(selector).addClass('hide');

    var popPyramidChart = PopolationPyramid(educationData);
    popPyramidChart('#population');


    // createPopulationPyramid(countyId, datasetCache['educationData']);
    $(selector).removeClass('hide');
  }

  return drawCharts;
}

