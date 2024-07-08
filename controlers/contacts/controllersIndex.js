const { fetchContacts, fetchContactById, removeContact, insertContact, updateContact } = require("./serwice");

const listContacts = async (req, res, next) => { 
    try{
        const contacts = await fetchContacts()
        res.json({ contacts })
    } catch (error) {
        next(error) 
    }
}

const getContactById =  async (req, res, next) => { 
  console.log(req.params.contactId);
//     res.json({ message: 'contactById' })
    try{
        const contact = await fetchContactById(req.params.contactId)
        res.json({ contact })
    } catch (error) {
        next(error) 
    }
}

const deleteContact = async (req, res, next) => {
  console.log(req.params.contactId);
    try{
        const contact = await removeContact(req.params.contactId)
        res.json({ contact })
    } catch (error) {
        next(error) 
    }
}

const postContact =  async (req, res, next) => {
  console.log(req.body);
  try{
        const contact = await insertContact(req.body)
        res.json({ contact })
    } catch (error) {
        next(error) 
    }
}

const putContact = async (req, res, next) => {
  console.log(req.params.contactId);
  console.log(req.body);
   try{
        const contact = await updateContact(req.params.contactId, req.body)
        res.json({ contact })
    } catch (error) {
        next(error) 
    }
}

const patchContact = async (req, res, next) => {
  console.log(req.params.contactId);
  console.log(req.body);
   try{
        const contact = await updateContact(req.params.contactId, req.body)
        res.json({ contact })
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
