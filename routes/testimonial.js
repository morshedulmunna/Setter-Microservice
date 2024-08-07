const createMulterInstance = require("../common/multile-fileupload");
const {
  createTestimonial,
  getAllTestimonials,
  deleteAllTestimonial,
} = require("../services/testimonial.service");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/testimonial");

router.post(
  "/testimonial",
  upload.fields([
    { name: "company_logo", maxCount: 1 },
    { name: "profile_image", maxCount: 1 },
  ]),
  createTestimonial
);
router.get("/testimonial", getAllTestimonials);
// router.get("/service/:id", );
// router.put("/service/:id", );
router.delete("/testimonial", deleteAllTestimonial);

module.exports = router;
