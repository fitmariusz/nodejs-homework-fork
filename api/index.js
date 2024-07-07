const express = require('express');
const router = express.Router();

const { getContacts,
    getContactById,
    // addContact,
    putContact,
    // patchContact,
    // deleteContact
} = require('../controllers/contacts/index.js');
const { insertContact } = require('../controllers/contacts/service.js');

router.get('/contacts', getContacts) 
router.get('/contacts/:id', getContactById) 
router.post('/contacts/', async (res, req, next) => {
    try {
        // const { name } = req.body
        console.log(req.body);
        const result = await insertContact(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error)
    }
}
);
router.put('/contacts/:id', putContact);
// router.patch('/contacts/:id', patchContact);
// router.delete('/contacts/:id', deleteContact);

module.exports = router;