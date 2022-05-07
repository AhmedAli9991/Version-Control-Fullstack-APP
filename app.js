var express = require("express");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var user = require("./Routes/User");
var repos = require("./Routes/Repos")
var versions = require("./Routes/Version")
var {getUser} = require("./Middleware/User")

var app = express();
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", user);
app.use("/repos",getUser,repos);
app.use("/version",getUser,versions);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Docs");
    app.listen(process.env.PORT || 4000, () =>
      console.log("Listening on port 4000")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
