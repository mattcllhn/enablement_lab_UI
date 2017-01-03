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



	// var form = document.getElementById('customerform');
	// var customers = document.getElementById("customers");
	// var count = form['dependents'].value;
	// while (customers.hasChildNodes()) {
	// 	customers.removeChild(customers.lastChild);
  //   }
	// for (i=0; i < count; i++) {
	//
	// 	var txtnode = document.createTextNode('Dependent ' + (i + 1));
	// 	var newc = {'first':null,'last':null,'birthdate':null,'gender':null,'ssn':null,'headOfHousehold':false}
	// 	var firstlabel = document.createTextNode('First: ');
	// 	var first = document.createElement("input");
	// 	var lastlabel = document.createTextNode('Last: ');
	// 	var last = document.createElement("input");
	// 	var bdlabel = document.createTextNode('Birth Date: ');
	// 	var birthdate = document.createElement("input");
	// 	var dateformat = document.createTextNode(' yyyy-mm-dd');
	// 	var ssnlabel = document.createTextNode('SSN: ');
	// 	var ssn = document.createElement("input");
	// 	var genderlabel = document.createTextNode('Gender: ');
	// 	var gender = document.createElement("select");
	// 	var male = document.createElement("option");
	// 	male.value = 'Male';
	// 	male.appendChild(document.createTextNode('Male'));
	// 	var female = document.createElement("option");
	// 	female.value = 'Female';
	// 	female.appendChild(document.createTextNode('Female'));
	// 	gender.appendChild(male);
	// 	gender.appendChild(female);
	// 	first.type = 'text';
	// 	first.name = 'first' + i;
	// 	last.type = 'text';
	// 	last.name = 'last' + i;
	// 	birthdate.type = 'text';
	// 	birthdate.name = 'birthdate' + i;
	// 	ssn.type = 'text';
	// 	ssn.name = 'ssn' + i;
	// 	gender.name = 'gender' + i;
	//
	// 	customers.appendChild(txtnode);
	// 	customers.appendChild(document.createElement("br"));
	// 	customers.appendChild(firstlabel);
	// 	customers.appendChild(first);
	// 	customers.appendChild(document.createElement("br"));
	// 	customers.appendChild(lastlabel);
	// 	customers.appendChild(last);
	// 	customers.appendChild(document.createElement("br"));
	// 	customers.appendChild(bdlabel);
	// 	customers.appendChild(birthdate);
	// 	customers.appendChild(dateformat);
	// 	customers.appendChild(document.createElement("br"));
	// 	customers.appendChild(ssnlabel);
	// 	customers.appendChild(ssn);
	// 	customers.appendChild(document.createElement("br"));
	// 	customers.appendChild(genderlabel);
	// 	customers.appendChild(gender);
	// 	customers.appendChild(document.createElement("br"));
	// 	customers.appendChild(document.createElement("br"));
	// }
}//addCustomers

$(document).ready(function() {
  $('#dependents').change(function() {
    addCustomers();
  });
});

$(document).ready(function(){
  $("#saveCustomer").click(
    function(){
      var sponsor = GetURLParameter('code');
      var username = GetURLParameter('username');
      var form = document.getElementById('customerform');
      var customers = document.getElementById("customers");
      var count = form['dependents'].value;
      var name = form['addrname'].value;
      var line1 = form['line1'].value;
      var line2 = form['line2'].value;
      var city = form['city'].value;
      var state = form['state'].value;
      var zip = form['postalCode'].value;
      var billing = {'name':name, 'line1':line1, 'line2':line2, 'city':city, 'state':state, 'postalCode':zip};
      var sendInfo = {
    	      'policyID': null,
    	      'customers': [],
    	      'billingAddress': billing,
    	      'sponsor': sponsor
    	    };
      // first we add the employee
      var fname = form['employeefirstname'].value;
      var lname = form['employeelastname'].value;
      var bdate = form['employeebirthdate'].value;
      var gnd = form['employeegender'].value;
      var sn = form['employeessn'].value;
      var employee = {'first':fname,'last':lname,'birthDate':bdate,'headOfHousehold':true,'gender':gnd,'ssn':sn};
      sendInfo.customers.push(employee);
      for (i=0; i < count; i++) {
        var first = form['first' + i].value;
        var last = form['last' + i].value;
        var birth = form['birthdate' + i].value;
        var ssn = form['ssn' + i].value;
        var gender = form['gender' + i].value;
        var ct = {'first':first,'last':last,'birthDate':birth,'headOfHousehold':false,'gender':gender,'ssn':ssn};
        sendInfo.customers.push(ct);
      }
      //alert('save the customer data');
      $.ajax(
              {
                url: "/RestService/Policy/username/" + username,
            	type: "POST",
            	data: JSON.stringify(sendInfo),
            	contentType: 'application/json; charset=utf-8',
            	dataType: 'json',
            	async: true,
            	success: function(jsondata) {
            	  sessionStorage.setItem('policy',JSON.stringify(jsondata));
            	  // go to the next page to gather the customer data
            	  window.location = 'questions.html?username=' + username + '&policyid=' + jsondata.policyID;
            	},
            	error: function(msg) {
            	  var rspJson = $.parseJSON(msg.responseText);
            	  alert(rspJson.status);
            	}
              }
            );
    });
});
