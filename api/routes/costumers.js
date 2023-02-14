const express = require('express')
const router = express.Router();
const costumerController = require('../controllers/costumerController')


//get all costumers
router.get('/', costumerController.getCostumers)

//get a single costumer

//router.get('/:id', costumerController.getCostumer)

//get a single costumer by name

router.get('/:fname', costumerController.getCostumerByName)

// POST a new costumer
router.post('/', costumerController.createCostumer)

//Delete a costumer
router.delete('/:id', costumerController.deleteCostumer)

//Update a costumer

router.patch('/:id',costumerController.updateCostumer)

module.exports = router;