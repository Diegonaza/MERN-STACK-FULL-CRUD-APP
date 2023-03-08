const express = require('express')
const router = express.Router();
const customerController = require('../controllers/customerController')

//upload image
router.post('/ups', customerController.upload.single('image'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  
  //console.log(req.file.filename)
  //line below was the working res
 // res.status(200).json(req.file.filename)

 res.status(200).send(req.file.filename)
});

//delete image
router.post('/delete/img', customerController.DeleteImg)




//get all customers
router.get('/', customerController.GetCustomers)

//get a single customer

//router.get('/:id', customerController.getcustomer)

//get a single customer by name

router.get('/:fname', customerController.GetCustomerByName)

// POST a new customer
router.post('/', customerController.CreateCustomer)



//Delete a customer
router.delete('/:id', customerController.DeleteCustomer)

//Update a customer

router.patch('/:id',customerController.UpdateCustomer)

module.exports = router;