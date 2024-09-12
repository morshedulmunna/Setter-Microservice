const createMulterInstance = require("../common/multile-fileupload");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createHero,
  getHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} = require("../services/hero.services");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/heros");

router.post("/heroes", authMiddleware, upload.single("image"), createHero);
router.get("/heroes", getHeroes);
router.get("/heroes/:id", getHeroById);
router.put("/heroes/:id", authMiddleware, upload.single("image"), updateHero);
router.delete("/heroes/:id", authMiddleware, deleteHero);

module.exports = router;
