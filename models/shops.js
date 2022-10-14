const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopsSchema = new mongoose.Schema({
  location: { type: { type: String }, coordinates: [] },
  title: { type: String, required: true },
});

shopsSchema.index({ location: "2dsphere" });


module.exports = mongoose.model("shops", shopsSchema);
