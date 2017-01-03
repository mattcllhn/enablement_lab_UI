function getPlans() {
  var username = GetURLParameter('username');
  var policyid = GetURLParameter('policyid');
  var form = document.getElementById('selectform');
  var planjson = sessionStorage.plans;
  var planobj = $.parseJSON(planjson);
  var plans = document.getElementById("plans");
  var count = planobj.length;
  for (i=0; i < count; i++) {
    var planlabel = document.createTextNode('Plan: ' + planobj[i].name);
    var covLabel = document.createTextNode('Deductibles / OOPM / Premiums: ');
    var planCoverageDesc = document.createTextNode('' + planobj[i].coverageDescription);
    var button = document.createElement("input");
    var icon = document.createElement("img");
    button.appendChild(icon);
    icon.src = './images/select.png';
    button.name = planobj[i].planID;
    button.type = 'button';
    button.value = 'Select';
    // the id of the button has to be unique
    button.id = 'selectPlan_' + planobj[i].planID;
    plans.appendChild(planlabel);
    plans.appendChild(document.createElement("br"));
    plans.appendChild(covLabel);
    plans.appendChild(document.createElement("br"));
    plans.appendChild(planCoverageDesc);
    plans.appendChild(document.createElement("br"));
    plans.appendChild(button);
    plans.appendChild(document.createElement("p"));
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
      var input = msg.currentTarget;
      var id = input.id;
      var name = input.name;
      var username = GetURLParameter('username');
      var policyid = GetURLParameter('policyid');
      var planjson = sessionStorage.plans;
      var planobj = $.parseJSON(planjson);
      var pname = '';
      for (i=0; i <planobj.length;i++) {
    	  if (planobj[i].planID == name) {
    		  pname = planobj[i].name;
    	  }
      }
      var policyJson = sessionStorage.policy;
      var policy = $.parseJSON(policyJson);
      policy.planID = name;
      policy.planName = pname;
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
            	  sessionStorage.setItem('policy',JSON.stringify(jsondata));
            	  window.location = 'summary.html?username=' + username + '&policyid=' + policyid;
            	},
            	error: function(msg) {
            	  var rspJson = $.parseJSON(msg.responseText);
            	  alert(rspJson.status);
            	}
              }
            );
      
    });
});