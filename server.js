const express = require("express");
const http = require("http");
const app = express();
const compression = require("compression");
const path = require("path");
const YOUTUBE_META_URL = "http://www.youtube.com/oembed?format=json&url=";

app.use(compression());

app.get("/api/youtubeMeta", async (req, res) => {
  http.get(`${YOUTUBE_META_URL}${req.query.url}`, youtubeMetaRes => {
    youtubeMetaRes.on("data", buffer => {
      let data = Buffer.from(buffer);
      res.json(data.toString());
    });
  });
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(1234);
