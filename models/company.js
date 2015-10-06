var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId

var companySchema = new Schema({
  
  admin: {type: mongoose.Schema.Types.ObjectId, ref:'Admin'}, // Person who created the Company in the address book
  
  contacts:[{type: mongoose.Schema.Types.ObjectId, ref:'Contact'}], // Contacts related to this company
   
  country: {type: String, required: 'Please enter your country'},
  state: {type: String, required: 'Please enter your state'},
  city: {type: String, required: 'Please enter your city'},
  streetName: {type: String, required: 'Please enter the street name'},
  postCode: {type: String, required: 'Please enter your post code'},
  name: {type: String, required: 'Please enter the company or group name'},
  cDescription: {type: String, required: 'Please enter a brief description'},
  created: {type: Date}
  
}, {collection : 'companies', discriminatorKey : '_type' });

var formalSchema = companySchema.extend({
  industryType: {type: String, required: 'Please enter your Industry'},
  businessNumber: {type: String, required: 'Please enter your business number'},
  field: {type: String, required: 'Please enter your field'},
  website: {type: String, required: 'Please enter reference website'}
});

var informalSchema = companySchema.extend({
});

var Company = mongoose.model('Company', companySchema);
var FormalCompany = mongoose.model('Formal', formalSchema);
var InformalCompany = mongoose.model('Informal', informalSchema);

// Pre save formal validations
formalSchema.pre('save', function (next) {
    var self = this;
    FormalCompany.find({name : self.name, 'admin': self.admin}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Company retrieve failed."});
        }else{                
          if (!results.length){
              next();
          }else{  
              next(new Error("That company is already registered for this admin!"));
          }
        }
    });
});

// Pre save informal validations
informalSchema.pre('save', function (next) {
    var self = this;
    InformalCompany.find({name : self.name, 'admin': self.admin}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Company retrieve failed."});
        }else{                
          if (!results.length){
              next();
          }else{  
              next(new Error("That company is already registered for this admin!"));
          }
        }
    });
});

module.exports = {
  Company: Company,
  FormalCompany: FormalCompany,
  InformalCompany: InformalCompany,
  variables: {ObjectId:ObjectId}
};