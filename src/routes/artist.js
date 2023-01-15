const express = require("express");
const artistController = require("../controllers/artist");

const router = express.Router();

router.post("/", artistController.createArtist);
router.get("/", artistController.read);
router.get("/:id", artistController.getArtistById);
router.patch("/:id", artistController.updateArtistById);

console.log(artistController);

module.exports = router;
