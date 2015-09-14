var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var companyService = require('../services/company-service');


var companySchema = new Schema({
  isPrivate: {type: Boolean, default: false},
  name: {type: String, required: 'Please enter the company name'},
  bDescription: {type: String, required: 'Please enter a brief description'},
  email: {type: String, required: 'Please enter your email'},
  //uniqueId: {type: String, required: 'Please enter your identification'},
  industry: {type: String, required: 'Please enter your Industry'},
  street: {type: String, required: 'Please enter your street'},
  city: {type: String, required: 'Please enter your city'},
  state: {type: String, required: 'Please enter your state'},
  country: {type: String, required: 'Please enter your country'},
  postCode: {type: String, required: 'Please enter your post code'},
  //addedBy: userReferenceSchema,
  created: {type: Date, default: Date.now}
});

companySchema.path('name').validate(function(value, next) {
  companyService.findCompany(value, function(err, company) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!company);
  });
}, 'That name is already in use');

var Company = mongoose.model('Company', companySchema);

module.exports = {
  Company: Company
};