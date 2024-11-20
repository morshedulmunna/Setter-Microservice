const createMulterInstance = require("../common/multile-fileupload");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCompanyService,
  getAllTopProduct,
  deleteSingleTopProduct,
} = require("../services/topProductService");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/top-products");

router.post(
  "/top-product",
  authMiddleware,
  upload.fields([{ name: "product_logo", maxCount: 1 }, { name: "photos" }]),
  createCompanyService
);
router.get("/top-product", getAllTopProduct);
// router.get("/service/:id", );
router.put(
  "/top-product/:id",
  authMiddleware,
  upload.fields([{ name: "product_logo", maxCount: 1 }, { name: "photos" }])
  // updateService
);
router.delete("/top-product/:id", authMiddleware, deleteSingleTopProduct);

module.exports = router;
