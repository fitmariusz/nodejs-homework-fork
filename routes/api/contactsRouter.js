const express = require("express");

const controllersIndex = require("../../controlers/contacts/controllersIndex");

const router = express.Router();

router.get("/contacts/", controllersIndex.listContacts);
router.get("/contacts/:contactId", controllersIndex.getContactById);
router.post("/contacts/", controllersIndex.postContact);
router.delete("/contacts/:contactId", controllersIndex.deleteContact);
router.put("/contacts/:contactId", controllersIndex.putContact);
router.patch("/contacts/:contactId/favorite", controllersIndex.patchContact);

module.exports = router;
