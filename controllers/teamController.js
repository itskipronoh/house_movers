const Team = require('../models/TeamModel');

exports.viewTeam = async (req, res) => {
  try {
    const team = await Team.find({});
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team data', error });
  }
};
