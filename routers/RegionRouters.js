const express = require('express');
const router = express.Router();
const { 
  getAllAndCreateRegions,
  updateRegion,
  deleteRegion,
} = require('../controllers/RegionController');

// Route to get all and create regions
router.post('/', getAllAndCreateRegions);

// Route to update a region
router.put('/:id', updateRegion);
// Route to delete a region
router.delete('/:id', deleteRegion);

module.exports = router;