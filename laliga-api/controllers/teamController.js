const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/teams.json');

const getAllTeams = (req, res) => {
    const teams = JSON.parse(fs.readFileSync(dataPath));
    res.json(teams);
};

module.exports = { getAllTeams };
