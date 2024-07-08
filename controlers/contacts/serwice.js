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

const insertContact = async (body) => {
    console.log(body);
    const { name, email, phone, favorite } = body;
    return Contact.create({
        name,
        email,
        phone,
        favorite
    });

}
const updateContact = async (contactId, body) => {
    const { name, email, phone, favorite } = body
   const value =  Contact.findOneAndUpdate({ _id: contactId }, {
        name: name,
        email: email,
        phone: phone,
        favorite:favorite,

   });
    return value
}

const updateStatusContact = async (contactId, body) => {
    console.log(contactId);
    console.log(body);
    const { favorite } = body
    return Contact.findOneAndUpdate({ _id: contactId }, {
        favorite:favorite,
    });
}


module.exports = {
    fetchContacts,
    fetchContactById,
    removeContact,
    insertContact,
    updateContact,
    updateStatusContact,
    // updateTask,
    // removeTask
};