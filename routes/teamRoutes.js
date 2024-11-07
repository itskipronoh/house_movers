const express = require('express');
const { viewTeam } = require('../controllers/teamController');

const router = express.Router();

router.get('/viewteam', viewTeam);

module.exports = router;
