const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");

const userRoute = require("./routes/users");
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Mongodb connected");
  }
);

const API_URL = "/api/"; //for the api url call

//middleware
app.use(express.json());
/* app.use(helmet());
app.use(morgan("common")); */

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

//storing on mongodb

/* const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = buf.toString("hex") + path.extname(file.originalname);
      const fileInfo = {
        fileName: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
}); */

app.use(`${API_URL}users`, userRoute);

app.listen(`${process.env.PORT}` || 5000, () => {
  console.log("Server Running");
});
