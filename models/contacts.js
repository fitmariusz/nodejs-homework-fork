
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  // _id:{type: String},
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
});

// contactSchema.index({ name: 1, favorite: -1 });

// contactSchema.index({ orderId: 1, orderDate: -1, price: 1 });
// find({orderId: 1}, price: {$gte: 100, $lte: 200}).sort({orderDate: -1});

contactSchema.statics.getAll = function () {
  return Contact.find({}).lean();
};

contactSchema.methods.htmlify = function () {
  return `<h3>${this.title}</h3><p>${this.text}</p>`;
};
const Contact = mongoose.model("contact", contactSchema);

// Contact.create

module.exports = Contact;
