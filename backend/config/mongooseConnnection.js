const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

module.exports = mongoose.connection;