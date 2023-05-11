const { Op } = require('sequelize');
const { Region, City } = require('../models');



const getAllAndCreateRegions = (req, res) => {
  const { requestType } = req.body;
  if(requestType === 'getAll') {
    getRegions(req, res)
  }
  if(requestType === 'create') {
    createRegion(req, res)
  }
}

// get all regions
const getRegions = (req, res) => {
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

    Region
      .findAndCountAll({
        limit,
        offset,
        include: City,
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
        res.status(500).json({ message: error.message });
      })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create new region
const createRegion = (req, res) => {
  try {
    const { RegionName, countryId } = req.body.data;

    Region
      .create({ RegionName, countryId })
      .then((region) => {
        res.status(201).json(region);
      })
      .catch((error) => {
        if(error?.name === 'SequelizeUniqueConstraintError') {
          res.status(500).json({ message: 'This region name already exists.' });
        } else {
          res.status(500).json({ message: 'Failed to create region' });
        }
      })
  } catch (error) {
    if(error?.name === 'SequelizeUniqueConstraintError') {
      res.status(500).json({ message: 'This region name already exists.' });
    } else {
      res.status(500).json({ message: 'Failed to create region' });
    }
  }
};

// update region by id
const updateRegion = (req, res) => {
  try {
    const { RegionName, countryId } = req.body;
    const { id } = req.params;

    Region
      .findOne({ where: { id } })
      .then((region) => {
        if(!region) {
          res.status(400).send({
            status: 'error',
            message: `Region with id ${id} not found`
          })
        }
        if(RegionName) {
          region.RegionName = RegionName
        }
        if(countryId) {
          region.countryId = countryId
        }

        region
          .save()
          .then((updatedRegion) => {
            if(!updatedRegion) {
              res.status(400).send({
                status: 'error',
                message: `data region with id ${id} failed update`
              })
            }
            res.status(200).send({
              status: 'success',
              data: updatedRegion
            });
          })
          .catch((error) => {
            res.status(500).json({ message: error.message });
          })
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update region' });
  }
};

// delete region by id
const deleteRegion = (req, res) => {
  try {
    const { id } = req.params;

    Region
      .findOne({ where: { id } })
      .then((region) => {
        if(region) {

          Region
            .destroy({ where: { id } })
            .then((deletedRegion) => {
              res.status(200).send({
                status: 'success',
                data: deletedRegion
              });
            })
            .catch((error) => {
              throw new Error(error);
            })
        } else {
          throw new Error(`Region with id ${id} not found`);
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete region' });
  }
};


module.exports = {
  getAllAndCreateRegions,
  updateRegion,
  deleteRegion
};
