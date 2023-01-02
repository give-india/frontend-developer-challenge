const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const playlist = require("./routes/playlist.route");
const cors = require('cors');


dotenv.config();
require('./config/dbConnect.js')();
// initialize our express app

const app = express();

// const database = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// // Connect the database
// mongoose
//   .connect(database, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log("DB connection Successfully!");
  //});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/playlist", playlist);

var port = 5000;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
