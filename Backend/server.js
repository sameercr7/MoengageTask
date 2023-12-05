// IMPORTs_
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./db/connection");
const app = express();
const authRouter = require("./routes/auth.route");
const breweryRouter = require("./routes/brewery.route");

// USE_
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(authRouter);
app.use(breweryRouter);

// LOGIC_
app.get("/", async (req, res) => {
  res.send("Server Working at 8080");
});

// CONNECT mongoDB AND LISTEN TO PORT_
const port = 8080;
connect().then(() => {
  app.listen(port, () => {
    console.log("Listening to port : " + port);
  });
});
