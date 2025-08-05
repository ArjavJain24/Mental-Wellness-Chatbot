
import os
import sqlite3
import hashlib
import uuid
from datetime import datetime
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from werkzeug.utils import secure_filename
import google.generativeai as genai
from PIL import Image
import base64
import io

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this'  # Change this in production

# Configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Set your Gemini API key here
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"  # Replace with your actual API key
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Database setup
def init_db():
    conn = sqlite3.connect('database/mental_health.db')
    c = conn.cursor()

    # Users table
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  username TEXT UNIQUE NOT NULL,
                  email TEXT UNIQUE NOT NULL,
                  password_hash TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')

    # Chat history table
    c.execute('''CREATE TABLE IF NOT EXISTS chat_history
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER,
                  message TEXT NOT NULL,
                  response TEXT NOT NULL,
                  mood TEXT,
                  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (user_id) REFERENCES users (id))''')

    # Photo analysis table
    c.execute('''CREATE TABLE IF NOT EXISTS photo_analysis
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER,
                  filename TEXT NOT NULL,
                  analysis_result TEXT,
                  detected_mood TEXT,
                  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (user_id) REFERENCES users (id))''')

    conn.commit()
    conn.close()

# Helper functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def classify_emotion(text):
    try:
        prompt = f'''
        Classify the following emotional input into one of these categories:
        - Happy
        - Neutral
        - Sad
        - Anxious
        - Depressed
        - Stressed
        - Angry
        - Excited
        - Lonely
        - Overwhelmed

        Input: {text}

        Respond ONLY with one word from the list above.
        '''
        response = model.generate_content(prompt)
        return response.text.strip().lower()
    except Exception as e:
        print(f"Error in emotion classification: {e}")
        return "neutral"

def generate_coping_response(mood, user_message):
    try:
        prompt = f'''
        As a compassionate mental health chatbot, the user feels {mood}.
        Their message: "{user_message}"

        Provide a supportive, empathetic response that includes:
        1. Acknowledgment of their feelings
        2. A practical coping strategy or helpful tip
        3. Encouragement or positive affirmation
        4. An open-ended question to continue the conversation

        Keep the response warm, professional, and under 150 words.
        Use appropriate emojis to make it more engaging.
        '''
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating response: {e}")
        return "I'm here to listen and support you. Can you tell me more about how you're feeling?"

def analyze_photo_mood(image_path):
    try:
        image = Image.open(image_path)
        prompt = '''
        Analyze this image and detect the emotional state or mood of the person(s) in the photo.

        Consider:
        - Facial expressions
        - Body language
        - Overall atmosphere of the image

        Classify the detected mood into one of these categories:
        - Happy
        - Neutral
        - Sad
        - Anxious
        - Stressed
        - Angry
        - Excited
        - Contemplative

        Provide:
        1. The detected mood (one word)
        2. A brief, supportive comment about what you observe
        3. A gentle suggestion or encouragement based on the detected mood

        Format your response as: "MOOD: [detected_mood] | OBSERVATION: [your observation] | SUGGESTION: [your suggestion]"
        '''

        response = model.generate_content([prompt, image])
        return response.text.strip()
    except Exception as e:
        print(f"Error analyzing photo: {e}")
        return "MOOD: neutral | OBSERVATION: I can see you've shared a photo with me. | SUGGESTION: Thank you for sharing. How are you feeling today?"

# Routes
@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        conn = sqlite3.connect('database/mental_health.db')
        c = conn.cursor()

        # Check if user already exists
        c.execute("SELECT id FROM users WHERE username = ? OR email = ?", (username, email))
        if c.fetchone():
            conn.close()
            return jsonify({'success': False, 'message': 'Username or email already exists'})

        # Create new user
        password_hash = hash_password(password)
        c.execute("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
                 (username, email, password_hash))
        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': 'Registration successful'})

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']

        conn = sqlite3.connect('database/mental_health.db')
        c = conn.cursor()

        password_hash = hash_password(password)
        c.execute("SELECT id, username FROM users WHERE username = ? AND password_hash = ?",
                 (username, password_hash))
        user = c.fetchone()
        conn.close()

        if user:
            session['user_id'] = user[0]
            session['username'] = user[1]
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html', username=session['username'])

@app.route('/chat', methods=['POST'])
def chat():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    data = request.get_json()
    user_message = data['message']
    user_id = session['user_id']

    # Classify emotion
    mood = classify_emotion(user_message)

    # Generate response
    bot_response = generate_coping_response(mood, user_message)

    # Save to database
    conn = sqlite3.connect('database/mental_health.db')
    c = conn.cursor()
    c.execute("INSERT INTO chat_history (user_id, message, response, mood) VALUES (?, ?, ?, ?)",
             (user_id, user_message, bot_response, mood))
    conn.commit()
    conn.close()

    return jsonify({
        'response': bot_response,
        'mood': mood,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    if 'photo' not in request.files:
        return jsonify({'error': 'No photo uploaded'}), 400

    file = request.files['photo']
    if file.filename == '':
        return jsonify({'error': 'No photo selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(f"{uuid.uuid4()}_{file.filename}")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Analyze photo
        analysis_result = analyze_photo_mood(filepath)

        # Extract mood from analysis
        try:
            detected_mood = analysis_result.split('MOOD: ')[1].split(' |')[0].lower()
        except:
            detected_mood = 'neutral'

        # Save to database
        conn = sqlite3.connect('database/mental_health.db')
        c = conn.cursor()
        c.execute("INSERT INTO photo_analysis (user_id, filename, analysis_result, detected_mood) VALUES (?, ?, ?, ?)",
                 (session['user_id'], filename, analysis_result, detected_mood))
        conn.commit()
        conn.close()

        return jsonify({
            'success': True,
            'analysis': analysis_result,
            'detected_mood': detected_mood,
            'filename': filename
        })

    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/chat_history')
def chat_history():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    conn = sqlite3.connect('database/mental_health.db')
    c = conn.cursor()
    c.execute("SELECT message, response, mood, timestamp FROM chat_history WHERE user_id = ? ORDER BY timestamp DESC LIMIT 20",
             (session['user_id'],))
    history = c.fetchall()
    conn.close()

    return jsonify([{
        'message': h[0],
        'response': h[1],
        'mood': h[2],
        'timestamp': h[3]
    } for h in history])

if __name__ == '__main__':
    os.makedirs('database', exist_ok=True)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
