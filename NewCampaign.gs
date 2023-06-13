function extractData() {
  var threads = GmailApp.search('subject:"Ny kampagnebestilling til" newer_than:1d -label:processed');

  // Iterate over all emails and extract the data
  var sheetId = 'sheetid'; // Replace with your spreadsheet ID
  var sheetName = 'sheetname'; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var valuesInIDCol = sheet.getRange("B:B").getValues().flat().filter((x) => !isNaN(x));
  var lastID = Math.max.apply(null, valuesInIDCol);

  var updatedRows = [];
  var processedLabel = GmailApp.getUserLabelByName("processed"); // Add this line to get the "processed" label
  

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var email = messages[j];
      var body = email.getPlainBody();
      var name = body.match(/Kampagne oprettet af:\s*(.*)\r?\n/)[1];
      var campaignsize = parseInt(body.match(/Ny bestilling:\s*(\d+)/)[1]);
      var link = body.match(/https?:\/\/[^\s]+/g)[0];
      var price = body.match(/Fakturerings-info:[\s\S]*?([\d.,]+)\s+DKK/)[1].replace(/[.]/g, '');
      Logger.log(link);
      // Mark the message as processed
      processedLabel.addToThread(email.getThread());

      // Append the data to a new row in the Google Sheet
      var nextID = lastID + 1;
      var count = 0;
      while (valuesInIDCol.includes(nextID)) {
        nextID = lastID + (++count);
      }
      lastID = nextID;
      sheet.appendRow([name, nextID, link, "", "", "", "", "", campaignsize, 0, "", "", "", "", "", "", "", "", "", "", price, "", "", "", "", "", "", "No template"]);

      updatedRows.push(sheet.getLastRow());

      // Mark the email as read
      //email.markRead();
      Logger.log("Updated rows: " + updatedRows.join(", "));
    }
  } 
}

