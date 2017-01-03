/**
 * function parses the username and policyid from the path
 * to set the hidden form fields
 * @returns
 */
function getUser() {
  var username = GetURLParameter('username');
  var policyid = GetURLParameter('policyid');
  $.getJSON('/RestService/User/username/' + username,
    function(userjson){
		var form = document.getElementById('customerform');
		form['username'].value = userjson.username;
		form['policyid'].value = policyid;
  });
}

$(document).ready(function(){
	  $("#sendQuestions").click(
	    function(){
	      var sponsor = GetURLParameter('code');
	      var username = GetURLParameter('username');
	      var policyid = GetURLParameter('policyid');
	      var form = document.getElementById('customerform');
	      var visits = form['doctorvisits'].value;
	      var prescriptions = form['prescriptions'].value;
	      var hsa = form['hsa'].value;
	      var premiums = form['premiums'].value;

	      var sendInfo = {
	    	      'questions': []
	    	    };
	      var q1 = {'name':'visits','answer': visits};
	      var q2 = {'name':'prescriptions','answer': prescriptions};
	      var q3 = {'name':'hsa','answer':hsa};
	      var q4 = {'name':'premiums','answer':premiums};
	      sendInfo.questions.push(q1);
	      sendInfo.questions.push(q2);
	      sendInfo.questions.push(q3);
	      sendInfo.questions.push(q4);

	      $.ajax(
	              {
	                url: "/RestService/Question/username/" + username,
	            	type: "POST",
	            	data: JSON.stringify(sendInfo),
	            	contentType: 'application/json; charset=utf-8',
	            	dataType: 'json',
	            	async: true,
	            	success: function(jsondata) {
	            	  sessionStorage.setItem('plans',JSON.stringify(jsondata));
	            	  // go to the next page to gather the customer data
	            	  window.location = 'plans.html?username=' + username + '&policyid=' + policyid;
	            	},
	            	error: function(msg) {
	            	  var rspJson = $.parseJSON(msg.responseText);
	            	  alert(rspJson.status);
	            	}
	              }
	            );
	    });
	});