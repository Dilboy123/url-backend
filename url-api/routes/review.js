const express = require("express");
const router = express.Router();

const {
  createIP,
  getAllReview,
  getReview,
} = require("../controllers/review");

router.route("/").post(createIP).get(getAllReview);
router.route("/:id").get(getReview);

module.exports = router;
