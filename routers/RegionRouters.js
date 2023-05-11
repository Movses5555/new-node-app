const express = require('express');
const router = express.Router();
const { 
  createRegion, 
  getRegions,
  updateRegion,
  deleteRegion,
} = require('../controllers/RegionController');

// Route to get all regions
router.get('/', getRegions);
// Route to create a new region
router.post('/', createRegion);
// Route to update a region
router.put('/:id', updateRegion);
// Route to delete a region
router.delete('/:id', deleteRegion);

module.exports = router;