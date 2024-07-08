const express = require('express');
const {
    listContacts,
    getContactById,
    postContact,
    putContact,
    deleteContact,
    patchContact } = require('../../controlers/contacts/controllersIndex');

const router = express.Router()

router.get('/contacts/', listContacts);
router.get('/contacts/:contactId', getContactById)
router.post('/contacts/',postContact)
router.delete('/contacts/:contactId', deleteContact)
router.put('/contacts/:contactId', putContact)
router.patch('/contacts/:contactId/favorite', patchContact)

module.exports = router
