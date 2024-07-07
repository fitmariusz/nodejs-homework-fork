const Contact = require("../../models/contacts");

const fetchContacts = async () => {
    return Contact.getAll();
}

const fetchContactById = async (contactId) => {
    return Contact.findById(contactId);
}

const removeContact = async (contactId) => {
    return Contact.findByIdAndDelete(contactId);
}



module.exports = {
    fetchContacts,
    fetchContactById,
    removeContact,
    // insertContact,
    
    // updateTask,
    // removeTask
};