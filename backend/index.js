require('dotenv').config()
const express = require("express");
const User = require("./db");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const app = express();
const cors = require("cors");
const secret = require("./config");

const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://192.168.175.251:5173", // your frontend's IP
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/account", accountRouter);
app.listen(port, '0.0.0.0', () => {
  console.log(`App running on ${port}`);
});
