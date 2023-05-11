const express = require('express');
const router = express.Router();
const { 
  createCountry, 
  getCountries, 
  updateCountry, 
  deleteCountry
} = require('../controllers/CountryController.js');

// Route to get all countries
router.get('/', getCountries);
// Route to create a new country
router.post('/', createCountry);
// Route to update a country
router.put('/:id', updateCountry);
// Route to delete a country
router.delete('/:id', deleteCountry);

module.exports = router;