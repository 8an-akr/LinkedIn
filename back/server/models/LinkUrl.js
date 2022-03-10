const mongoose = require("mongoose");

const linkUrlSchema = new mongoose.Schema({
  from: String,
  name: String,
  role: String,
});

module.exports = mongoose.model("LinkUrl", linkUrlSchema);
