// task 4.3 GET + PUT 
const express = require("express");
const router = express.Router();
const diemController = require("../controllers/diem.controller");

router.get("/", diemController.getDiem);
router.put("/", diemController.nhapDiem);

module.exports = router;