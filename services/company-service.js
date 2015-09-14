var Company = require('../models/company').Company;

exports.addCompany = function(company, next) {
  var newCompany = new Company({
    isPrivate: company.isPrivate,
    name: company.name,
    bDescription: company.bDescription,
    email: company.email.toLowerCase(),
    uniqueId: company.uniqueId.toLowerCase(),
    industry: company.industry,
    street: company.street,
    city: company.city,
    state: company.state,
    country: company.country,
    postCode: company.postCode,
    //addedBy: company.addedBy, should be obtainded from the session
    created: company.created
  });
  
  newCompany.save(function(err, savedCompany) {
    if (!err) {
      return next(null, savedCompany._id);
    }  
    next(err);
  });
};

exports.updateCompany = function(companyId, updatableData, next) {
  // Verifica actualización de datos enviados
  Company.findByIdAndUpdate(companyId, { $set: updatableData }, function (err, updatedCompany) {
  if (!err) {
      return next(null, updatedCompany);
    }  
    next(err);
  });
};

exports.removeCompany = function(id, next) {
  Company.findOne({_id:id}, function (err) {
    if (err) {
      next(err);
    } 
    else {
      next(null, {success:true})
    }
  });
};

exports.findCompany = function(uniqueId, next) {
  Company.findOne({uniqueId: uniqueId.toLowerCase()}, function(err, company) {
    next(err, company);    
  });
};

exports.searchCompanyName = function(name, next) {
  var re = new RegExp(name, 'i');

  Company.find({name: re}, function(err, companies) {
    next(err, companies);    
  });
};