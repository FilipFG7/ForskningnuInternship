# Internship at Forskningnu

## Codes are created and run in google apps script (Open extensions in google sheet)
These codes are functions which are used to automate repetitive processes. The main purpose is to keep track of various campaigns. Each campaign has a project number, link, number of participants they require(NPR), number of participants provided(NPP) so far and campaign price. These values and more are automatically scraped or calculated and together create an overview for each campaign. 
Furthermore, some functions are used to stop facebook ads for a campaign, when the number of participatns provided reaches the number required. 
Subsequently, there are functions that help with sending out emails to the database of people by creating an email template in brevo and separating contacts into lists. 

## NewCampaign.gs
This function looks for a specific subject line in gmail, and scrapes needed information(campaign name, link, NPR, price), which is then appended to google sheet. 

## Emailcounter.gs
This function also looks for a specific subject line in gmail, and obtains a number of participants needed based on the link(primary key), which is in email as well as in google sheet, and then updates the NPP values in the google sheet. 

## GetCampaignid.gs
This fucntion connects via access token and ad account number into Facebook Ads manager and scrapes the campaign ids based on a project number and updates values the google sheet.

## Stopads.gs
This function uses the campaign ids to stop the ads which campaigns have been completed. The campaign is completed when NPR=<NPP. 

## Getspend.gs
This function scrapes the amount spent on each campaign from FB Ads manager. Amount spent is then subtracted from the campaign price to calculate profit for each campaign.

## Emailtemplate.gs
This function uses the link of each new campaign, opens it, scrapes needed information about the campaign, uses the info to fill into an email template, which is then posted on Brevo.com. 

## separationintolist.gs
This function splits all new contacts that are created in Brevo.com into 2 lists, one for participatns and one for researchers based on column values.
