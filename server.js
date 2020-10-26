const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { readDirectoryFiles } = require("./modules/read_directory");
const { testRunner } = require("./modules/test_runner");
const PORT = process.env.PORT || 5000;
const keys = require("./config/keys");
global.io = require("socket.io")(5001);

app.use(bodyParser.json());
app.use(cors(keys.corsOptions));

app.get("/api/ping", (req, res) => {
  return res.json({ test: "Hello There!" });
});

app.get("/api/tests", (req, res) => {
  return res.json(readDirectoryFiles());
});

app.post("/api/run", (req, res) => {
  const { fileName } = req.body;
  const runRes = testRunner(fileName);
  return res.json(runRes);
});

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
