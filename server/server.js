require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const multer = require("multer");

// ROUTES
const routes = require("./routes/");

const multer_config = require("./multer");

const connectDB = require("./config/db");

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use("/media", express.static(__dirname + "/media"));

app.use(helmet());
app.use(logger("dev"));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  multer({
    storage: multer_config.fileStorage,
    fileFilter: multer_config.fileFilter,
  }).fields([
    {
      name: "user_image",
      maxCount: 1,
    },
    {
      name: "cnic_image_front",
      maxCount: 1,
    },
    {
      name: "cnic_image_back",
      maxCount: 1,
    },
  ])
);

app.use("/api/v1/download/media/:file_name", function (req, res) {
  console.log("IN HERE", req.params);
  const file = `${__dirname}/media/${req.params.file_name}`;
  res.download(file); // Set disposition and send it.
});

app.use(`/api/v1/`, routes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    "\u001b[" +
      34 +
      "m" +
      `Server started on port: ${process.env.PORT}` +
      "\u001b[0m"
  );
});
