const { sentEmail } = require("../services/email-send");

const router = require("express").Router();

router.post("/send-email", sentEmail);

module.exports = router;
