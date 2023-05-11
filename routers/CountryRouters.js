const express = require('express');
const router = express.Router();
const { 
  getAllAndCreateCountries,
  updateCountry, 
  deleteCountry
} = require('../controllers/CountryController.js');

// Route to get all and create countries
router.post('/', getAllAndCreateCountries);

// Route to update a country
router.put('/:id', updateCountry);
// Route to delete a country
router.delete('/:id', deleteCountry);

module.exports = router;