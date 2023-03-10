const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerMedicalHistory: {
    type: String,
    required: false,
  },
  tattooArtistName: {
    type: String,
    required: true,
  },
  tattooDesign: {
    type: String,
    required: true,
  },
  tattooSize: {
    type: String,
    required: true,
  },
  tattooPlacement: {
    type: String,
    required: true,
  },
  tattooColor: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  bookingTime: {
    type: String,
    required: false,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  depositMethod: {
    type: String,
    required: true,
  },
  depositDeadline: {
    type: Date,
    required: true,
  },
  refundPolicy: {
    type: String,
    required: true,
  },
  cancellationReason: {
    type: String,
    required: false,
  },
  cancellationDate: {
    type: Date,
    required: false,
  },
  aftercareInstructions: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: false
  }
});


const Booking = mongoose.model('booking', bookingSchema)

module.exports = Booking;