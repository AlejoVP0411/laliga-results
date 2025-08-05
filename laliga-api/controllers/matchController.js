const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/matches.json');

const getAllMatches = (req, res) => {
    const matches = JSON.parse(fs.readFileSync(dataPath));
    res.json(matches);
};

const addMatch = (req, res) => {
    const matches = JSON.parse(fs.readFileSync(dataPath));
    const newMatch = req.body;
    matches.push(newMatch);
    fs.writeFileSync(dataPath, JSON.stringify(matches, null, 2));
    res.status(201).json({ message: 'Partido agregado correctamente' });
};

const getMatchesByJornada = (req, res) => {
    const matches = JSON.parse(fs.readFileSync(dataPath));
    const jornada = parseInt(req.params.jornada);
    const partidosJornada = matches.filter(match => match.jornada === jornada);
    res.json(partidosJornada);
};

module.exports = { getAllMatches, addMatch, getMatchesByJornada };

