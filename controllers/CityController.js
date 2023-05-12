const { Op } = require('sequelize');
const { City } = require('../models');


const getAllAndCreateCities = (req, res) => {
  const { requestType } = req.body;
  if(requestType === 'getAll') {
    getCities(req, res)
  }
  if(requestType === 'create') {
    createCity(req, res)
  }
}

// get all cities
const getCities = (req, res) => {
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

    City
      .findAndCountAll({
        limit,
        offset,
        where: whereClause,
      })
      .then(({ count, rows }) => {
        res.status(200).json({
          total: count,
          data: rows,
          currentPage: offset,
          paginationCount: limit,
          pageCount: count / limit
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create new city
const createCity = (req, res) => {
  try {
    const { CityName, regionId } = req.body.data;

    City
      .create({ CityName, regionId })
      .then((city) => {
        res.status(201).json(city);
      })
      .catch((error) => {
        errorHandler('create', error)
      })
  } catch (error) {
    errorHandler('create', error)
  }
};

// update city by id
const updateCity = (req, res) => {
  try {
    const { CityName, regionId } = req.body;
    const { id } = req.params;

    City
      .findByPk(id)
      .then((city) => {
        if(!city) {
          res.status(400).send({
            status: 'error',
            message: `City with id ${id} not found`
          })
        }
        if(CityName) {
          city.CityName = CityName
        }
        if(regionId) {
          city.regionId = regionId
        }

        city
          .save()
          .then((updateCity) => {
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
          })
          .catch((error) => {
            res.status(500).json({ message: 'Failed to update city' });
          })
      })
      .catch((error) => {
        res.status(500).json({ message: 'Failed to update city' });
      })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update city' });
  }
};

// delete city by id
const deleteCity = (req, res) => {
  try {
    const { id } = req.params;

    City
      .findByPk(id)
      .then((city) => {
        if(city) {

          City
            .destroy({ where: { id } })
            .then((deletedCity) => {
              res.status(200).send({
                status: 'success',
                data: deletedCity
              });
            })
            .catch((error) => {
              res.status(500).json({ message: 'Failed to delete city' });
            })
        } else {
          res.status(500).json({ message: `City with id ${id} not found` });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete city' });
  }
};


const errorHandler = (type, error) => {
  if(error?.name === 'SequelizeUniqueConstraintError') {
    res.status(500).json({ message: 'This city name already exists.' });
  } else {
    res.status(500).json({ message: `Failed to ${type} city` });
  }
}


module.exports = {
  getAllAndCreateCities,
  updateCity,
  deleteCity
};

