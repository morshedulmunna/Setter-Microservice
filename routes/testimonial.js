const createMulterInstance = require("../common/multile-fileupload");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTestimonial,
  getAllTestimonials,
  deleteAllTestimonial,
  updateTestimonial,
} = require("../services/testimonial.service");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/testimonial");

router.post(
  "/testimonial",
  authMiddleware,
  upload.fields([
    { name: "company_logo", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
  ]),
  createTestimonial
);
router.get("/testimonial", getAllTestimonials);
// router.get("/service/:id", );
router.put(
  "/testimonial/:id",
  authMiddleware,
  upload.fields([
    { name: "company_logo", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
  ]),
  updateTestimonial
);
router.delete("/testimonial/:id", authMiddleware, deleteAllTestimonial);

module.exports = router;
