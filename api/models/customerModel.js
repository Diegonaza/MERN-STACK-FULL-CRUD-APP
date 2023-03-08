const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tattooSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  }
});

const customerSchema = new Schema({
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
  tattoos:[tattooSchema]
})

const Customer = mongoose.model('customer', customerSchema)

module.exports = Customer;