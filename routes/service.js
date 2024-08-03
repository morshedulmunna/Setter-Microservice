const createMulterInstance = require("../common/multile-fileupload");
const { getServices } = require("../services/company.services");
const { createCompanyService } = require("../services/company.services");
const router = require("express").Router();
const upload = createMulterInstance("./uploads/service");

router.post("/service", upload.single("icon"), createCompanyService);
router.get("/service", getServices);
// router.get("/service/:id", );
// router.put("/service/:id", );
// router.delete("/service/:id", );

module.exports = router;
