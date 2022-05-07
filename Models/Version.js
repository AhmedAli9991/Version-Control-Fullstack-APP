var mongoose = require("mongoose");
var DocSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true,
  },
  Repository: {
    type: mongoose.Types.ObjectId,
    ref:"Repositories",
    require: true,
  },
});

module.exports = mongoose.model("Doc", DocSchema);
