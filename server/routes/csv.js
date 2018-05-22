const express = require('express');
let router = express.Router();

const Moods = require("../models/models").Moods;
const json2csv = require("json2csv").parse;
const fields = ["device_id", "user_type", "location","shift","timestamp", "mood", "comment"];
const ops = { fields }

/* GET moods in a csv. */
router.get('/', function(req, res, next) {
  Moods.query()
  .then(q => {
    console.log(q) // debug - have a look to see what it looks like
    let moods_data = json2csv(q, ops)
    // res.status(200).attachment(moods_data).send("Downloading CSV snapshot of database.");
    res.status(200).send("You're here.");
  })
  .catch(e => {
    console.error(e)
    res.status(204).send(e);
  });

});

module.exports = router;
