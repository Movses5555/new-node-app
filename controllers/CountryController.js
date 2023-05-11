const { Op } = require('sequelize');
const { Country, Region } = require('../models');


// get all countries
const getCountries = async (req, res) => {
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
    const { count, rows } = await Country.findAndCountAll(queryOptions);
    return res.status(200).json({
      total: count,
      data: rows,
      currentPage: offset,
      paginationCount: limit,
      pageCount: parseInt(count / limit)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create new country
const createCountry = async (req, res) => {
  try {
    const { CountryName } = req.body;
    const country = await Country.create({ CountryName });
    res.status(201).json(country);
  } catch (error) {
    if(error?.name === 'SequelizeUniqueConstraintError') {
      res.status(500).json({ message: 'This country name already exists.' });
    } else {
      res.status(500).json({ message: 'Failed to create country' });
    }
  }
};

// update country by id
const updateCountry = async (req, res) => {
  try {
    const { CountryName } = req.body;
    const { id } = req.params;
    const findCountryById = await Country.findOne({
      where: {
        id: id
      }
    });
    if(!findCountryById) {
      res.status(400).send({
        status: 'error',
        message: `Country with id ${id} not found`
      })
    }
    if(CountryName) {
      findCountryById.CountryName = CountryName
    }
    const updateCountry = await findCountryById.save();
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
  } catch (error) {
    if(error?.name === 'SequelizeUniqueConstraintError') {
      res.status(500).json({ message: 'This country name already exists.' });
    } else {
      res.status(500).json({ message: 'Failed to update country' });
    }
  }
};

// delete country by id
const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCountry = await Country.destroy({
      where: { id }
    });
    res.status(200).send({
      status: 'success',
      data: deletedCountry
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete country' });
  }
};


module.exports = {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
};
