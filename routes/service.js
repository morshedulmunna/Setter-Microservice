const createMulterInstance = require("../common/multile-fileupload");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getServices,
  deleteService,
  updateService,
} = require("../services/company.services");
const { createCompanyService } = require("../services/company.services");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/service");

router.post(
  "/service",
  authMiddleware,
  upload.single("icon"),
  createCompanyService
);
router.get("/service", getServices);
// router.get("/service/:id", );
router.put(
  "/service/:id",
  authMiddleware,
  upload.single("icon"),
  updateService
);
router.delete("/service/:id", authMiddleware, deleteService);

module.exports = router;
