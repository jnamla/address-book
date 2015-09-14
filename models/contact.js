var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contactService = require('../services/contact-service');

var contactSchema = new Schema({
  isPrivate: {type: Boolean, },
  lastName: {type: String, required: 'Please enter your last name'},
  roomNumber: {type: Number, required: 'Please enter your room number', min:[100, 'Not a valid room number']},
  email: {type: String, required: 'Please enter your email'},
  password: {type: String, required: 'Please enter your password'},
  created: {type: Date, default: Date.now}
});

contactSchema.path('email').validate(function(value, next) {
  contactService.findUser(value, function(err, user) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!user);
  });
}, 'That email is already in use');

var Contact = mongoose.model('Contact', contactSchema);

module.exports = {
  Contact: Contact
};