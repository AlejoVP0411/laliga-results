const express = require('express');
const router = express.Router();
const { getAllMatches, addMatch, getMatchesByJornada } = require('../controllers/matchController');


router.get('/', getAllMatches);
router.post('/', addMatch);
router.get('/jornada/:jornada', getMatchesByJornada);


module.exports = router;
