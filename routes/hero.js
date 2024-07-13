const createMulterInstance = require("../common/multile-fileupload");
const {
  createHero,
  getHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} = require("../services/hero.services");

const router = require("express").Router();

const upload = createMulterInstance("./uploads/heros");

router.post("/heroes", upload.single("image"), createHero);
router.get("/heroes", getHeroes);
router.get("/heroes/:id", getHeroById);
router.put("/heroes/:id", updateHero);
router.delete("/heroes/:id", deleteHero);

module.exports = router;
