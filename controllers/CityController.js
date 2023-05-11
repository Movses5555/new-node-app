const { Op } = require('sequelize');
const { City } = require('../models');


// get all cities
const getCities = async (req, res) => {
  const { page = 1, size, search } = req.query;
  const limit = parseInt(size) || 100;
  const offset = (parseInt(page) - 1) * limit;
  try {
    let whereClause = {};
    if (search) {
      whereClause = {
        CityName: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    const { count, rows } = await City.findAndCountAll({
      limit,
      offset,
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

// create new city
const createCity = async (req, res) => {
  try {
    const { CityName, regionId } = req.body;
    const city = await City.create({ CityName, regionId });
    res.status(201).json(city);
  } catch (error) {
    console.error('Error creating city:=====');
    if(error?.name === 'SequelizeUniqueConstraintError') {
      res.status(500).json({ message: 'This city name already exists.' });
    } else {
      res.status(500).json({ message: 'Failed to create city' });
    }
  }
};

// update city by id
const updateCity = async (req, res) => {
  try {
    const { CityName, regionId } = req.body;
    const { id } = req.params;
    const findCityById = await City.findOne({
      where: {
        id: id
      }
    });
    if(!findCityById) {
      res.status(400).send({
        status: 'error',
        message: `City with id ${id} not found`
      })
    }
    if(CityName) {
      findCityById.CityName = CityName
    }
    if(regionId) {
      findCityById.regionId = regionId
    }
    const updateCity = await findCityById.save();
    if(!updateCity) {
      res.status(400).send({
        status: 'error',
        message: `data city with id ${id} failed update`
      })
    }
    res.status(200).send({
      status: 'success',
      data: updateCity
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update city' });
  }
};

// delete city by id
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.destroy({
      where: { id }
    });
    res.status(200).send({
      status: 'success',
      data: deletedCity
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete city' });
  }
};


module.exports = {
  getCities,
  createCity,
  updateCity,
  deleteCity
};

