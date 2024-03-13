const { Activity, Country } = require("../db");

module.exports = async (req, res) => {
  try {
    let { name, difficulty, duration, season, country } = req.body;
    console.log(country);
    // Verifica si ya existe una actividad con los mismos atributos, con el mismo nombre y obtener la lista de países asociados
    const [existingSimilarActivity, existingActivity, existingCountries] =
      await Promise.all([
        Activity.findOne({ where: { name, difficulty, duration, season } }),
        Activity.findOne({ where: { name } }),
        Activity.findOne({
          where: { name },
          include: [{ model: Country, attributes: ["id"] }],
        }),
      ]);

    if (existingSimilarActivity) {
      // Verifica si el país ingresado es diferente al país asociado a la actividad existente
      const areDifferentCountries = country.some((countryId) =>
        existingCountries.Countries.some((c) => c.id !== countryId)
      );

      if (areDifferentCountries) {
        throw new Error(
          "La actividad ya existe y al menos un país ingresado es igual al asociado a la actividad."
        );
      } else {
        // Agrega el nuevo país a la actividad existente
        const countriesToAdd = await Country.findAll({
          where: { id: country },
        });

        await existingSimilarActivity.addCountries(countriesToAdd);

        return res.status(200).json(existingSimilarActivity);
      }
    } else {
      if (existingActivity) {
        return res.status(400).json({
          error: "Ya existe una actividad con el mismo nombre.",
        });
      }
      // Crea nueva actividad
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        country,
      });

      // Asocia los países a la nueva actividad
      const countriesToAdd = await Country.findAll({
        where: { id: country },
      });

      await newActivity.addCountries(countriesToAdd);

      return res.status(200).json(newActivity);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
