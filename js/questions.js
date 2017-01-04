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
        var sendInfo = {
	    	      questions: [
                {
                  name:'visits',
                  answer: $('input[name=question1]:checked').val()
                },{
                  name:'prescriptions',
                  answer: $('input[name=question2]:checked').val()
                },{
                  name:'hsa',
                  answer: $('input[name=question3]:checked').val()
                },{
                  name:'premiums',
                  answer: $('input[name=question4]:checked').val()
                },
              ]//questions
	    	    };//sendInfo
        console.log('sendInfo',sendInfo);

	      // $.ajax(
	      //         {
	      //           url: "/RestService/Question/username/" + username,
	      //       	type: "POST",
	      //       	data: JSON.stringify(sendInfo),
	      //       	contentType: 'application/json; charset=utf-8',
	      //       	dataType: 'json',
	      //       	async: true,
	      //       	success: function(jsondata) {
	      //       	  sessionStorage.setItem('plans',JSON.stringify(jsondata));
	      //       	  // go to the next page to gather the customer data
	      //       	  window.location = 'plans.html?username=' + username + '&policyid=' + policyid;
	      //       	},
	      //       	error: function(msg) {
	      //       	  var rspJson = $.parseJSON(msg.responseText);
	      //       	  alert(rspJson.status);
	      //       	}
	      //         }
	      //       );
	    });
	});
