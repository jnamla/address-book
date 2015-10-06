var express = require('express');
var router = express.Router();

var company = require('./companies.js');
var contact = require('./contacts.js');
 
/*
 * Routes that can be accessed only by autheticated admins
 */
 
 router.post('/api/companies/search', company.search);
 router.post('/api/companies/create', company.create);
 router.post('/api/companies/update', company.update);
 router.delete('/api/companies/:id/remove', company.removeById);
 router.post('/api/companies/remove', company.remove);
 
 router.post('/api/contacts/search', contact.search);
 router.post('/api/contacts/create', contact.create);
 router.post('/api/contacts/update', contact.update);
 router.post('/api/contacts/remove', contact.remove);
 
/*
 * Routes that can be accessed only by authenticated & authorized admins
 */

/*router.get('/api/v1/admin/users', user.getAll);
 
 */
module.exports = router;