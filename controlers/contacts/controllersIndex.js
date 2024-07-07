const listContacts = async (req, res, next) => { 
  console.log(req.body);
  res.json({ message: 'Allcontacts' })
}

const getContactById =  async (req, res, next) => { 
  console.log(req.params.contactId);
  res.json({ message: 'contactById' })
}

const removeContact = async (req, res, next) => {
  console.log(req.params.contactId);
  res.json({ message: 'Delete contact' })
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
  removeContact,
  addContact,
  updateContact,
}
