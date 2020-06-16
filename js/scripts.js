// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [];
  this.currentID = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignID();
  this.contacts.push(contact);
}

AddressBook.prototype.assignID = function() {
  this.currentID += 1;
  return this.currentID;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts --------
function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.addresses = {};
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.addAddress = function(address) {
  this.addresses = address;
}

//Business Logic for Addresses 
function Address(personal, work, vacation) {
  this.personal = personal;
  this.work = work;
  this.vacation = vacation;
}

// User Interface Logic ---------


function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId, addressBook) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".personal-address").html(contact.addresses.personal);
  $(".work-address").html(contact.addresses.work);
  $(".vacation-address").html(contact.addresses.vacation);
  if(contact.addresses.personal === "") {
    $(".personal-address").parent().hide();
  }
  if(contact.addresses.work === "") {
    $(".work-address").parent().hide();
  }
  if(contact.addresses.vacation === "") {
    $(".vacation-address").parent().hide();
  }
  
  console.log(contact.addresses.vacation);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}


function attachContactListeners(addressBook) {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id, addressBook);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  let addressBook = new AddressBook();
  attachContactListeners(addressBook);
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedPersonalAddress = $("input#new-personal-address").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    const inputtedVacationAddress = $("input#new-vacation-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-personal-address").val("");
    $("input#new-work-address").val("");
    $("input#new-vacation-address").val("");
    
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);
    let newAddresses = new Address(inputtedPersonalAddress, inputtedWorkAddress, inputtedVacationAddress);
    newContact.addAddress(newAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});