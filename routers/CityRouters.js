const express = require('express');
const router = express.Router();
const { 
  getAllAndCreateCities,
  updateCity,
  deleteCity,
} = require('../controllers/CityController');

// Route to get all and create cities
router.post('/', getAllAndCreateCities);

// Route to update a city
router.put('/:id', updateCity);
// Route to delete a city
router.delete('/:id', deleteCity);

module.exports = router;