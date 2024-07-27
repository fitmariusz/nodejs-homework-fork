const Contact = require("../../models/contacts");

const fetchContacts = async () => {
  return Contact.getAll();
};

const fetchContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  const result = Contact.findByIdAndDelete(contactId);
  return result;
};

const insertContact = async (body) => {
  const { name, email, phone, favorite } = body;
  return Contact.create({
    name,
    email,
    phone,
    favorite,
  });
};

const updateContact = async (contactId, body) => {
  const { name, email, phone, favorite } = body;
  const value = Contact.findOneAndUpdate(
    { _id: contactId },
    {
      name,
      email,
      phone,
      favorite,
    }
  );
  return value;
};

const updateStatusContact = async (contactId, body) => {
  // const { favorite } = body;
  const { favorite } = body;
  return Contact.findOneAndUpdate(
    { _id: contactId },
    {
      favorite,
    }
  );
};

module.exports = {
  fetchContacts,
  fetchContactById,
  removeContact,
  insertContact,
  updateContact,
  updateStatusContact,
};
