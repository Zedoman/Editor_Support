const axios = require("axios");

const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post("http://localhost:5001/translate", {
      text,
      targetLang,
    });

    return response.data.translatedText;
  } catch (error) {
    console.error("Translation Error:", error.message);
    return text; // Fallback to original text
  }
};

module.exports = translateText;
