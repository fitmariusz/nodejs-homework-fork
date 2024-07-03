const express = require('express');
const router = express.Router();

const { getContacts,
    // getContactById,
    // addContact,
    // putContact,
    // patchContact,
    // deleteContact
} = require('../controllers/contacts/index.js');

router.get('/contacts', getContacts) 
// router.get('/contacts/:id', getContactById) 
// router.post('/contacts/', addContact);
// router.put('/contacts/:id', putContact);
// router.patch('/contacts/:id', patchContact);
// router.delete('/contacts/:id', deleteContact);

module.exports = router;