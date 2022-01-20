const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = require("./app");
dotenv.config({ path: "./.env" });

let MongoUri;
if (process.env.NODE_ENV == "dev") {
  MongoUri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
  console.log(MongoUri);
  mongoose
    .connect(MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("Mongo database connection");
    });
} else {
  MongoUri = process.env.MONGODB_URL;
  MongoUri = MongoUri.replace("<username>", process.env.MONGODB_USERNAME);
  MongoUri = MongoUri.replace("<password>", process.env.MONGODB_PASSWORD);
  const client = new MongoClient(MongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose
    .connect(MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("Mongo database connection");
    });
}
//connect to db
console.log("Connect roi ne");
//start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
