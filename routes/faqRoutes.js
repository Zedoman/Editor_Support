const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");

router.post("/", faqController.createFaq);
router.get("/", faqController.getFaqs);
router.get("/:id", faqController.getFaqById);  // ✅ Get single FAQ
router.put("/:id", faqController.updateFaq);   // ✅ Update FAQ
router.delete("/:id", faqController.deleteFaq);

module.exports = router;
