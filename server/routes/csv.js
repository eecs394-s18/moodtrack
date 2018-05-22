var express = require('express');
var router = express.Router();

var Moods = require("../models/models").Moods;
var json2csv = require("json2csv");

/* GET moods in a csv. */
router.get('/', function(req, res, next) {
  Moods.query()
  .then(q => {
    let fields = ["device_id", "user_type", "location","shift","timestamp", "mood", "comment"];
    let moods_data = json2csv({/*...*/})
    // res.status(200).attachment(moods_data);
    res.status(200).send("You're here.");
  })
  .catch(e => {
    console.log(e)
    res.status(204).send(e);
  });

});

module.exports = router;
