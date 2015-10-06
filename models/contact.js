var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({

  company:{type: mongoose.Schema.Types.ObjectId, ref:'Company' , required: "This contact should belong to a company"}, // Company which owns this contact
  
  name: {type: String, required: 'Please enter the name'}, 
  position: {type: String, required: 'Please enter the position'},
  
  contactNumber: {type: String, required: 'Please enter the contact number'},
  altContactNumber: {type: String},
  email: {type: String, required: 'Please enter the email'},
  webPreferedMedia: {type: String, required: 'Please enter the web prefered media'},
  
  created: {type: Date}
});

var Contact = mongoose.model('Contact', contactSchema);

// Pre save validations
contactSchema.pre('save', function (next) {
    var self = this;
    Contact.find({name : self.name, email: self.contactNumber, company: self.company}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Contact retrieve failed"});
        }else{                
          if (!results.length){
              next();
          }else{  
              next(new Error("That contact name and number are already in use for another contact in this organization!"));
          }
        }
    });
});

module.exports = {
  Contact: Contact
};