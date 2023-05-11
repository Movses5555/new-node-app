const express = require('express');
const router = express.Router();
const { 
  createCity, 
  getCities,
  updateCity,
  deleteCity,
} = require('../controllers/CityController');

// Route to get all cities
router.get('/', getCities);
// Route to create a new city
router.post('/', createCity);
// Route to update a city
router.put('/:id', updateCity);
// Route to delete a city
router.delete('/:id', deleteCity);

module.exports = router;