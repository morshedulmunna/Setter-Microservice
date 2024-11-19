const authMiddleware = require("../middleware/authMiddleware");
const {
  saveContactInfo,
  getContactInfo,
  getContactInfoFooter,
  saveContactInfoFooter,
} = require("../services/contactUpdate.service");
const router = require("express").Router();

router.post("/contact-update", authMiddleware, saveContactInfo);
router.get("/contact-update", getContactInfo);
router.post("/contact-update-footer", authMiddleware, saveContactInfoFooter);
router.get("/contact-update-footer", getContactInfoFooter);
// router.get("/heroes/:id", getHeroById);
// router.put("/heroes/:id", authMiddleware, upload.single("image"), updateHero);
// router.delete("/heroes/:id", authMiddleware, deleteHero);

module.exports = router;
