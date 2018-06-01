var express = require('express');
var router = express.Router();
var Moods = require("../models/models").Moods;


/* POST mood. */
router.post('/write', function(req, res, next) {
  console.log("Received request", req.body) // debug
  Moods.query()
      .insert({
        device_id: req.body.device_id,
        user_type: req.body.user_type,
        location: req.body.location,
        shift: req.body.shift,
        timestamp: req.body.timestamp,
        mood: req.body.mood,
        comment: req.body.comment,
        stress: req.body.stress
      })
      .then(resp => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })

});

module.exports = router;
