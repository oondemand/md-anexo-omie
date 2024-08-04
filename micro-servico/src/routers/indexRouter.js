const express = require("express");
const IndexController = require("../controllers/indexController");
const router = express.Router();

router.get("/", IndexController.test);
router.post("/incluir-anexo", IndexController.incluirAnexo);

module.exports = router;