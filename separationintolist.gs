function separate() {
  var apiKey = "apikey";
  var baseUrl = "https://api.sendinblue.com/v3/contacts";

  var headers = {
    "Content-Type": "application/json",
    "api-key": apiKey,
  };

  var list1Id = 30; // Replace with the actual List 1 ID (as a number)
  var list2Id = 33; // Replace with the actual List 2 ID (as a number)
  var columnName = "SEX"; // Replace with the name of the column to check

  var page = 1;
  var perPage = 300; // Fetch up to 300 contacts per API request
  var totalContacts = 0;
  var contactsProcessed = 0;
  var list1Count = 0;
  var list2Count = 0;

  do {
    var contactsResponse = UrlFetchApp.fetch(
      `${baseUrl}?limit=${perPage}&page=${page}`,
      {
        headers: headers,
      }
    );

    var contactsData = JSON.parse(contactsResponse.getContentText());
    var contacts = contactsData.contacts;
    totalContacts = contactsData.count;

    contacts.forEach(function (contact) {
      var columnValue = contact.attributes[columnName];
      var existingListIds = contact.listIds || []; // Get the existing list IDs of the contact

      // Check if the contact is already in the target lists
      var isInList1 = existingListIds.includes(list1Id);
      var isInList2 = existingListIds.includes(list2Id);

      if ((!columnValue && !isInList2) || (columnValue && !isInList1)) {
        // If the contact is not in the target list, update its list IDs
        var listIds = existingListIds;

        if (columnValue && !isInList1) {
          // If the column value exists and contact is not already in List 1, add List 1 ID
          listIds.push(list1Id);
          list1Count++;
        } else if (!columnValue && !isInList2) {
          // If the column value is empty and contact is not already in List 2, add List 2 ID
          listIds.push(list2Id);
          list2Count++;
        }

        var updatePayload = {
          listIds: listIds,
        };

        // Update the contact's list IDs
        var updateOptions = {
          method: "PUT",
          headers: headers,
          payload: JSON.stringify(updatePayload),
        };

        UrlFetchApp.fetch(baseUrl + "/" + contact.id, updateOptions);
      }

      contactsProcessed++;
    });

    page++;
  } while (contactsProcessed < totalContacts && contactsProcessed < 300); // Stop processing after 300 contacts

  Logger.log("Separation into lists completed successfully!");
  Logger.log("Contacts added to List 1: " + list1Count);
  Logger.log("Contacts added to List 2: " + list2Count);
}
