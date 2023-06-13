function template() {
    // Specify the Sendinblue API key and API endpoint
  var apiKey = "apikey";
  var endpoint = "https://api.brevo.com/v3/emailCampaigns";


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
    var templatestatus = row[27];
    var link = row[2];
    var campnumber = row[1];

    if (templatestatus === 'No template') {
      var url = link; //replace with the URL you want to scrape
      var response = UrlFetchApp.fetch(url);
      var html = response.getContentText();

      //set variable of an HTML element - info
      var name_string = "cmaOnaW";
      var name_start = html.indexOf(name_string);
      var name_end = html.indexOf("</h1>", name_start);
      var name_result = html.slice(name_start, name_end)
          .replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "")
          .trim(); //remove white spaces at the beginning and end of the string
      Logger.log(name_result);

      //set variable of an HTML element - info
      var info_string = "cmaOnaX";
      var info_start = html.indexOf(info_string);
      var info_end = html.indexOf("</div>", info_start);
      var info_result = html.slice(info_start, info_end)
          .replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "")
          .trim(); //remove white spaces at the beginning and end of the string
      //Logger.log(info_result);

      //set variable of an HTML element - kan ikke deltage
      var kan_ikke_deltage_string = "cmaOwaL";
      var kan_ikke_deltage_start = html.indexOf(kan_ikke_deltage_string);
      var kan_ikke_deltage_end = html.indexOf("</div>", kan_ikke_deltage_start);
      var kan_ikke_deltage_result = html.slice(kan_ikke_deltage_start, kan_ikke_deltage_end)
          //.replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "•")
          .replace(/^\s+|\s+$/g, "")
          //.replace(/^\s+/gm, "")
          .replace(/^\s*|\s*$/gm, "") // remove leading and trailing whitespaces on each line
          .replace(/^\s*\u00A0\s*/gm, "")
          .trim(); //remove white spaces at the beginning and end of the string
      //Logger.log(kan_ikke_deltage_result);

      //set variable of an HTML element - kan deltage
      var kan_deltage_string = "cmaQaBk";
      var kan_deltage_start = html.indexOf(kan_deltage_string);
      var kan_deltage_end = html.indexOf("</div>", kan_deltage_start);
      var kan_deltage_result = html.slice(kan_deltage_start, kan_deltage_end)
          //.replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "•")
          .replace(/^\s+|\s+$/g, "")
          .replace(/^\s+/gm, "")
          .trim(); //remove white spaces at the beginning and end of the string
      //Logger.log(kan_deltage_result);

      //set variable of an HTML element - Honorar
      var honorar_string = "cmaOlo";
      var honorar_start = html.indexOf(honorar_string);
      var honorar_end = html.indexOf("</div>", honorar_start);
      var honorar_result = html.slice(honorar_start, honorar_end)
          .replace(/(<([^>]+)>)/gi, "") //remove HTML 
          .replace(honorar_string, '')
          .replace(/^\s*[^0-9]*/, '')
          .replace(/\s+/g, ' ')
          .trim(); //remove white spaces at the beginning and end of the string
      var honorar_parts = honorar_result.split(' '); //split the string into an array of words
      var honorar_number = honorar_parts[0]; //the first element should be the number
      var honorar_text = honorar_parts.slice(1).join(' '); //the rest should be the text

      //Logger.log(honorar_number);
      //Logger.log(honorar_text);

      //set variable of an HTML element - fordele
      var fordele_string = "cmaOlf";
      var fordele_start = html.indexOf(fordele_string);
      var fordele_end = html.indexOf("</div>", fordele_start);
      var fordele_result = html.slice(fordele_start, fordele_end)
          //.replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "•")
          .replace(/^\s+|\s+$/g, "")
          .replace(/^\s+/gm, "")
          .trim(); //remove white spaces at the beginning and end of the string
      //Logger.log(fordele_result);

      //set variable of an HTML element - forlob
      var forlob_string = "cmaQaZaL";
      var forlob_start = html.indexOf(forlob_string);
      var forlob_end = html.indexOf("</div>", forlob_start);
      var forlob_result = html.slice(forlob_start, forlob_end)
          //.replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "•")
          .replace(/^\s+|\s+$/g, "")
          .replace(/^\s+/gm, "")
          .trim(); //remove white spaces at the beginning and end of the string
      //Logger.log(forlob_result);

      //set variable of an HTML element - hvem
      var hvem_string = "cmaOmaA";
      var hvem_start = html.indexOf(hvem_string);
      var hvem_end = html.indexOf("</div>", hvem_start);
      var hvem_result = html.slice(hvem_start, hvem_end)
          .replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "")
          .trim(); //remove white spaces at the beginning and end of the string
      //Logger.log(hvem_result);

      //set variable of an HTML element - hvor
      var hvor_string = "cmaOlaX";
      var hvor_start = html.indexOf(hvor_string);
      var hvor_end = html.indexOf("</div>", hvor_start);
      var hvor_result = html.slice(hvor_start, hvor_end)
          .replace(/(<([^>]+)>)/gi, "") //remove HTML tags
          .replace(/^\w+">/, "")
          .replace(/&gt;/g, "")
          .trim(); //remove white spaces at the beginning and end of the string
      
      var subject = name_result;
      var campname = "Projekt-" + campnumber + "," + name_result
      var part1 = link + "?fnsib"; 
      var part2 = info_result;
      var part3 = "Husk: Da vi ikke har sundhedsdata om dig, kan de projekter vi sender være irrelevante for dig. De håber vi, du har forståelse for.";
      var part4 = hvor_result; 
      var part5 = kan_deltage_result; 
      var part6 = kan_ikke_deltage_result; 
      var part7 = honorar_number; // Column I
      var part8 = forlob_result; // Column M 
      var part9 = fordele_result;

      var unsubscribebox = `
      <tr>
        <td class="r3-c" align="center">
          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="50%" class="r4-o" style="table-layout: fixed; width: 50%;">
            <!-- -->
            <tbody>
              <tr>
                <td class="r18-i" style="background-color: #eff2f7;padding-bottom: 20px; padding-top: 20px;">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
                    <tbody>
                      <tr>
                        <th width="100%" valign="top" class="r6-c" style="font-weight: normal;">
                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r7-o" style="table-layout: fixed; width: 100%;">
                            <!-- -->
                            <tbody>
                              <tr>
                                <td valign="top" class="r8-i" style=" padding-left: 15px; padding-right: 15px;">
                                  <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td class="r13-c" align="left">
                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r16-o" style="table-layout: fixed; width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" class="r19-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-top: 15px; text-align: center;">
                                                  <div>
                                                    <p style="margin: 0;"><strong>ForskningNU ApS</strong></p>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="r13-c" align="left">
                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r16-o" style="table-layout: fixed; width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" class="r20-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; text-align: center;">
                                                  <div>
                                                    <p style="margin: 0;">Tagensvej 16a, 2200, København</p>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="r13-c" align="left">
                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r16-o" style="table-layout: fixed; width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" class="r19-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-top: 15px; text-align: center;">
                                                  <div>
                                                    <p style="margin: 0; font-size: 14px;"><span style="font-size: 14px;">Denne mail er blevet sendt til: {{contact.EMAIL}}</span></p>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="r13-c" align="left">
                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r16-o" style="table-layout: fixed; width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" class="r20-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; text-align: center;">
                                                  <div>
                                                    <p style="margin: 0; font-size: 14px;">Du har modtaget den, fordi du har oprettet en bruger på Forskningnu.dk</p>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="r13-c" align="left">
                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r16-o" style="table-layout: fixed; width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" class="r21-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-bottom: 15px; padding-top: 15px; text-align: center;">
                                                  <div>
                                                    <p style="margin: 0; font-size: 14px;"><a href="{{ unsubscribe }}" style="color: #0092ff; text-decoration: underline;"><span style="font-size: 14px;">Afmeld</span></a></p>
                                                  </div>
                                                  <div>
                                                    <p style="margin: 0; font-size: 14px;">
                                                      <a href="https://www.instagram.com/forskningnu.dk" style="color: #0092ff; text-decoration: underline;"><span style="font-size: 14px;">Instagram</span></a> |
                                                      <a href="https://www.linkedin.com/company/forskningnu-dk" style="color: #0092ff; text-decoration: underline;"><span style="font-size: 14px;">LinkedIn</span></a> |
                                                      <a href="https://www.facebook.com/forskningnu" style="color: #0092ff; text-decoration: underline;"><span style="font-size: 14px;">Facebook</span></a>
                                                    </p>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="r22-c" align="center">
                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r4-o" style="table-layout: fixed; width: 100%;">
                                            <tbody>
                                              <tr>
                                                <td valign="top" class="r23-i" style="padding-bottom: 15px;">
                                                  <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
                                                    <tbody>
                                                      <tr>
                                                        <td class="r24-c" align="center">
                                                          <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="129" class="r25-o" style="table-layout: fixed;">
                                                            <tbody>
                                                              <tr class="nl2go-responsive-hide">
                                                                <td height="11" style="font-size: 11px; line-height: 11px;">­</td>
                                                              </tr>
                                                              <tr>
                                                                <td height="48" class="r26-i" style="font-size: 0px; line-height: 0px;">
                                                                  <img src="https://my.sendinblue.com/public/upload/new_images/rnb/en.png" width="129" border="0" class="" style="display: block; width: 100%;">
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      `;

      if (part7 === "") {
        // Combine the parts into the email content without part7 as HTML
        var emailContent = '<div class ="im" style ="color: black;">' +
          "<p style=\"font-weight: bold; font-size: 16px;\">" + "Kære {{ contact.FIRSTNAME }}" + "</p>" + 
          "<p style=\"font-size: 14px;\">Vi har et nyt forskningsprojekt, som måske er interessant for dig. Klik på knappen eller læs mere om projektet herunder.</p>" +
          '<div style="display: flex;justify-content: center; margin-bottom: 10px; color: black;">' +
          '<a href="' + part1 + '" style="background-color: #0069D9; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Tilmeld dig</a>' +
          '</div>' +
          "<p style=\"font-weight: bold; font-size: 16px;\">🔍 Information om projektet</p>" +
          "<p style=\"font-size: 14px;  margin-bottom: 40px;\">" + part2 + "</p>" +
          "<p style=\"font-style: italic; font-size: 14px; margin-bottom: 40px;\">" + part3 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🌍 Hvor?</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part4 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🟢 Du kan deltage, hvis du:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part5 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🔴 Du kan ikke deltage, hvis du:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part6 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">👍 Fordele ved at deltage:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part9 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🔎 Det skal du igennem:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part8 + "</p>" +
          "<p style=\"font-size: 20px margin-bottom: 40px;\">🔵 Læs mere om projektet eller tilmeld dig ved at klikke på den blå knap 🔵</p>" +
          '<div style="display: flex;justify-content: center; margin-bottom: 10px; color: black;">' +
          '<a href="' + part1 + '" style="background-color: #0069D9; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Tilmeld dig</a>' +
          '</div>' +
          '<div style="display: flex;justify-content: center; margin-top: 10px; font-weight: bold; font-size: 16px; color: black;">' +
          "<p>Hav en fortsat super dag 😊<br><br></p>" +
          '</div>' +
          '<div style="display:flex; justify-content: center;">' + unsubscribebox + "</div>" + 
          '</div>';
      } else {
        // Combine the parts into the email content with part7 as HTML
        var emailContent = '<div class ="im" style ="color: black;">' +
          "<p style=\"font-weight: bold; font-size: 16px;\">" + "Kære {{ contact.FIRSTNAME }}" + "</p>" + 
          "<p style=\"font-size: 14px;\">Vi har et nyt forskningsprojekt, som måske er interessant for dig. Klik på knappen eller læs mere om projektet herunder.</p>" +
          '<div style="display: flex;justify-content: center; margin-bottom: 10px; color: black;">' +
          '<a href="' + part1 + '" style="background-color: #0069D9; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Tilmeld dig</a>' +
          '</div>' +
          "<p style=\"font-weight: bold; font-size: 16px;\">🔍 Information om projektet</p>" +
          "<p style=\"font-size: 14px;  margin-bottom: 40px;\">" + part2 + "</p>" +
          "<p style=\"font-style: italic; font-size: 14px; margin-bottom: 40px;\">" + part3 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🌍 Hvor?</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part4 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🟢 Du kan deltage, hvis du:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part5 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🔴 Du kan ikke deltage, hvis du:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part6 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">💲 Ved deltagelse gives der:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part7 + " DKK"+ "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">👍 Fordele ved at deltage:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part9 + "</p>" +
          "<p style=\"font-weight: bold; font-size: 16px;\">🔎 Det skal du igennem:</p>" +
          "<p style=\"font-size: 14px; margin-bottom: 40px;\">" + part8 + "</p>" +
          "<p style=\"font-size: 20px margin-bottom: 40px;\">🔵 Læs mere om projektet eller tilmeld dig ved at klikke på den blå knap 🔵</p>" +
          '<div style="display: flex;justify-content: center; margin-bottom: 10px; color: black;">' +
          '<a href="' + part1 + '" style="background-color: #0069D9; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Tilmeld dig</a>' +
          '</div>' +
          '<div style="display: flex;justify-content: center; margin-top: 10px; font-weight: bold; font-size: 16px; color: black;">' +
          "<p>Hav en fortsat super dag 😊<br><br></p>" +
          '</div>' +
          '<div style="display:flex; justify-content: center;">' + unsubscribebox + "</div>" + 
          '</div>';
      }

      // Create the request payload
      var payload = {
        "name": campname,
        "subject": subject,       
        "htmlContent": emailContent,
        "sender": {"name": "name", "email": "email"}
      };

      // Make the HTTP request to create the email template
      var options = {
        "method": "POST",
        "headers": {"api-key": apiKey},
        "payload": JSON.stringify(payload),
        "contentType": "application/json"
      };
      var response = UrlFetchApp.fetch(endpoint,options);
      var responseData = JSON.parse(response.getContentText());
      
      sheet.getRange(i+1, 28).setValue('Has template');
      // Log the response data
      Logger.log(responseData);
      Logger.log(part1);

    } else {
      Logger.log("The template is already done")
    }
  }
}  
