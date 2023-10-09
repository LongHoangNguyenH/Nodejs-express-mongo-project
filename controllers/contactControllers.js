// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = (req, res) => {
    res.status(200).json({message: "Get all contacts"})
};

// @desc Create contact
// @route GET /api/contacts/:id
// @access public
const createContact = (req, res) => {
    console.log("",req.body);
    const {name, email, phone} = req.body;
    if( !name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    } 
    res.status(201).json({message:"Create Contact"});
};

// @desc  Get contact
// @route GET /api/contacts/:id
// @access public
const getContact = (req, res) => {
    res.status(200).json({message:`Get Contact for ${req.params.id}`});
};

// @desc Update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = (req, res) => {

    res.status(200).json({message:`Update Contact for ${req.params.id}`});
};

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = (req, res) => {
    res.status(200).json({message:`Delete Contact for ${req.params.id}`});
};

// allow import getContact from another nodejs files
module.exports = {
    getContact, 
    createContact,
    getContacts,
    updateContact,
    deleteContact
};