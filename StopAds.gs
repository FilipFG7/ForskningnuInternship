function stopads() {
  // Set the Facebook API access token and version
  var accessToken = 'accessToken';  // Replace with your access token (For Benjamin)
  var adAccountId = 'adaccountid'; // Replace with your ad account ID

  // Get the active Google Sheet
  var sheetId = 'sheetid'; // Replace with your spreadsheet ID
  var sheetName = 'sheetname'; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  // Get the data range of the sheet
  var dataRange = sheet.getDataRange();

  // Get the values in the sheet
  var values = dataRange.getValues();

  // Loop through the values in the sheet
  for (var i = 2; i < values.length; i++) {
    var row = values[i];
    var triggerValue = row[10]; // Get the value in the 11th column
    var campaignId = row[17]; // Get the value in the 18th column
    var adstatus = row[18];
    // Check if there is a campaign ID in the row
    if (campaignId) {
      Logger.log("has id");
      // Check if the ad status is 'running'
      if (triggerValue >= 100) {
        Logger.log("runs");
        // If the ad status is 'running', check if the trigger value is 100 or greater
        if (adstatus === 'running') {
          // If the trigger value is 100 or greater, turn off the Facebook ad
          var url = 'https://graph.facebook.com/v16.0/' + campaignId;
          var options = {
            'method': 'post',
            'headers': {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json'
            },
            'payload': JSON.stringify({
              'status': 'PAUSED'
            })
          };
          var response = UrlFetchApp.fetch(url, options);
          Logger.log(response.getContentText());
          
          // Add a new column to the row with the status of the ad
          sheet.getRange(i+1, 19).setValue('stopped');
        } else {
          // If the ad status is not 'running', skip to the next row
          continue;
        }
      } else {
        // If the trigger value is less than 100, mark the ad as ongoing
        sheet.getRange(i+1, 19).setValue('running');
        
      }
    } else {
      // If there is no campaign ID in the row, skip to the next row
      continue;
    }
  }
}
