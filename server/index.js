const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const port = 1337;

const { signIn, signUp, check, search } = require("./controllers/controller.js");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, application/json");
  next();
});

const url =
  "mongodb+srv://yashkanjariyaa:nC15RDpjwtgTH5wT@cluster0.t2mxnqu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});
mongoose.connection.on("error", function (error) {
  console.log(error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

app.post("/api/login", signIn);

app.post("/api/register", signUp);

app.post("/api/check", check);

app.get("/api/search", search);

app.listen(port, () => {
  console.log("App is listening on " + port);
});
