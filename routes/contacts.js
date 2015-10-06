var contactService = require('../services/contact-service');

var contacts = {
  
  search: function(req, res) {
    
    var basicQueryData = {}; 
    
    if (!req.body.temp) {
      basicQueryData = req.query;
    } else {
      basicQueryData = req.body.temp;
      delete req.body.temp;
    }
    
    contactService.findCompany(basicQueryData, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
 
  create: function(req, res, next) {
    contactService.addContact(req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
 
  update: function(req, res, next) {
    
    var basicQueryData = !req.body.temp ? req.query: req.body.temp;
    
    contactService.updateContact(basicQueryData, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
 
  remove: function(req, res, next) {
    
    var basicQueryData = !req.body.temp ? req.query: req.body.temp;
    
    contactService.removeCompany(basicQueryData, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  },
  
  removeById: function(req, res, next) {
    
    contactService.removeCompanyById(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err});
      }
      
      res.json(results);
    });
  }
};
 
module.exports = contacts;