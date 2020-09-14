const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "node-app";

const id = new ObjectId();
console.log(id, id.getTimestamp(), id.id, id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to DB");
    }

    const db = client.db(databaseName);
  }
);
