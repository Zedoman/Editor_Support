const FAQ = require("../models/faqModel");
const client = require("../config/redis");
const translateText = require("../utils/translate");

// Create FAQ with auto-translation
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const translations = {
      question_hi: await translateText(question, "hi"),
      question_bn: await translateText(question, "bn"),
      question_es: await translateText(question, "es"),
      answer_hi: await translateText(answer, "hi"),
      answer_bn: await translateText(answer, "bn"),
      answer_es: await translateText(answer, "es"),
    };

    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all FAQs with caching
exports.getFaqs = async (req, res) => {
  const lang = req.query.lang || "en";

  try {
    const cacheKey = `faqs_${lang}`;
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const faqs = await FAQ.find();
    const responseData = faqs.map((faq) => faq.getTranslatedText(lang));

    await client.set(cacheKey, JSON.stringify(responseData), "EX", 3600);

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single FAQ (with translation support)
exports.getFaqById = async (req, res) => {
  try {
    const { id } = req.params;
    const lang = req.query.lang || "en";

    const cacheKey = `faq_${id}_${lang}`;
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const faq = await FAQ.findById(id);
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

    const responseData = faq.getTranslatedText(lang);

    await client.set(cacheKey, JSON.stringify(responseData), "EX", 3600);

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update an FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    let faq = await FAQ.findById(id);
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

    if (question) faq.question = question;
    if (answer) faq.answer = answer;

    if (question || answer) {
      faq.translations = {
        question_hi: await translateText(faq.question, "hi"),
        question_bn: await translateText(faq.question, "bn"),
        question_es: await translateText(faq.question, "es"),
        answer_hi: await translateText(faq.answer, "hi"),
        answer_bn: await translateText(faq.answer, "bn"),
        answer_es: await translateText(faq.answer, "es"),
      };
    }

    await faq.save();

    // Remove cache so fresh data is fetched
    await client.del(`faq_${id}_en`);
    await client.del(`faq_${id}_hi`);
    await client.del(`faq_${id}_bn`);
    await client.del(`faq_${id}_es`);

    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete FAQ
exports.deleteFaq = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
