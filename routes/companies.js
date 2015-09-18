var express = require('express');
var router = express.Router();
var companyService = require('../services/company-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET redirect to the create page. */
router.get('/create', function(req, res, next) {
  var vm = {
    title: 'Create a company'
    
  };
  //res.render('companies/create', vm);
  res.send('in get/create');
});

/* POST company creation. */
router.post('/create', function(req, res, next) {
  companyService.addCompany(req.body, function(err, companyId) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, error: "Create company process failed."});
    }
    //res.redirect('/contacts');
    res.json(companyId);
  });
});

router.post('/update', function(req, res, next) {
  
  companyService.updateCompany(req.body, function(err, company) {
    if (err) {
      console.log(err);
     res.status(500).json({success: false, error: "Update company process failed."});
    }
    //res.redirect('/contacts');
    res.json(company);
  });
});

router.post('/remove', function(req, res, next) {
  companyService.removeCompany(req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false, error: "Delete company process failed."});
    }
    //res.redirect('/contacts');
    res.json(result);
  });
});

// Search companies by name for autocomplete
router.get('/search_company_name', function(req, res, next) {
  
  companyService.searchCompanyName(req.query.name, function(err, foundCompanies) {
    if (err) {
      console.log(err);
      return res.status(500).json({error: 'Failed to retrieve companies'});
    }
    
    res.json(foundCompanies);
  });
});

// Search companies by filters
router.post('/search', function(req, res, next) {
  
  companyService.findCompany(req.body, function(err, foundCompanies) {
    if (err) {
      console.log(err);
      return res.status(500).json({error: 'Failed to retrieve companies'});
    }
    
    res.json(foundCompanies);
  });
});

module.exports = router;