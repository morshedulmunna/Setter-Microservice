const createMulterInstance = require("../common/multile-fileupload");
const {
  createCompanyService,
  getAllTopProduct,
  deleteAllTopProduct,
} = require("../services/topProductService");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/top-products");

router.post(
  "/top-product",
  upload.fields([{ name: "product_logo", maxCount: 1 }, { name: "photos" }]),
  createCompanyService
);
router.get("/top-product", getAllTopProduct);
// router.get("/service/:id", );
// router.put("/service/:id", );
router.delete("/top-product", deleteAllTopProduct);

module.exports = router;
