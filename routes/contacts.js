const express = require('express');
const router = express();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

//Read (Get) records from database
router.get('/', contactsController.getAllData);
router.get('/:id', contactsController.getSingleData);
router.post('/', validation.saveContact, contactsController.createContact);
router.put('/:id', validation.saveContact, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;