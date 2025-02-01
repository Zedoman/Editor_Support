const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      question_hi: { type: String },
      question_bn: { type: String },
      question_es: { type: String },
      answer_hi: { type: String },
      answer_bn: { type: String },
      answer_es: { type: String },
    },
  },
  { timestamps: true }
);

FaqSchema.methods.getTranslatedText = function (lang) {
  return {
    question: this.translations[`question_${lang}`] || this.question,
    answer: this.translations[`answer_${lang}`] || this.answer,
  };
};

module.exports = mongoose.model("FAQ", FaqSchema);
