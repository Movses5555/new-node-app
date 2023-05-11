const { Op } = require('sequelize');
const { Region, City } = require('../models');


// get all regions
const getRegions = async (req, res) => {
  const { page = 1, size, search } = req.query;
  const limit = parseInt(size) || 100;
  const offset = (parseInt(page) - 1) * limit;
  try {
    let whereClause = {};
    if (search) {
      whereClause = {
        RegionName: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    const { count, rows } = await Region.findAndCountAll({
      limit,
      offset,
      include: City,
      where: whereClause,
    });
    return res.status(200).json({
      total: count,
      data: rows,
      currentPage: offset,
      paginationCount: limit,
      pageCount: count / limit
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create new region
const createRegion = async (req, res) => {
  try {
    const { RegionName, countryId } = req.body;
    const region = await Region.create({ RegionName, countryId });
    res.status(201).json(region);
  } catch (error) {
    if(error?.name === 'SequelizeUniqueConstraintError') {
      res.status(500).json({ message: 'This region name already exists.' });
    } else {
      res.status(500).json({ message: 'Failed to create region' });
    }
  }
};

// update region by id
const updateRegion = async (req, res) => {
  try {
    const { RegionName, countryId } = req.body;
    const { id } = req.params;
    const findRegionById = await Region.findOne({
      where: {
        id: id
      }
    });
    if(!findRegionById) {
      res.status(400).send({
        status: 'error',
        message: `Region with id ${id} not found`
      })
    }
    if(RegionName) {
      findRegionById.RegionName = RegionName
    }
    if(countryId) {
      findRegionById.countryId = countryId
    }
    const updateRegion = await findRegionById.save();
    if(!updateRegion) {
      res.status(400).send({
        status: 'error',
        message: `data region with id ${id} failed update`
      })
    }
    res.status(200).send({
      status: 'success',
      data: updateRegion
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update region' });
  }
};

// delete region by id
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRegion = await Region.destroy({
      where: { id }
    });
    res.status(200).send({
      status: 'success',
      data: deletedRegion
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete region' });
  }
};


module.exports = {
  getRegions,
  createRegion,
  updateRegion,
  deleteRegion
};
