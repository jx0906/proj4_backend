//import library
const mongoose = require("mongoose");
const textIndexes = require("../util/textIndexes"); //to ensure text index is created immediately aft connection to DB is establish (implicit execution)

// laying the connection to the data layer (ie, DAO)
mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL);

// shortcut to mongoose.connection object
const db = mongoose.connection;

// aft infra is set, we switch it "on"
db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
