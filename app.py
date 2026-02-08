from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)

# Routes for pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services/index.html')

@app.route('/services/app-development')
def app_dev():
    return render_template('services/app_dev.html')

@app.route('/services/web-development')
def web_dev():
    return render_template('services/web_dev.html')

@app.route('/services/ai-automation')
def ai_automation():
    return render_template('services/ai_automation.html')

@app.route('/case-studies')
def case_studies():
    return render_template('case_studies.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/founder')
def founder():
    return render_template('founder.html')

@app.route('/process')
def process():
    return render_template('process.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# API Endpoints
@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.json
    # Logic to handle contact form (e.g., save to DB or send email)
    return jsonify({"status": "success", "message": "Message received!"})

@app.route('/api/ai/analyze', methods=['POST'])
def ai_analyze():
    # Placeholder for AI functionality using Scikit-learn or similar
    data = request.json
    text = data.get('text', '')
    # Mock AI logic: return simple insight
    insight = f"AI Insight for '{text[:20]}...': This project has high growth potential."
    return jsonify({"insight": insight})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
