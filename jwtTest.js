// const jwt = require("jsonwebtoken");

// const payload = { id: 2, username: "Larson" };
// const secret = "secret word";
// const token = jwt.sign(payload, secret);

// console.log(token);

// const decode = jwt.decode(token);

// console.log(decode);

// const verify = jwt.verify(token, secret);

// console.log(verify);
// const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri =
//   "mongodb+srv://<username>:<password>@cluster0.xz3gp9d.mongodb.net/<dbname>?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// client.connect((err) => {
//   if (err) {
//     console.error("Failed to connect to the database", err);
//   } else {
//     console.log("Connected to the database");
//   }
//   client.close();
// });


const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]); // Google DNS

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://<username>:<password>@cluster0.xz3gp9d.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database", err);
  } else {
    console.log("Connected to the database");
  }
  client.close();
});
