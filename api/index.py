from flask import Flask, render_template, jsonify, request
import os

# Configure template and static folders relative to api directory
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates'))
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

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
    return jsonify({"status": "success", "message": "Message received!"})

@app.route('/api/ai/analyze', methods=['POST'])
def ai_analyze():
    data = request.json
    text = data.get('text', '')
    insight = f"AI Insight for '{text[:20]}...': This project has high growth potential."
    return jsonify({"insight": insight})

# Vercel expects a WSGI callable at module level
# 'app' is already the Flask WSGI application
# No need for a wrapper handler function
