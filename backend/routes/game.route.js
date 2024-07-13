const router = require("express").Router();
const gameController = require("../controllers/game.controller");




router.get("/friends",gameController.getUserFriends)












module.exports = router