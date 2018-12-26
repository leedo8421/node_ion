const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  originName: String,
  refineName: String,
  size: String,
  format: String
});
mongoose.model('File', FileSchema);
module.exports = mongoose.model('File');
