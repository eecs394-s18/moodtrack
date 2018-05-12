var express = require('express');
var router = express.Router();
var Moods = require("../models/models").Moods;


/* GET users listing. */
router.post('/', function(req, res, next) {

  Moods.query()
      .insert({
        id: req.body.deviceID,
        user_type: req.body.userType,
        location: req.body.location,
        timestamp: req.body.timestamp,
        mood: req.params.mood,
      })
      .then(resp => {
        res.sendStatus(200);
      })

});

module.exports = router;
