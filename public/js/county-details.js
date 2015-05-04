/* 
 * This file manages the county-details pane to the right of the map.
 */
function CountyDetails(educationData) {
  var self = this;
  function drawCharts(selector) {
    $(selector).addClass('hide');

    var popPyramidChart = PopolationPyramid(educationData);
    popPyramidChart('#population');

    var popEducationChart = EducationChart(educationData, 0);
    popEducationChart('#education');

    var popEducationChart = EducationChart(educationData, 1);
    popEducationChart('#femaleEducation');

    var popEducationChart = EducationChart(educationData, 2);
    popEducationChart('#maleEducation');

    var popIncomeChart = IncomeChart(educationData);
    popIncomeChart('#income');

    // createPopulationPyramid(countyId, datasetCache['educationData']);
    $(selector).removeClass('hide');

    $('.radioButton').change(function(){
      if ("" + this.value === "" + 0) {
        $('#education').hide();
        $('#femaleEducation').show();
        $('#maleEducation').show();
      } else {
        $('#education').show();
        $('#femaleEducation').hide();
        $('#maleEducation').hide();
      }
    });
  }

  return drawCharts;
}

