const Model = require("objection").Model;


class Moods extends Model {
  static get tableName() {
    return "moods";
  }
  }

module.exports = { Moods };
