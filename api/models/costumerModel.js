const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const costumerSchema = new Schema({
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  dob:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    require:true
  },
  email:{
    type: String,
    required: false
  },
  tattoos:[{
    type: String,
    required: false
  }]
})

const Costumer = mongoose.model('Costumer', costumerSchema)

module.exports = Costumer;