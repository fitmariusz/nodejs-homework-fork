const jwt = require("jsonwebtoken");

const payload = { id: 2, username: "Larson" };
const secret = "secret word";
const token = jwt.sign(payload, secret);

console.log(token);

const decode = jwt.decode(token);

console.log(decode);

const verify = jwt.verify(token, secret);

console.log(verify);