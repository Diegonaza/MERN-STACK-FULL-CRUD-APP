const Customer = require('../models/customerModel.js')
const mongoose = require('mongoose')
const multer  = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
  }
})

const upload = multer({ storage: storage })


//delete image from server
const DeleteImg = async(req,res)=>{
  
  
    fs.unlink("./public/images/"+req.body.path,(err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File was deleted`);
      }
      
    })
      
  
  
  res.status(200).send("deleted from server")
}

  



//get all customers
const GetCustomers = async(req,res)=>{
  const customers = await Customer.find({}).sort({fname:-1})
  res.status(200).json(customers)
}

//get a single customer

const GetCustomer = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'customer could not be found'})
  }

  const customer = await Customer.findById(id)

  

  if(!customer){
    return res.status(404).json({error: "Could not find customer"})
  }

  res.status(200).json(customer)
}

//Get a single customer by name
const GetCustomerByName = async(req,res)=>{
  const {fname} = req.params

  const customer = await Customer.find({fname: { $regex: new RegExp(fname, 'i') }})

  if(!customer){
    return res.status(404).json({error: "No customer found with given name"})
  }

  res.status(200).json(customer)
}

// POST a new customer
const CreateCustomer =async (req,res)=>{
  
  const {fname,lname,dob,phone,email} = req.body
  const tattoos = [{
    name:req.body.tattooname,
    filepath: req.body.path
  }]

  
  let emptyFields = []

  if(!fname){
    emptyFields.push('First Name')
    
  }
  if(!lname){
    emptyFields.push('Last Name')
  }
  if(!dob){
    emptyFields.push('Date of Birth')
  }
  if(!phone){
    emptyFields.push('Phone Number')
  }
  if(emptyFields.length>0){
    return res.status(400).json({error: 'Please fill in all required fields', emptyFields})
  }
  
    try{
      
      const customer = await Customer.create({fname,lname,dob,phone,email,tattoos})
      res.status(200).json(customer)
    }catch(error){
      res.status(400).json({error: error.message})
      
    }
    
}

//Delete a customer
const DeleteCustomer = async(req,res)=>{
  const{id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'customer could not be found'})
  }

  const customer = await Customer.findOneAndDelete({_id: id})

  if(!customer){
    return res.status(404).json({error:'could not find customer'})
  }
  res.status(200).json(customer)
}

//Update a customer
const UpdateCustomer = async(req,res)=>{
  const{id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'customer could not be found'})
  }

  const  customer = await Customer.findOneAndUpdate({_id: id},{
    ...req.body
  })

  if(!customer){
    return res.status(404).json({error:'could not find customer'})
  }
  res.status(200).json(customer)
}



module.exports = {
  CreateCustomer,
  GetCustomer,
  GetCustomers,
  DeleteCustomer,
  UpdateCustomer,
  GetCustomerByName,
  DeleteImg,
  upload,
  storage
  

}