var companyModel = require('../models/company');
  
exports.addCompany = function(company, next) {
  
  if (!company.informal){
    var newFormalCompany = new companyModel.FormalCompany({
      admin: company.temp.admin,
      country: company.country,
      state: company.state,
      city: company.city,
      postCode: company.postCode,
      streetName: company.streetName,
      name: company.name,
      cDescription: company.cDescription,
      industryType: company.industryType,
      field: company.field,
      website: company.website,
      businessNumber: company.businessNumber,
      created: Date.now()
    });
    
    newFormalCompany.save(function(err, savedCompany) {
      if (!err) {
        return next(null, {success: true, data: savedCompany});
      }  
      next(err);
    });
    
  } else {
    var newInformalCompany = new companyModel.InformalCompany({
      admin: company.temp.admin,
      country: company.country,
      state: company.state,
      city: company.city,
      postCode: company.postCode,
      streetName: company.streetName,
      name: company.name,
      cDescription: company.cDescription,
      created: Date.now()
    });
    
    newInformalCompany.save(function(err, savedCompany) {
      if (!err) {
        return next(null, {success: true, data: savedCompany});
      }  
      next(err);
    });
  }
};

exports.updateCompany = function(query, updatableData, next) {
  
  // Find the company by unique identifier
  this.findCompanyBykey(query, function (err, result) {
    if (err) {
      next(err, result);
    } 
    else {
      if (!result.data) {
        next(null, {success: false, error: "The Company couldnt be found."});
      } else {
        // Removes email data to prevent the update of key fields
        delete updatableData["name"];
        delete updatableData["admin"];
      
        try {
          for (var entry in updatableData) {
            if (updatableData[entry] != undefined) {
              result.data._doc[entry] = updatableData[entry];
            } 
          }  
          result.data.save();
        }
        catch(err) {
            next(err, {success: false , error: "Company not updated"});
        }

        return next(null, {success: true, data: result.data._doc});

      }
    }
  });
};

exports.removeCompany = function(query, next) {
  
  // Find the company by unique identifier
  this.findCompanyBykey(query, function (err, result) {
    if (err) {
      next(err, result);
    } 
    else {
      if (!result.data) {
        next(null, {success: false, error: "The Company couldnt be found."});
      } else {
        
        companyModel.Company.remove({ _id: result.data._doc._id}, function (err, removedCompany) {
        if (!err) {
            return next(null, removedCompany, {success: true, message: "Company removed."});
          }  
          next(err, {success: false , error: "Company not removed."});
        });
      }
    }
  });
};

exports.removeCompanyById = function(query, next) {
  
  // Find the company by id
  companyModel.Company.findByIdAndRemove({_id: query.id}, function (err, result) {
    
    if (err) {
      next(err, result);
    } 
    
    return next(null, {success: true, message: "Company removed."});
  });
  
};
// Find company by defined key
exports.findCompanyBykey= function(query, next) {
  
  // search company by query parameters so far name and admin
  companyModel.Company.findOne({$or:[{_id: query.id},
                      {admin: query.admin, name: query.name}]}, function(err, results) {
    if (err) {
      next(err, {success:false});
    }
    next(err, {success: true, data: results});
  });
  
};

// FindCompany Filters
exports.findCompany = function(parent, filters, next) {
  
  // Regular expresion to simplify the search
  for (var entry in filters) {
    if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "" ) {
        filters[entry] = new RegExp(filters[entry], 'i');
    } else {
      delete filters[entry];  
    }
  }  
  
  for (var entry in parent) {
    filters[entry] = parent[entry];  
  }
  
  companyModel.Company.find(filters, function(err, companies) {
    if (err) {
      next(err);
    } 
    else {
      next(null, {success: true, data: companies});
    }   
  });
};
