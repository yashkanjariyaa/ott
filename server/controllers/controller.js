const bcrypt = require("bcryptjs");
const userSchema = require("../models/authSchema.js");
const movie = require("../models/movie.js");
const jwt = require("jsonwebtoken");
const jwtkey = "dontreact@15^-202";
const movies  = require("../movies.json");
//user login and register
const signUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    await userSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: cryptedPassword,
    });
    console.log({
      name: req.body.name,
      email: req.body.email,
      password: cryptedPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await userSchema.findOne({
      email: req.body.email,
    });
    console.log(user);
    if (!user) {
      return res.json({ status: "error", error: "Invalid Login" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, jwtkey);
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};

const check = async (req, res) => {
  try {
    const token = req.body.token;
    const valid = await jwt.decode(token);
    if (!valid) {
      res.json({ status: "invalid" });
    } else {
      res.json({ status: "valid" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.query;
    const movie = movies.movies[query];
    if (movies.length === 0) {
      return res.status(404).json({ Error: "No movies found" });
    }
    res.status(200).json({ Search: movie });
  } catch (error) {
    res.status(500).json({ Error: "Error fetching data" });
  }
};
module.exports = {
  signIn,
  signUp,
  check,
  search,
};
