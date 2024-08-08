const createMulterInstance = require("../common/multile-fileupload");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/service");

router.post("/top-product", upload.array("files"));
router.get("/top-product");
// router.get("/service/:id", );
// router.put("/service/:id", );
router.delete("/top-product");

module.exports = router;
