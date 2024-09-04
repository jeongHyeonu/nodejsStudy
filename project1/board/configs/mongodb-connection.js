const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://hyeonu:qq98933096@cluster0.gzfxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

module.exports = function(callback) {
    return MongoClient.connect(uri,callback);
}