const express = require('express');


const {
    listContacts,
    getContactById,
    postContact,
    putContact,
    deleteContact,
    patchContact } = require('../../controlers/contacts/controllersIndex');
const {validateProcess} = require('../../validation/validateProcess');
const {contactSchem} = require('../../validation/validationJoi');






const router = express.Router()

router.get('/contacts/', listContacts);
router.get('/contacts/:contactId', getContactById)
router.post('/contacts/',validateProcess(contactSchem),postContact)
router.delete('/contacts/:contactId', deleteContact)
router.put('/contacts/:contactId',validateProcess(contactSchem), putContact)
router.patch('/contacts/:contactId/favorite', patchContact)

module.exports = router
