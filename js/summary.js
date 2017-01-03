/**
 * function will get the Policy from local storage and display the policy details
 * @returns
 */
function getPolicy() {
    var policyJson = sessionStorage.policy;
    var policy = $.parseJSON(policyJson);	
    var username = GetURLParameter('username');
    var policyid = GetURLParameter('policyid');
    // note this uses jquery syntax instead of regular Javascript syntax to build the html tags
    var cardTitle = '<h2>Perfect Healthcare</h2>';
    var payerID = 'Payer ID <b>' + policy.payerID + '</b><br/>' ;
    var policyLine = 'ID <b>' + policy.policyID + '</b> &nbsp;&nbsp;Group/Policy <b>' + policy.planGroup + '</b><br/>';
    var careDesc = 'Care Type <b>' + policy.careType + '</b>';
    $('#policy').append(cardTitle);
    $('#policy').append(payerID);
    $('#policy').append(policyLine);
    /**
     * add the person's name and list of dependents
     */
    $('#policy').append(careDesc);
    /**
     * Add a button that prints
     */
};