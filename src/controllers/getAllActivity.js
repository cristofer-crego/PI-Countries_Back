const { Activity, Country } = require("../db");

module.exports = async (req, res) => {
  try {
    const findAll = await Activity.findAll({
      include: [
        {
          model: Country,
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(findAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
