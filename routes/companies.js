var companyService = require('../services/company-service');

var companies = {
  
  search: function(req, res) {
    
    var basicQueryData = {}; 
    
    if (!req.body.temp) {
      basicQueryData = req.query;
    } else {
      basicQueryData = req.body.temp;
      delete req.body.temp;
    }
    
    companyService.findCompany(basicQueryData, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
 
  create: function(req, res, next) {
    companyService.addCompany(req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
 
  update: function(req, res, next) {
    
    var basicQueryData = !req.body.temp ? req.query: req.body.temp;
    
    companyService.updateCompany(basicQueryData, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
 
  remove: function(req, res, next) {
    
    var basicQueryData = !req.body.temp ? req.query: req.body.temp;
    
    companyService.removeCompany(basicQueryData, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
  
  removeById: function(req, res, next) {
    
    companyService.removeCompanyById(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  }
};
 
module.exports = companies;