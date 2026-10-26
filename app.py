from flask import Flask, render_template

app = Flask(__name__)

PROJECTS = [
    {
        "category": "Computer vision · Agriculture",
        "name": "Apple Plum Growth Stage Classification",
        "headline": "A vision pipeline for growth-stage classification.",
        "summary": "Curated a 701-image agricultural dataset and engineered preprocessing pipelines and CNN architectures for growth-stage classification and bounding-box detection.",
        "stack": "TensorFlow, Keras, OpenCV, Streamlit",
        "url": "https://data.mendeley.com/datasets/n6x3mbnvdh/1",
    },
    {
        "category": "NLP · Generative AI",
        "name": "MANIFEX AI Paragraph Evaluator",
        "headline": "Automated feedback for stronger writing.",
        "summary": "Built an NLP engine that evaluates sentence structure, grammar, vocabulary richness and overall writing quality with automated scoring.",
        "stack": "NLP, LLMs, Docker",
        "url": "https://manifex.org/",
    },
    {
        "category": "Backend · Speech",
        "name": "Piper TTS FastAPI Inference Server",
        "headline": "Low-latency voice synthesis over REST.",
        "summary": "Built a containerized neural text-to-speech server delivering real-time voice synthesis through high-throughput FastAPI endpoints.",
        "stack": "Python, FastAPI, Docker, REST API",
        "url": "https://github.com/arnab9961/piper_tts",
    },
    {
        "category": "LLMs · Healthcare",
        "name": "Bilingual Bengali Medicine Recommendation Chatbot",
        "headline": "Language-aware access to medicine information.",
        "summary": "Integrated Bengali language support and designed a large-language-model chatbot for medicine information using Python and Streamlit.",
        "stack": "Python, Streamlit, LLMs",
    },
    {
        "category": "Computer vision · Healthcare",
        "name": "MedGemma-Based Smart Healthcare Platform",
        "headline": "AI-assisted tools for clinical workflows.",
        "summary": "Explored wound analysis, surgical outcome simulation and injectable medicines guidance with NHS Injectable Medicines resources.",
        "stack": "MedGemma, computer vision, healthcare AI",
        "url": "https://www.medusaimg.nhs.uk/",
    },
    {
        "category": "Speech · Multilingual AI",
        "name": "Qur’an Recitation Pronunciation Error Detection",
        "headline": "A framework for more helpful recitation feedback.",
        "summary": "Developed a multilingual AI approach combining speech recognition and language models for pronunciation error detection.",
        "stack": "Speech recognition, NLP, language models",
        "url": "https://ai.sunnahshelf.com/",
    },
]

RESEARCH = [
    ("Best paper award", "Deep Learning and Non-Contrast CT for Widespread Pancreatic Cancer Detection — Springer ICIDA, 2022.", "Read the paper", "https://doi.org/10.1007/978-981-96-6303-3_38"),
    ("ShrimpXNet", "Transfer learning, adversarial training and explainable AI for shrimp disease classification.", "IEEE publication", "https://doi.org/10.1109/3ict68299.2025.11442114"),
    ("SFiNNet", "Transfer learning and explainable AI for small fish classification with robust training.", "IEEE publication", "https://doi.org/10.1109/ICCIT68739.2025.11491764"),
    ("Research assistant", "East West University · Jan 2026 – present. Planning, coordination and progress reporting for a four-member capstone.", None, None),
    ("IEEE Computer Society", "Event Coordinator at the EWU student branch, organising technical events and workshops.", None, None),
]


@app.get("/")
def home():
    return render_template("index.html", projects=PROJECTS, research=RESEARCH)


if __name__ == "__main__":
    app.run(debug=True)
