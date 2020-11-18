const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const people = require('../models/people');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  //Upload an image but leave it encoded becaause its personal Info
 const fileFilter = (req, file, cb) => {
     //WHich type of  files are allowed to be uploaded
     if (file.mimetype =='image/jpeg' || file.mimetype == 'image/png' ){


     cb(null, false);}
     else {
     cb(null, true ); }
 }


  const upload = multer({dest: 'uploads/', limits: {fileFilter: fileFilter }} );
const People = require('../models/people');

router.get("/", (req, res, next) => {
    People.find().select('_id idnum name surname peopleImage').exec().then(docs => {
        const response = {
            count: docs.length,
            people: docs.map(doc => {
                return {
                    idnum: doc.idnum,
                    name: doc.name,
                    surname: doc.surname,
                    peopleImage: doc.peopleImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/people/' + doc._id
                    }
                }
            })
        }
        if (docs.length >= 0) {
            res.status(200).json(response);
        }else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post("/", checkAuth ,  upload.single('peopleImage'),  (req, res, next) => {
    console.log(req.file);
    const people = new People({
        _id: new mongoose.Types.ObjectId(),
        idnum: req.body.idnum,
        name: req.body.name,
        surname: req.body.surname,
    peopleImage: req.file.path 
    });
    people.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created person successfully',
            createdPerson: {
                idnum: result.idnum,
                name: result.name,
                surname: result.surname,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/people/' + result._id
                }
            } 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

router.get('/:_id', (req, res, next) => {
    const id = req.params._id;
    People.findById(id).select('idnum name surname _id peopleImage').exec().then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                people: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/people'
                }
            });
        }else{
            res.status(404).json({message: 'No valid entry found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch("/:_id", checkAuth, (req, res, next) => {
    const id = req.params._id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    People.update({_id: id}, { $set: updateOps}).exec().then(result => {
        res.status(200).json({
            message: 'Person updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/people/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete("/:_id", checkAuth, (req, res, next) => {
    const id = req.params._id;
    People.remove({_id: id}).exec().then(result => {
        res.status(200).json({
            message: 'Person deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/people',
                body: {idnum: 'Number', name:'String', surname: 'String'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});




module.exports = router;