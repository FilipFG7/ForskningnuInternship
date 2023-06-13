function getcampaignspend() {
  var accessToken = 'accesstoken'; // Replace with your access token (For Benjamin)
  var adAccount = 'adaccount'; // Replace with your ad account ID
  var sheetId = 'sheetid'; // Replace with your spreadsheet ID
  var sheetName = 'sheetname'; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  // Define the range of cells to search for project numbers
  var projectNumberRange = sheet.getRange('B:B');

  // Get the Facebook Ads API endpoint URL
  var url = 'https://graph.facebook.com/v16.0/' + adAccount + "/insights?fields=spend,campaign_name&level=campaign&date_preset=maximum&limit=1000";

  // Set up the URL fetch options
  var options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  };

  // Fetch the campaigns from the Facebook Ads API
  var response = UrlFetchApp.fetch(url, options);
  var campaigns = JSON.parse(response.getContentText()).data;
  //Logger.log(campaigns);

  // Create an object to store the latest row for each project number
  var latestRows = {};

  // Loop through each row in the sheet to find the latest row for each project number
  for (var row = 2; row <= sheet.getLastRow(); row++) {
    var projectNumber = sheet.getRange(row, 2).getValue().toString();
    if (latestRows[projectNumber] == null || row > latestRows[projectNumber]) {
      latestRows[projectNumber] = row;
    }
  }

  // Loop through each campaign and match the project number with the second column of the sheet
  for (var i = 0; i < campaigns.length; i++) {
    var campaign = campaigns[i];
    var campaignName = campaign.campaign_name;
    var campid= campaign.id;
    //var campins= campaign.reach;
    var spend = parseFloat(campaign.spend);
    

    Logger.log(campaignName);
    //Logger.log(campid);
    //Logger.log(campins);
    Logger.log(spend);
    

    // Extract the project number from the campaign name
    var matches = campaignName.match(/Projekt-(\d+)/);
    if (matches) {
      var projectNumber = matches[1];
      //Logger.log("Match found " + projectNumber);

      // Get the latest row for the project number
      var row = latestRows[projectNumber];

      // If a row is found, append the spend to the 20th column of the same row
      if (row) {
        //sheet.getRange(row, 20).setValue(spend);
        sheet.getRange(row, 20).setValue(spend.toFixed(0));
      }
    }
  }
}
