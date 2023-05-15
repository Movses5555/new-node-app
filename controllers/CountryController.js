const { Op } = require('sequelize');
const { Country, Region } = require('../models');


const getAllAndCreateCountries = (req, res) => {
  const { requestType } = req.body;
  if(requestType === 'getAll') {
    getCountries(req, res)
  }
  if(requestType === 'create') {
    createCountry(req, res)
  }
}

// get all countries
const getCountries = (req, res) => {
  const { page = 1, size, search } = req.query;
  try {
    let whereClause = {};
    if (search) {
      whereClause = {
        CountryName: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    const queryOptions = {
      include: Region,
      where: whereClause,
    };

    let limit = 1;
    let offset = (parseInt(page) - 1) * limit;
    if(size !== 'all') {
      limit = parseInt(size) || 100;
      offset = (parseInt(page) - 1) * limit;
      queryOptions.offset = offset;
      queryOptions.limit = limit;
    }
    
    Country
      .findAndCountAll(queryOptions)
      .then(({ count, rows }) => {
        res.status(200).json({
          total: count,
          data: rows,
          currentPage: offset,
          paginationCount: limit,
          pageCount: parseInt(count / limit)
        })
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create new country
const createCountry = (req, res) => {
  try {
    const { CountryName } = req.body.data;

    Country
      .create({ CountryName })
      .then((country) => {
        res.status(201).json(country);
      })
      .catch((error) => {
        errorHandler(res, 'create', error);
      })
  } catch (error) {
    errorHandler(res, 'create', error);
  }
};

// update country by id
const updateCountry = (req, res) => {
  try {
    const { CountryName } = req.body;
    const { id } = req.params;

    Country
      .findByPk(id)
      .then((country) => {
        if(!country) {
          res.status(400).send({
            status: 'error',
            message: `Country with id ${id} not found`
          })
        }
        if(CountryName) {
          country.CountryName = CountryName
        }

        country
          .save()
          .then((updateCountry) => {
            if(!updateCountry) {
              res.status(400).send({
                status: 'error',
                message: `data country with id ${id} failed update`
              })
            }
            res.status(200).send({
              status: 'success',
              data: updateCountry
            });
          })
          .catch((error) => {
            errorHandler(res, 'update', error);
          })
      })
      .catch((error) => {
        errorHandler(res, 'update', error);
      })
  } catch (error) {
    errorHandler(res, 'update', error);
  }
};

// delete country by id
const deleteCountry = (req, res) => {
  try {
    const { id } = req.params;

    Country
      .destroy({ where: { id } })
      .then((deletedCountry) => {
        res.status(200).send({
          status: 'success',
          data: deletedCountry
        });
      })
      .catch(() => {
        res.status(500).json({ message: 'Failed to delete country' });
      })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete country' });
  }
};



const errorHandler = (res, type, error) => {
  if(error?.name === 'SequelizeUniqueConstraintError') {
    res.status(500).json({ message: 'This country name already exists.' });
  } else {
    res.status(500).json({ message: `Failed to ${type} country` });
  }
}


module.exports = {
  getAllAndCreateCountries,
  updateCountry,
  deleteCountry,
};
