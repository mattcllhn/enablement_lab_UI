/**
 * javascript functions for registering a new user
 */
$(document).ready(function(){
  $("#register").click(
    function(){
      var form = document.getElementById('regform'); // lookup the HTML element for the form
      var username = form['username'].value; // get the username input from the form
      var email = form['emailAddress'].value; // get the emailAddress input from the form
      var password = form['password'].value; // get the password input from the form
      var name = form['name'].value; // get the name inpt from the form
      var rcode = form['code'].value; // get the code input from the form
      // the JSON data we will send to the server
      var sendInfo = {
    	      'emailAddress': email,
    	      'password': password,
    	      'code': rcode,
    	      'username': username,
    	      'name': name
    	    };
      // Checking for blank fields.
      if( !email || !password || !rcode){
        alert("Please fill all fields...!!!!!!");
      }else {
        $.ajax(
          {
            url: "/RestService/User/",
        	type: "POST",
        	data: JSON.stringify(sendInfo),
        	contentType: 'application/json; charset=utf-8',
        	dataType: 'json',
        	async: true,
        	success: function(msg) {
        	  // go to the next page to gather the customer data
        	  window.location= 'customer.html?username=' +username + '&code=' + rcode;
        	},
        	error: function(msg) {
        	  var rspJson = $.parseJSON(msg.responseText);
        	  alert(rspJson.status);
        	}
          }
        );
      }
  });
});