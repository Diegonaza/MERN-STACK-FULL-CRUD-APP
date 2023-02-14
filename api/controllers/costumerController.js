const Costumer = require('../models/costumerModel.js')
const mongoose = require('mongoose')

//get all costumers
const getCostumers = async(req,res)=>{
  const costumers = await Costumer.find({}).sort({fname:-1})
  res.status(200).json(costumers)
}

//get a single costumer

const getCostumer = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Costumer could not be found'})
  }

  const costumer = await Costumer.findById(id)

  

  if(!costumer){
    return res.status(404).json({error: "Could not find costumer"})
  }

  res.status(200).json(costumer)
}

//Get a single costumer by name
const getCostumerByName = async(req,res)=>{
  const {fname} = req.params

  console.log(fname)

  const costumer = await Costumer.find({fname: { $regex: new RegExp(fname, 'i') }})

  

  if(!costumer){
    return res.status(404).json({error: "No costumer found with given name"})
  }

  res.status(200).json(costumer)
}

// POST a new costumer
const createCostumer = async (req,res)=>{
  const {fname,lname,dob,phone,email,tattoos} = req.body
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
      const costumer = await Costumer.create({fname,lname,dob,phone,email,tattoos})
      res.status(200).json(costumer)
    }catch(error){
      res.status(400).json({error: error.message})
    }
}

//Delete a costumer
const deleteCostumer = async(req,res)=>{
  const{id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Costumer could not be found'})
  }

  const costumer = await Costumer.findOneAndDelete({_id: id})

  if(!costumer){
    return res.status(404).json({error:'could not find costumer'})
  }
  res.status(200).json(costumer)
}

//Update a costumer
const updateCostumer = async(req,res)=>{
  const{id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Costumer could not be found'})
  }

  const  costumer = await Costumer.findOneAndUpdate({_id: id},{
    ...req.body
  })

  if(!costumer){
    return res.status(404).json({error:'could not find costumer'})
  }
  res.status(200).json(costumer)
}



module.exports = {
  createCostumer,
  getCostumer,
  getCostumers,
  deleteCostumer,
  updateCostumer,
  getCostumerByName

}