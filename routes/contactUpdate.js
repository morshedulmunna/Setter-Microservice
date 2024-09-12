const authMiddleware = require("../middleware/authMiddleware");
const {
  saveContactInfo,
  getContactInfo,
} = require("../services/contactUpdate.service");
const router = require("express").Router();

router.post("/contact-update", authMiddleware, saveContactInfo);
router.get("/contact-update", getContactInfo);
// router.get("/heroes/:id", getHeroById);
// router.put("/heroes/:id", authMiddleware, upload.single("image"), updateHero);
// router.delete("/heroes/:id", authMiddleware, deleteHero);

module.exports = router;
