
$(document).ready(function() { 
  var ACCESS_CODE = "5f7d1b42-6bdd-4b66-ba4a-f2cfdf6fbfe5";

  $.get("http://www.wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson?AccessCode=" + ACCESS_CODE, {}, function(data) {
    console.log("Response Data:", data);

    $("#results").text(JSON.stringify(data, null, 2));
  }, "jsonp");
});