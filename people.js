const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idnum: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    peopleImage: {type: String}
});

module.exports = mongoose.model('People', peopleSchema);