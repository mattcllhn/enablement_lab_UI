function getPlans() {
  var username = GetURLParameter('username');
  var policyid = GetURLParameter('policyid');
  var form = document.getElementById('selectform');
  var planjson = sessionStorage.plans;
  var planobj = $.parseJSON(planjson);
  var plans = document.getElementById("plans");
  var count = planobj.length;
  for (i=0; i < count; i++) {
    var planlabel = 'Plan: ' + planobj[i].name + '<br/>';
    var covLabel = 'Deductibles / OOPM / Premiums: <br/>';
    var planCoverageDesc = planobj[i].coverageDescription + '<br/>';
    var button = "<input type='button' value='Select' id='selectPlan_" + planobj[i].planID + "' name='" + planobj[i].planID + "'><br/>";

    $('#plans').append(planlabel);
    $('#plans').append(covLabel);
    $('#plans').append(planCoverageDesc);
    $('#plans').append(button);
    $('#plans').append('<p/>');
  }
};

/**
 * function will handle the click for all form buttons that
 * start with selectPlan for the id. Note the javascript appends
 * the planID to the id to make it unique.
 */
$(document).ready(function(){
  $('[id*=selectPlan]').click(
    function(msg) {
      var button = msg.currentTarget;
      var id = button.id; // button.id is the unique identifier for the button in the HTML
      var buttonName = button.name; // the button name is the planID
      var username = GetURLParameter('username');
      var policyid = GetURLParameter('policyid');
      var planjson = sessionStorage.plans;
      var planobj = $.parseJSON(planjson);
      var planName = ''; // the name of the plan to display
      for (i=0; i <planobj.length;i++) {
    	  if (planobj[i].planID == buttonName) {
    		  planName = planobj[i].name;
    		  break;
    	  }
      }
      var policyJson = sessionStorage.policy;
      var policy = $.parseJSON(policyJson);
      policy.planID = buttonName;
      policy.planName = planName;
      // update the policy for the cusomter
      $.ajax(
              {
                url: "/RestService/Policy/username/" + username,
            	type: "PUT",
            	data: JSON.stringify(policy),
            	contentType: 'application/json; charset=utf-8',
            	dataType: 'json',
            	async: false,
            	success: function(jsondata) {
            	  sessionStorage.setItem('policy',JSON.stringify(policy));
          	      window.location = 'summary.html?username=' + username + '&policyid=' + policyid;
            	},
            	error: function(msg) {
            	  var rspJson = $.parseJSON(msg.responseText);
            	  alert("error updating");
            	}
              }
            );
      
    });
});