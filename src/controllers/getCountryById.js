const { Country, Activity } = require("../db");

module.exports = async (req, res) => {
  let { id } = req.params;
  id = id.toUpperCase();
  console.log(id);
  try {
    const findByID = await Country.findAll({
      where: { id },
      include: [{ model: Activity, through: { attributes: [] } }],
    });
    console.log(findByID);
    if (findByID.length === 0)
      return res.status(400).json({ error: "Enter a valid ID" });
    res.status(200).json(findByID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
