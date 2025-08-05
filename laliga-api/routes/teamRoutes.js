const express = require('express');
const router = express.Router();
const { getAllTeams } = require('../controllers/teamController');

router.get('/', getAllTeams);

module.exports = router;
