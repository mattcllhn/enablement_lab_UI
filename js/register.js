/**
 * javascript functions for registering a new user
 */
$(document).ready(function(){
  $("#register").click(
    function(){
      //sets the value of each property by targeting id of input fields and grabbing the value
      var sendInfo = {
            emailAddress: $('#emailAddress').val(),
            password: $('#password').val(),
            code: $('#code').val(),
            username: $('#username').val(),
            name: $('#name').val(),
            billingAddress: {
              city:$('#city').val(),
              line1:$('#line1').val(),
              line2:$('#line2').val(),
              name:'billing',
              postalCode:$('#postalCode').val(),
              state:$('#state').val()
            }//billingAddress
          };//sendInfo
      // Checking for blank fields.
      if( !sendInfo.emailAddress || !sendInfo.password || !sendInfo.code){
        alert("Please fill all fields...!!!!!!");
      }else {
        console.log('sendInfo logged here:',sendInfo);
        // $.ajax(
        //   {
        //     url: "/RestService/User/",
        // 	type: "POST",
        // 	data: JSON.stringify(sendInfo),
        // 	contentType: 'application/json; charset=utf-8',
        // 	dataType: 'json',
        // 	async: true,
        // 	success: function(msg) {
        // 	  // go to the next page to gather the customer data
        // 	  window.location= 'customer.html?username=' +username + '&code=' + rcode;
        // 	},
        // 	error: function(msg) {
        // 	  var rspJson = $.parseJSON(msg.responseText);
        // 	  alert(rspJson.status);
        // 	}
        //   }
        // );
      }
  });
});
