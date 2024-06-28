const express = require('express')
const { listContacts,getContactById, addContact, removeContact,updateContact,} = require("../../models/contacts.js");
// const contacts =  listContacts();
const router = express.Router()

router.get('/', async (req, res, next) => {
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
    const contact = await getContactById(req.params.contactId);
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
     const result = await removeContact(req.params.contactId);
     console.log(result);
    if(result==="Contact deleted")
    {
      res.status(200).json({ message: result }); 
    } else {
      
      res.status(404).json({message: result}); 
    }
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
     const result = await updateContact(req.params.contactId, req.body);
    if(result==="Contact update")
    {
      res.status(200).json({ message: result }); 
    } else {
      if(result==='err'){ res.status(404).json({ message: "missing fields"}); } 
      else {
        res.status(201).json({ message: "Add Contact" });
      }
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router
