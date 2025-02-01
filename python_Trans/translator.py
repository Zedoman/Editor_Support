from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

translator = Translator()

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get("text")
    target_lang = data.get("targetLang")

    if not text or not target_lang:
        return jsonify({"error": "Text and targetLang are required"}), 400

    try:
        translated_text = translator.translate(text, dest=target_lang).text
        return jsonify({"translatedText": translated_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
