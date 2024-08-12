const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const IndexController = require("../controllers/indexController");
const router = express.Router();

router.get("/", IndexController.test);
router.post("/incluir-anexo", authMiddleware, IndexController.incluirAnexo);

module.exports = router;
