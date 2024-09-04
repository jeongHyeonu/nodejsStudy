const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const uri = "mongodb+srv://hyeonu:qq98933096@cluster0.gzfxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function () {
  return mongoose.connect(uri);
};