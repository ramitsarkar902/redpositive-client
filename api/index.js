const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
/* const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}; */

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
app.enable("trust proxy");
app.use(express.json());
/* app.use(helmet());
app.use(morgan("common")); */

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(`${API_URL}users`, userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});
