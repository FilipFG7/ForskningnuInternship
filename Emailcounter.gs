function count1() {
  var sheetId = 'sheetid'; // Replace with your spreadsheet ID
  var sheetName = 'sheetname'; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var processedLabel = GmailApp.getUserLabelByName("processed");
  var threads = GmailApp.search('subject:"Ny tilmelding til projekt" newer_than:1d -label:processed');
  var linkCount = {};

  // Read existing data into a dictionary object
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    linkCount[data[i][2]] = {
      count: parseInt(data[i][9]),
      row: i + 1 // add 1 because rows are 1-indexed in Sheets
    };
  }

  // Count links in new emails
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var body = message.getBody();
      
      var link = body.match(/(https?:\/\/[^\s]+\/projekt\/[^\s]+)<\/span><\/div>/)[1];
     
      Logger.log(link);

       // Check if "Bestilte:" is followed by a number
      var regex = /Bestilte:\s*(\d+)/i;
      var matches = body.match(regex);
      if (matches == null) {
        continue;
      }

      if (linkCount[link] === undefined) {
        linkCount[link] = {
          count: 1,
          row: -1 // set row to -1 for new links not found in the sheet
        };
      } else {
        linkCount[link].count += 1;
      }

      // Mark the message as processed
      processedLabel.addToThread(message.getThread());
    }
  }

  // Write the link count data to the sheet
  var links = Object.keys(linkCount);
  for (var k = 0; k < links.length; k++) {
    var link = links[k];
    var linkData = linkCount[link];

    if (linkData.row === -1) {
      // Link not found in sheet, append new row
      //sheet.appendRow(["", "", link, "", "", "", "", "", "", linkData.count]);
      Logger.log("Wanted to append new row")
    } else {
      // Link found in sheet, update count in latest row
      sheet.getRange(linkData.row, 10).setValue(linkData.count);
    }
  }
}
