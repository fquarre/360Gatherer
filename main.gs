function doGet(e) {
  return HtmlService.createTemplateFromFile('feedbackForm').evaluate();
}

function processForm(formObject) {
  if ((formObject.context == "") || (formObject.feedback == "")) {
    throw "Please make sure to fill in all the fields. Thank you!!"; 
  }

  if ((typeof formObject.anonymousCheck === "undefined") && ((formObject.firstName == "") || (formObject.lastName == "") || (formObject.email == ""))) {
    throw "Please make sure to capture your first name, last name and email. Thank you!!";
  } else {  
    formObject.firstName = (formObject.anonymousCheck == "on") ? "" : formObject.firstName;
    formObject.lastName = (formObject.anonymousCheck == "on") ? "" : formObject.lastName;
    formObject.email = (formObject.anonymousCheck == "on") ? "" : formObject.email;
  }
    
  var newData = [[new Date().toTimeString(), formObject.firstName, formObject.lastName, formObject.email, formObject.context, formObject.feedback]];
  
  var ss = SpreadsheetApp.openById([SPREADSHEETCODE]);
  
  var sheet = ss.getSheets()[0];
  sheet.getRange(sheet.getLastRow()+1,1,1,6).setValues(newData);

  return "Thank you very much for your help in this year's review!!"
}
