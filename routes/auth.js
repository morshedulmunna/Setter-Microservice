const createMulterInstance = require("../common/multile-fileupload");
const { register, login } = require("../services/auth.service");

const router = require("express").Router();
const upload = createMulterInstance("./uploads/user");

router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;
