const mongoose = require('mongoose');




const contactSchema = new mongoose.Schema({
    // _id:{type: String},
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  
})

// contactSchema.index({ name: 1, favorite: -1 });


// contactSchema.index({ orderId: 1, orderDate: -1, price: 1 });
// find({orderId: 1}, price: {$gte: 100, $lte: 200}).sort({orderDate: -1});

contactSchema.statics.getAll = function () {
    return Contact.find({});
}

contactSchema.methods.htmlify = function () {
    return `<h3>${this.title}</h3><p>${this.text}</p>`;
}
const Contact = mongoose.model('contact', contactSchema);
      

// Contact.create

module.exports = Contact;




// //git checkout master
// const fs = require('fs/promises');
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
// const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

// const readContacts = async (pathFile) => { 
//   const data = await fs.readFile(pathFile);
//   return JSON.parse(data);
// };

// const writeContacts = async (newContacts, pathFile) => { 
//   const data = JSON.stringify(newContacts);
//   await fs.writeFile(pathFile, data, 'utf8');
// };

// const listContacts = async () => {
//   try {
//   return await readContacts(contactsPath);
//   } catch (error) {
//     console.error("Error fetching contacts: ", error);
//     throw error;
//   }
// }

// const getContactById = async (contactId) => {
// try {
//     const contacts = await readContacts(contactsPath);
//     return contacts.find((contact) => contact.id === contactId) || null;

//   } catch (error) {
//     console.error("Error fetching contacts: ", error);
//     throw error;
//   }
// }

// const removeContact = async (contactId) => {
//    try {
//     const contacts = await readContacts(contactsPath);
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     if (index !== -1) {
//       contacts.splice(index, 1);
//       await writeContacts(contacts, contactsPath);
//       return "Contact deleted";
//     }
//     return "Contact not found. Please try again";
//   } catch (error) {
//     console.error("Error fetching contacts: ", error);
//     throw error;
//   }
// }

// const addContact = async (body) => {
//   try {
//     const contacts = await readContacts(contactsPath);
//     const newContact = {
//       "id":uuidv4(),...body
//     }
//     contacts.push(newContact);
//     await writeContacts(contacts, contactsPath);
//     return contacts;
//   } catch (error) {
//     console.error("Error fetching contacts: ", error);
//     throw error;
//   }
// }

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await readContacts(contactsPath);
//     const index = contacts.findIndex((contact) => contact.id === contactId);
//     if (index !== -1) {
//       contacts[index] = { ...contacts[index], ...body };
//       await writeContacts(contacts, contactsPath)
//       return "Contact update"
//     } else {
//       addContact(body)
//       return "ok"
//     }
//   } catch (error) {
//     console.error("Error fetching contacts: ", error);
//     throw error;
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }