var Contact = require('../models/contact').Contact;

exports.addContact = function(contact, next) {
  
  var newContact = new Contact({
    
  company: contact.company,
  name: contact.name,
  position: contact.position,
  contactNumber: contact.contactNumber,
  altContactNumber: contact.altContactNumber,
  email: contact.email.toLowerCase(),
  webPreferedMedia: contact.webPreferedMedia,
  created: contact.created
  });
  
  newContact.save(function(err, savedContact) {
    if (!err) {
      return next(null, {success: true, contact: savedContact});
    }  
    next(err);
  });
};

exports.updateContact = function(query, updatableData, next) {

  // Find the contact by unique identifier
  this.findContactBykey(query, function (err, result) {
    if (err) {
      next(err, result);
    } 
    else {
      if (!result.data) {
        next(null, {success:false, error: "The Contact couldnt be found."});
      } else {
        // Removes email data to prevent the update of that field
        delete updatableData["name"];
        delete updatableData["email"];
        delete updatableData["company"];
        
        Contact.update({ _id: result.data._id}, {$set: updatableData}, function (err, updatedContact) {
        if (!err) {
            return next(null, updatedContact, {success:true, data: updatedContact});
          }  
          next(err, {success:false , error: "Contact not updated"});
        });
      }
    }
  });
};

exports.removeContact = function(query, next) {
  // Find the contact by unique identifier
  this.findContactBykey(query, function (err, result) {
    if (err) {
      next(err, result);
    } 
    else {
      if (!result.contact) {
        next(null, {success:false, error: "The Contact couldnt be found."});
      } else {
      
        Contact.remove({ _id: result.data._id}, function (err, updatedContact) {
        if (!err) {
            return next(null, updatedContact, {success:true, message: "Contact removed."});
          }  
          next(err, {success:false , error: "Contact not removed."});
        });
      }
    }
  });
};

// Find contact by defined key
exports.findContactBykey= function(query, next) {
  
  Contact.findOne({$or:[{_id: query.id},
                      {company: query.company, email: query.email.toLowerCase()}]}, function(err, contact) {
    if (err) {
      next(err, {success:false});
    }
    next(err, {success:false, data: contact._doc});
  });
};

// FindContact Filters
exports.findContact = function(parent, filters, next) {
  
  // Regular expresion to simplify the search
  for (var entry in filters) {
    if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "") {
      filters[entry] = new RegExp(filters[entry], 'i');
    } else {
      delete filters[entry];  
    }
  }  
  
  
  for (var entry in parent) {
    filters[entry] = parent[entry];  
  }
  
  Contact.find(filters, function(err, companies) {
    if (err) {
      next(err);
    } 
    else {
      next(null, {success: true, data: companies});
    }   
  });
};