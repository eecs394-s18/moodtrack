var configDB = "postgres://eecs394:lurielurie@moodtrack.cnagbxqt5q6m.us-east-2.rds.amazonaws.com/moodtrack";
module.exports = {
  development: {
    client: "pg",
    connection: configDB
    // debug: true
  }
};
