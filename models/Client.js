const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
  
    nom: {
        type: String,
        required: true
    },
    codeActivation: {
        type: String,
        required: true
    },
  
    url: {
        type: String,
        required: true, 

    },

    email: {
        type: String,
        required: true, 

    },

     
 


});







module.exports = mongoose.model('client', dataSchema);