const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

const apiRouter = require("./routes/api/contactsRouter");
const routeAvatar = require("./routes/avatars/routeAvatar");
const usersRouter = require("./routes/api/usersRouter");

dotenv.config();

const { DB_HOST: urlDb } = process.env;
const connection = mongoose.connect(urlDb);

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/api/users", usersRouter);
app.use("/avatars", routeAvatar);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
});

const startServer = async () => {
  try {
    await connection;
    console.log("Database connected");
    app.listen(8000, () => {
      console.log("Server started on http://localhost:8000");
    });
  } catch (err) {
    process.exit(1);
  }
};

startServer();
