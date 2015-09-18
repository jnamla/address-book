var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var companyService = require('../services/company-service');


var companySchema = new Schema({
  isFreeLance: {type: Boolean, default: false},
  name: {type: String, required: 'Please enter the company name'},
  bDescription: {type: String, required: 'Please enter a brief description'},
  email: {type: String, unique:true, index:true, required: 'Please enter your email'},
  industry: {type: String, required: 'Please enter your Industry'},
  street: {type: String, required: 'Please enter your street'},
  city: {type: String, required: 'Please enter your city'},
  state: {type: String, required: 'Please enter your state'},
  country: {type: String, required: 'Please enter your country'},
  postCode: {type: String, required: 'Please enter your post code'},
  owner: {_id: Schema.Types.ObjectId, name: String, email: String},
  members: {type: mongoose.Schema.Types.ObjectId, ref:'Contact'},
  //observers: [{ _id: Schema.Types.ObjectId, name: String, email: String, isInternal:Boolean}],
  disableDate: {type: Date},
  created: {type: Date, default: Date.now}
});

/*
// Unique email validation
companySchema.path('email').validate(function(value, next) {
  companyService.findCompanyById(value, function(err, company) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!company);
  });
}, 'That email is already in use');*/

var Company = mongoose.model('Company', companySchema);

companySchema.pre('save', function (next) {
    var self = this;
    Company.find({email : self.email}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Company retrieve failed."});
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
  Company: Company
};