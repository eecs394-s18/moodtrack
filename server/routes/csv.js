const express = require('express');
let router = express.Router();

const Moods = require("../models/models").Moods;
const json2csv = require("json2csv").parse;
const fields = ["device_id", "user_type", "location","shift","timestamp", "mood", "comment"];
const ops = { fields };

/* GET moods in a csv. */
router.get('/', function(req, res, next) {
  Moods.query()
  .then(data => {
    // console.log(data) // debug - have a look to see what it looks like
    let csv = json2csv(data, ops)
    console.log(csv) // debug - have a look to see what it looks like
    res.setHeader('Content-disposition', 'attachment; filename=moods.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  })
  .catch(e => {
    console.error(e)
    res.status(204).send(e);
  });

});

module.exports = router;
