const router = require("express").Router();
const gameController = require("../controllers/game.controller");

router.get("/friends/:id", gameController.getUserFriends);
router.get("/friendShip-status", gameController.checkFriendShipStatus);

module.exports = router;
