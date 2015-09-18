var Company = require('../models/company').Company;

exports.addCompany = function(company, next) {
  var newCompany = new Company({
    isFreeLance: company.isFreeLance,
    name: company.name,
    bDescription: company.bDescription,
    email: company.email.toLowerCase(),
    industry: company.industry,
    street: company.street,
    city: company.city,
    state: company.state,
    country: company.country,
    postCode: company.postCode,
    //owner: user,
    disableDate: company.disableDate,
    created: company.created
  });
  
  newCompany.save(function(err, savedCompany) {
    if (!err) {
      return next(null, {success: true, company: savedCompany});
    }  
    next(err);
  });
};

exports.updateCompany = function(updatableData, next) {
  
  // Find the company by unique identifier
  this.findCompanyBykey(updatableData, function (err, result) {
    if (err) {
      next(err, result);
    } 
    else {
      if (!result.company) {
        next(null, {success:false, error: "The Company couldnt be found."});
      } else {
        // Removes email data to prevent the update of that field
        delete updatableData["email"];
      
        Company.update({ _id: result.company._id}, {$set: updatableData}, function (err, updatedCompany) {
        if (!err) {
            return next(null, updatedCompany, {success:true, company: updatedCompany});
          }  
          next(err, {success:false , error: "Company not updated"});
        });
      }
    }
  });
};

exports.removeCompany = function(keyValues, next) {
  // Find the company by unique identifier
  this.findCompanyBykey(keyValues, function (err, result) {
    if (err) {
      next(err, result);
    } 
    else {
      if (!result.company) {
        next(null, {success:false, error: "The Company couldnt be found."});
      } else {
      
        Company.update({ _id: result.company._id}, {$set: {disableDate: new Date()}}, function (err, updatedCompany) {
        if (!err) {
            return next(null, updatedCompany, {success:true, message: "Company removed."});
          }  
          next(err, {success:false , error: "Company not removed."});
        });
      }
    }
  });
};

// Find company by defined key
exports.findCompanyBykey= function(data, next) {
  
  Company.findOne({email: data.email.toLowerCase()}, function(err, company) {
    if (err) {
      next(err, {success:false});
    }
    next(err, {success:false, company: company});
  });
  
};

// FindCompany Filters
exports.findCompany = function(filters, next) {
  
  // Regular expresion to simplify the search
  for (var entry in filters) {
    if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "") {
      filters[entry] = new RegExp(filters[entry], 'i');
    } else {
      delete filters[entry];  
    }
  }  
  
  filters['disableDate'] = null;
  
  Company.find(filters, function(err, companies) {
    if (err) {
      next(err);
    } 
    else {
      next(null, {success: true, companies: companies});
    }   
  });
};

exports.searchCompanyName = function(name, next) {
  
  var re = new RegExp(name, 'i');

  Company.find({name: re, disableDate:null}, function(err, companies) {
    if (err) {
      next(err);
    } 
    else {
      next(null, {success: true, companies: companies});
    }    
  });
};