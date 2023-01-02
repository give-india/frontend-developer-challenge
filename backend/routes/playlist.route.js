const express = require('express');
const router = express.Router();


const playlist_controller = require('../controllers/playlist.controller');

router.post('/', playlist_controller.playlist_create);
router.get('/', playlist_controller.playlists);
router.get('/:id', playlist_controller.playlist_details);
router.put('/:id', playlist_controller.playlist_update);
router.delete('/:id', playlist_controller.playlist_delete);

module.exports = router;