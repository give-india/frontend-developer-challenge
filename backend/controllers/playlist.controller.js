const Playlist = require("../models/playlist.model");

//Simple version, without validation or sanitation
exports.test = async (req, res) => {
  res.send("Greetings from the Test controller!");
};
//create playlist
exports.playlist_create = async (req, res, next) => {
  try {
    const playListItem = await Playlist.find({link: req.body.link});
    if(!playListItem) {
      throw new Error("Link already exist!!")
    } else {
      const playlist = await Playlist.create({
        link: req.body.link,
        isActive: req.body.isActive,
      });
      res.status(201).json({
        status: "success",
        playlist
      });
    }
  } catch (err) {
    next(err);
  }
};

//get playlist details
exports.playlist_details = async (req, res,next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        playlist,
      },
    });
  } catch (err) {
    next(err);
  }
};


//get all video list
exports.playlists = async (req, res,next) => {
  try {
    const playlist = await Playlist.find({isActive:true});
    res.status(200).json({
      status: "success",
      playlist
    });
  } catch (err) {
    next(err);
  }
};

//update playlist details
exports.playlist_update = async (req, res, next) => {
  Playlist.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, playlist) {
      if (err) return next(err);
      res.send(playlist);
    }
  );
};

//delete playlist videos
exports.playlist_delete = async (req, res, next) => {
  Playlist.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
