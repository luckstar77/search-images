//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ModelSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

// Compile model from schema
module.exports = mongoose.model('token', ModelSchema);
