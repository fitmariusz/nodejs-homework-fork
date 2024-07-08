const { fetchContacts, fetchContactById, removeContact, insertContact, updateContact } = require("./serwice");
const {contactSchem, favoriteSchem} = require('../../validation/validationJoi');



const listContacts = async (req, res, next) => { 
    try{
        const contacts = await fetchContacts()
        res.json({ status: 'success',
        code: 200,
        data: {
            contacts,
            },
        })
    } catch (error) {
        next(error) 
    }
}

const getContactById =  async (req, res, next) => { 
    try{
        const contact = await fetchContactById(req.params.contactId)
        if(!contact)
        {
            res.status(404).json({message: "Not found"}); 
        } else {
            res.status(200).json(contact); 
        }
    } catch (error) {
        next(error) 
    }
}

const deleteContact = async (req, res, next) => {
    try{
        const contact = await removeContact(req.params.contactId)
        if(contact!=null)
    {
      res.status(200).json({ message: contact }); 
    } else {
      res.status(404).json({message: contact}); 
    }
    } catch (error) {
        next(error) 
    }
}

const postContact =  async (req, res, next) => {
    try {
        const errorJoi = contactSchem.validate(req.body);
        if (errorJoi.error)
        {
            return res.status(400).json({ message: errorJoi.error.details[0].message });
        }
        const contact = await insertContact(req.body)
        if (contact) {
            res.status(201).json(contact); 
        } else {
            res.status(404).json(contact); 
        }
    } catch (error) {
        next(error) 
    }
}

const putContact = async (req, res, next) => {
    try {
        const  errorJoi  = contactSchem.validate(req.body);
        if (errorJoi.error)
        {
            return res.status(400).json({ message: errorJoi.error.details[0].message });
        }
        const contact = await updateContact(req.params.contactId, req.body)
        res.json({ contact })
    } catch (error) {
        next(error) 
    }
}

const patchContact = async (req, res, next) => {
    try {
        const errorJoi = favoriteSchem.validate(req.body);
        if (errorJoi.error)
        {
            return res.status(400).json({message: errorJoi.error.details[0].message});
        }
        const contact = await updateContact(req.params.contactId, req.body)
        if(contact!=null)
        {
            res.status(200).json({ message: contact }); 
        } else {
             res.status(404).json({message: contact}); 
        }
    } catch (error) {
        next(error) 
    }
}

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  patchContact,
}
