const express = require('express');
const router = express.Router();
const {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
} = require('../controllers/contactControllers');
const validToken = require('../middleware/validateTokenHandler');


router.use(validToken); //add validate for every route
router.route('/').get(getContacts);
router.route('/').post(createContact);
// We can use router.route('/').get(getContacts).post(createContact); 

router.route('/:id').get(getContact);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);

module.exports = router;
