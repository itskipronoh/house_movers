const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  Driver: [
    {
      D_roll: String,
      D_name: String,
      D_phone: String,
      D_id: String,
    },
  ],
  labour: [
    {
      L_roll: String,
      L_name: String,
      L_phone: String,
      L_id: String,
    },
  ],
});

module.exports = mongoose.model('Team', teamSchema);
