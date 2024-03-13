const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
module.exports = async (req, res) => {
  const { name } = req.query;
  try {
    let country;
    if (!name) {
      country = await Country.findAll({
        include: [{ model: Activity, through: { attributes: [] } }],
      });
    } else {
      country = await Country.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [{ model: Activity, through: { attributes: [] } }],
      });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
