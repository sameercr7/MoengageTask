const express = require("express");
const authRouter = express.Router();
const {
  addUser,
  findUser,
  getToken,
  verifyToken,
} = require("../controllers/auth.controller");

// CREATE_
authRouter.post("/register", async (req, res) => {
  try {
    let op = await addUser(req.body);
    res.send(op);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const body = req.body;

  try {
    let existsUser = await findUser(body);

    if (existsUser) {
      let token = await getToken(body);
      res.cookie("token", token).send({
        id: existsUser._id,
        username: existsUser.username,
      });
    } else {
      res.status(400).send("Wrong Credentials");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", "").send("Logged Out!");
});

module.exports = authRouter;
