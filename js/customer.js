/**
* getUser parses the username from the URL and uses jQuery.getJSON()
* to get the user data. It will fill in the first name
*/
//function getUser() {
//  var username = GetURLParameter('username');
//  $.getJSON('/RestService/User/username/' + username,
//    function(userjson){
//		var form = document.getElementById('customerform');
//		form['employeefirstname'].value = userjson.name;
//  });
//}

/**
* adds customers to JSON and sends POST to the service
* @returns
*/

function addCustomers() {
	var dependentArray = [];

	var count = $('#dependents').val();
	for (var i = 0; i < count; i++) {
		//grab dependent template
		var dependent = $('#dependentTemplate').clone();
		//change id and remove hidden class
		dependent.attr('id', 'dependent-'+(i+1)).removeClass('hidden');
		//set html of each legend tag
		dependent.find('legend').html('Dependent - '+(i+1));
		var label = dependent.find('label');
		//loop through each label tag
		label.each(function(){
			//grab the "for" attribute string of each label
			var labelString = $(this).attr('for');
			//find the corresponding input
			var formInput = dependent.find('[id="'+ labelString + '"]');
			//iterate to unique string
			labelString +=(i+1);
			//apply to 'for'attribute of label and id of input
			$(this).attr('for',labelString);
			formInput.attr('id', labelString);
		});//forEach
		dependentArray.push(dependent);
		$('#outputDiv').html(dependentArray);
	}//for loop
}//addCustomers


function getCustomers(){
	var customers = [];
	var employee = {
		fname:$('#employeefirstname').val(),
		lname:$('#employeelastname').val(),
		bdate:$('#employeebirthdate').val(),
		gnd:$('#employeegender').val(),
		sn:$('#employeessn').val(),
		headOfHousehold:true
	};//employee
	customers.push(employee);
	for (var i = 0; i < $('#dependents').val(); i++) {
	var dependent = {
		fname:$('#dependentfirstname'+(i+1)).val(),
		lname:$('#dependentlastname'+(i+1)).val(),
		bdate:$('#dependentbirthdate'+(i+1)).val(),
		gnd:$('#dependentgender'+(i+1)).val(),
		sn:$('#dependentssn'+(i+1)).val(),
		headOfHousehold:false
	};//dependent
	customers.push(dependent);
}//for loop
// console.log('customers',customers);
return customers;

	// console.log('employee\n\n',employee);
}//getCustomers





$(document).ready(function() {

	$('#dependents').change(function() {
		addCustomers();
	});

	$("#saveCustomer").click(
		function(){
			var username = GetURLParameter('username');
			var sendInfo = {
				policyID:null,
				customers:getCustomers(),
				sponsor :GetURLParameter('code')

			};//sendinfo

			console.log('sendInfo logged here \n',sendInfo);

			// $.ajax(
			//         {
			//           url: "/RestService/Policy/username/" + username,
			//       	type: "POST",
			//       	data: JSON.stringify(sendInfo),
			//       	contentType: 'application/json; charset=utf-8',
			//       	dataType: 'json',
			//       	async: true,
			//       	success: function(jsondata) {
			//       	  sessionStorage.setItem('policy',JSON.stringify(jsondata));
			//       	  // go to the next page to gather the customer data
			//       	  window.location = 'questions.html?username=' + username + '&policyid=' + jsondata.policyID;
			//       	},
			//       	error: function(msg) {
			//       	  var rspJson = $.parseJSON(msg.responseText);
			//       	  alert(rspJson.status);
			//       	}
			//         }
			//       );
		});//saveCustomer onclick
	});//docready
