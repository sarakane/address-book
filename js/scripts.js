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

// Business Logic for Contacts --------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}