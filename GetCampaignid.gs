function getcampaignid() {
  var accessToken = 'accesstoken'; // Replace with your access token (For Benjamin)
  var adAccount = 'adaccount'; // Replace with your ad account ID
  var sheetId = 'sheetid'; // Replace with your spreadsheet ID
  var sheetName = 'sheetname'; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  // Define the range of cells to search for campaign numbers
  var campaignNumberRange = sheet.getRange('B:B');

  // Get the Facebook Ads API endpoint URL
  var url = 'https://graph.facebook.com/v16.0/' + adAccount + '/campaigns?fields=name,id';

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

  // Create an object to store the latest row for each campaign number
  var latestRows = {};

  // Loop through each row in the sheet to find the latest row for each campaign number
  for (var row = 2; row <= sheet.getLastRow(); row++) {
    var campaignNumber = sheet.getRange(row, 2).getValue().toString();
    if (latestRows[campaignNumber] == null || row > latestRows[campaignNumber]) {
      latestRows[campaignNumber] = row;
    }
  }

  // Loop through each campaign and match the campaign number with the second column of the sheet
  for (var i = 0; i < campaigns.length; i++) {
    var campaign = campaigns[i];
    var campaignName = campaign.name;
    var campaignId = campaign.id;

    // Extract the campaign number from the campaign name
    var matches = campaignName.match(/Projekt-(\d+)/);
    if (matches) {
      var campaignNumber = matches[1];
      Logger.log("Match found " + campaignNumber);

      // Get the latest row for the campaign number
      var row = latestRows[campaignNumber];

      // If a row is found, append the campaign ID to the 18th column of the same row
      if (row) {
        sheet.getRange(row, 18).setValue(campaignId);
      }
    }
  }
}
