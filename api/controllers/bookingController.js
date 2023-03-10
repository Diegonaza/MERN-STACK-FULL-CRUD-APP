const Booking = require('../models/bookingModel.js')
const mongoose = require('mongoose')
const multer  = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/design')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
  }
})

const upload = multer({ storage: storage })


//delete image from server
const DeleteImg = async(req,res)=>{
  
  
    fs.unlink("./public/images/design"+req.body.path,(err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File was deleted`);
      }
      
    })
      
  
  
  res.status(200).send("deleted from server")
}

  



//get all bookings
const GetBookings = async(req,res)=>{
  const bookings = await Booking.find({}).sort({bookingDate:-1})
  res.status(200).json(bookings)
}

//get a single Booking
/*
const GetBooking = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'customer could not be found'})
  }

  const booking = await Booking.findById(id)

  

  if(!booking){
    return res.status(404).json({error: "Could not find booking"})
  }

  res.status(200).json(booking)
}
*/

//Get a single customer by name
const GetBooking = async(req,res)=>{
  const {customerName} = req.params

  const booking = await Customer.find({customerName: { $regex: new RegExp(customerName, 'i') }})

  if(!booking){
    return res.status(404).json({error: "No booking found with given name"})
  }

  res.status(200).json(booking)
}

// POST a new customer
const CreateBooking =async (req,res)=>{
  
  const {customerName,customerEmail,customerPhone,customerMedicalHistory,tattooArtistName,tattooDesign,tattooSize,tattooPlacement,tattooColor,bookingDate,bookingTime,depositAmount,depositMethod,depositDeadline,refundPolicy,cancellationReason,cancellationDate,aftercareInstructions,notes,imgURL} = req.body
  /*
  x.forEach(CheckFields)
  
  let emptyFields = []

  function CheckFields(field){
    if(!field){
      emptyFields.push(Object.keys(field)[0].toString())
    }
  }

  
  if(emptyFields.length>0){
    return res.status(400).json({error: 'Please fill in all required fields', emptyFields})
  }
  */
    console.log(req.body)
    try{
      
      const booking = await Booking.create({customerName,customerEmail,customerPhone,customerMedicalHistory,tattooArtistName,tattooDesign,tattooSize,tattooPlacement,tattooColor,bookingDate,bookingTime,depositAmount,depositMethod,depositDeadline,refundPolicy,cancellationReason,cancellationDate,aftercareInstructions,notes,imgURL})
      res.status(200).json(booking)
    }catch(error){
      res.status(400).json({error: error.message})
      
    }
    
}

//Delete a customer
const DeleteBooking = async(req,res)=>{
  const{id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'booking could not be found'})
  }

  const booking = await Booking.findOneAndDelete({_id: id})

  if(!booking){
    return res.status(404).json({error:'could not find booking'})
  }
  res.status(200).json(booking)
}

//Update a customer
const UpdateBooking = async(req,res)=>{
  const{id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'booking could not be found'})
  }

  const  booking = await Booking.findOneAndUpdate({_id: id},{
    ...req.body
  })

  if(!booking){
    return res.status(404).json({error:'could not find booking'})
  }
  res.status(200).json(booking)
}



module.exports = {
  GetBookings,
  GetBooking,
  CreateBooking,
  DeleteBooking,
  UpdateBooking,
  DeleteImg,
  upload,
  storage
  

}