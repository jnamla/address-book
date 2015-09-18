var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  fullName: {type: String, required: 'Please enter the full name'},
  position: {type: String, required: 'Please enter the position'},
  phone: {type: String},
  mobile: {type: String, required: 'Please enter the contact mobile number'},
  email: {type: String, unique:true, index:true, required: 'Please enter the oficial email'},
  skype: {type: String, required: 'Please enter the skype'},
  personalEmail: {type: String},
  intensity: {type: String, default: "LOW"},
  stage: {type: String, default: "SUSPECT"},
  disableDate: {type: Date},
  created: {type: Date, default: Date.now}
});

var Contact = mongoose.model('Contact', contactSchema);

var Contact = mongoose.model('Contact', contactSchema);

contactSchema.pre('save', function (next) {
    var self = this;
    Contact.find({email : self.email}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Contact retrieve failed."});
        }else{                
          if (!results.length){
              next();
          }else{  
              next(new Error("That email is already in use!"));
          }
        }
    });
}) ;

module.exports = {
  Contact: Contact
};