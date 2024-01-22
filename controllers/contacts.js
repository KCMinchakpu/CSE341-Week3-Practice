const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) all contacts in the database
const getAllData = async (req, res) => {
      const result = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .find();
        result.toArray().then((contacts) => {
            if (err) {
                res.status(400).json({ message: err });
              }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    };

//Read (GET) one contact (based on Id) in the database
const getSingleData = async (req, res) => { 
         const contactId = new ObjectId(req.params.id);
        const result = await mongodb            
            .getDatabase()
            .db()
            .collection('contacts')
            .find({ _id: contactId});
        result.toArray().then((contacts) => {
            if (err) {
                res.status(400).json({ message: err });
              }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    };

//Create (POST) a new contact
const createContact = async (req, res, next) => {
        //New Contact Info
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        //Connect to database
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .insertOne(newContact);
        if(resultBack.acknowledged) {
            res.status(201).json(resultBack);
        } else {
            res.status(500).json(resultBack.error || 'Sorry. Contact was not created.');
        }
    };
//Update (PUT) an old contact
const updateContact = async (req, res, next) => {
        const UserId = new ObjectId(req.params.id);
        const updatedInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .replaceOne({ _id: UserId}, updatedInfo);
        console.log(resultBack.modifiedCount + 'document(s) were updated');
        if(resultBack.modifiedCount > 0) {
            res.status(204).send(resultBack.modifiedCount + "document(s) were updated.");
        } else {
            res.status(500).json(resultBack.error || 'Sorry. New information could not be updated.');
        }
   };

//Delete (DELETE) a contact
const deleteContact = async (req, res, next) => {
        const UserId = new ObjectId(req.params.id);
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .deleteOne({ _id: UserId}, true);
        console.log(resultBack.deletedCount + 'document(s) were deleted.');
        if(resultBack.acknowledged) {
            res.status(200).send(resultBack.deletedCount + "document(s) were deleted.");
        } else {
            res.status(500).json(resultBack.error || 'Sorry. Information was not deleted.');
        }
   };

module.exports = { 
    getAllData, 
    getSingleData,
    createContact,
    updateContact,
    deleteContact 
};