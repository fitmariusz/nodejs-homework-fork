const fs = require('fs/promises');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

const readContacts = async (pathFile) => { 
  const data = await fs.readFile(pathFile);
  return JSON.parse(data);
};

const writeContacts = async (newContacts, pathFile) => { 
  const data = JSON.stringify(newContacts);
  await fs.writeFile(pathFile, data, 'utf8');
};

const listContacts = async () => {
  try {
  return await readContacts(contactsPath);
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

const getContactById = async (contactId) => {
try {
    const contacts = await readContacts(contactsPath);
    return contacts.find((contact) => contact.id === contactId) || null;

  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

const removeContact = async (contactId) => {
   try {
    const contacts = await readContacts(contactsPath);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      await writeContacts(contacts, contactsPath);
      return "Contact deleted";
    }
    return "Contact not found. Please try again";
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

const addContact = async (body) => {
  try {
    const contacts = await readContacts(contactsPath);
    const newContact = {
      "id":uuidv4(),...body
    }
    contacts.push(newContact);
    await writeContacts(contacts, contactsPath);
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await readContacts(contactsPath);
 
const index = contacts.findIndex((contact) => contact.id === contactId);
  console.log(index);
  if (index !== -1)
  {
    contacts[index] = { ...contacts[index], ...body };
    writeContacts(contacts, contactsPath)
    return "Contact update"
  }
  else {
    addContact(body)
    return "ok"
    
  }
//   if (!putContact)
//   {
//     putContact.name = name;
//     putContact.email = email;
//     putContact.phone = phone;
//     writeContacts(contacts, contactsPath);
//     return "Contact update";
//   } else {
//     if (!addContact(body))
//     {
//       return "err"
//     }
//     else {
//       return "OK"
//     }
//     }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
