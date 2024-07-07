const { fetchContacts, fetchContactById, removeContact } = require("./serwice");

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

const addContact =  async (req, res, next) => {
  console.log(req.body);
  res.json({ message: 'addContact' })
}

const updateContact = async (req, res, next) => {
  console.log(req.params.contactId);
  console.log(req.body);
  res.json({ message: 'putContact' })
}

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
}
