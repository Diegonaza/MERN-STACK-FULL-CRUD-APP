const express = require('express')
const router = express.Router();
const bookingController = require('../controllers/bookingController')

//upload image
router.post('/ups', bookingController.upload.single('image'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  
  //console.log(req.file.filename)
  //line below was the working res
 // res.status(200).json(req.file.filename)

 res.status(200).send(req.file.filename)
});

//delete image
router.post('/delete/img', bookingController.DeleteImg)




//get all bookings
router.get('/', bookingController.GetBookings)

//get a single booking by name

router.get('/:customerName', bookingController.GetBooking)

// POST a new booking
router.post('/', bookingController.CreateBooking)



//Delete a booking
router.delete('/:id', bookingController.DeleteBooking)

//Update a booking

router.patch('/:id',bookingController.UpdateBooking)

module.exports = router;