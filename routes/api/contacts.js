const express = require('express')

const router = express.Router()

router.get('/contacts/', async (req, res, next) => {
  res.json({ message: 'Allcontacts' })
})

router.get('/contacts/:contactId', async (req, res, next) => {
  res.json({ message: 'contactById' })
})

router.post('/contacts/', async (req, res, next) => {
  res.json({ message: 'addContact' })
})

router.delete('/contacts/:contactId', async (req, res, next) => {
  console.log(req.params.contactId);
  res.json({ message: 'Delete contact' })
})

router.put('/contacts/:contactId', async (req, res, next) => {
  console.log(req.params.contactId);
  console.log(req.body);
  res.json({ message: 'putContact' })
})

module.exports = router
