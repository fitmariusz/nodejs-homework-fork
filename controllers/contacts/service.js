// const {mongoose } = require("mongoose");
const Contact = require("../../models/contacts");
// const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Types;


const fetchContacts = async () => {

    return Contact.getAll();
}

const fetchContactById = (id) => {
    console.log(typeof(id));
// console.log(Contact.findByIdAndDelete(id));
    return Contact.findOne({_id:id});
}

const insertContact = (body) => {
    console.log(body);
    const { name, email, phone, favorite } = body;
    return Contact.insertMany({
        name,
        email,
        phone,
        favorite
    });

}

module.exports = {
    fetchContacts,
    fetchContactById,
    insertContact,
    // updateTask,
    // removeTask
};