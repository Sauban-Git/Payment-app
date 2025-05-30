require('dotenv').config()
const express = require("express");
const User = require("./db");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const app = express();
const cors = require("cors");
const secret = require("./config");
const fe_url = process.env.fe_urls.split(',');

const port = process.env.port;

app.use(express.json());
app.use(
  cors({
    origin: fe_url, // your frontend's IP
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/account", accountRouter);
app.listen(port, '0.0.0.0', () => {
  console.log(`App running on ${port}`);
});
