const express = require('express');
const { listContacts, getContactById, addContact, updateContact, deleteContact } = require('../../controlers/contacts/controllersIndex');

const router = express.Router()

router.get('/contacts/', listContacts);
router.get('/contacts/:contactId', getContactById)
router.post('/contacts/',addContact)
router.delete('/contacts/:contactId', deleteContact)
router.put('/contacts/:contactId', updateContact)

module.exports = router
