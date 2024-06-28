const express = require('express')
const { listContacts,getContactById, addContact, removeContact,} = require("../../models/contacts.js");
// const contacts =  listContacts();
const router = express.Router()

router.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const contacts =  await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'Contact ID' })
  try {
    const searchById = req.params.contactId
    console.log(searchById);
    const contact = await getContactById(searchById);
    if(!contact)
    {
      res.status(404).json({message: "Not found"}); 
      console.log(contact);
      
    } else {
      res.status(200).json(contact); 
    }

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  
  try {
    // const { name, email, phone } = req.body;
    const contact = await addContact(req.body);
    console.log(contact);
    if (contact) {
      console.log(contact);
      res.status(201).json(contact); 
    } else {
      res.status(404).json(contact); 
    }
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
    const id = req.params.contactId
    const contact = await removeContact(id);
    if(!contact)
    {
      res.status(404).json({message: "Not found"}); 
      console.log(contact);
    } else {
      res.status(200).json({"message": "contact deleted"}); 
    }
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
