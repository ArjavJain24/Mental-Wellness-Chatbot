# MindCare AI - Mental Health Chatbot

An AI-powered mental health support platform designed specifically for young adults facing stress, anxiety, and other mental health challenges. This comprehensive web application features user authentication, AI-driven conversations, photo mood analysis, and personalized coping strategies.

## 🌟 Features

- **AI-Powered Conversations**: Intelligent chatbot using Google's Gemini AI for empathetic, personalized responses
- **Emotion Recognition**: Automatic mood detection from text input with appropriate coping strategies
- **Photo Mood Analysis**: Upload photos to analyze emotional state using AI vision capabilities
- **User Authentication**: Secure registration and login system
- **Mood Tracking**: Track emotional patterns over time
- **Crisis Detection**: Automatic detection of crisis situations with emergency resource provision
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Privacy-Focused**: Secure data handling with user privacy as a priority

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))
- Modern web browser

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project as a zip file, extract it
   # Or if you have git access:
   git clone <repository-url>
   cd mental_health_chatbot
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your API key**

   **Option A: Direct in code (Quick setup)**
   - Open `app.py`
   - Find the line: `GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"`
   - Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key

   **Option B: Environment file (Recommended)**
   - Copy `.env.template` to `.env`
   - Edit `.env` and add your API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Install python-dotenv: `pip install python-dotenv`
   - Update app.py to load from .env file

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Access the application**
   - Open your web browser
   - Go to `http://localhost:5000`
   - Register a new account or use the demo

## 📱 How to Use

### Getting Started
1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in to access the chatbot dashboard
3. **Start Chatting**: Begin by typing how you're feeling or use quick action buttons

### Features Guide

#### 💬 Chat Interface
- Type messages in the chat input field
- Use quick action buttons for common feelings
- The AI will detect your mood and provide appropriate responses
- Chat history is saved and can be reviewed

#### 📸 Photo Analysis
1. Click on the photo upload section in the sidebar
2. Select an image from your device
3. Click "Analyze Mood from Photo"
4. The AI will analyze facial expressions and provide feedback

#### 📊 Mood Tracking
- Your detected moods are displayed in the sidebar
- Track emotional patterns over time
- Use this data to identify triggers and improvements

#### 🆘 Crisis Support
- The system automatically detects crisis-related keywords
- Emergency resources are provided when needed
- Always contact emergency services (911) for immediate help

## 🛠️ Technical Details

### Technology Stack
- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Database**: SQLite
- **AI**: Google Gemini API
- **Image Processing**: Pillow (PIL)

### Project Structure
```
mental_health_chatbot/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── setup.py              # Package setup
├── .env.template         # Environment variables template
├── database/             # SQLite database storage
├── static/
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   └── main.js       # JavaScript functionality
│   └── uploads/          # User uploaded images
└── templates/
    ├── base.html         # Base template
    ├── index.html        # Landing page
    ├── login.html        # Login page
    ├── register.html     # Registration page
    └── dashboard.html    # Main chat interface
```

### Database Schema

#### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password_hash
- created_at

#### Chat History Table
- id (Primary Key)
- user_id (Foreign Key)
- message
- response
- mood
- timestamp

#### Photo Analysis Table
- id (Primary Key)
- user_id (Foreign Key)
- filename
- analysis_result
- detected_mood
- timestamp

## 🔧 Configuration

### Environment Variables
Create a `.env` file with the following variables:
```bash
GEMINI_API_KEY=your_gemini_api_key
FLASK_SECRET_KEY=your_secret_key
FLASK_ENV=development
DATABASE_URL=database/mental_health.db
UPLOAD_FOLDER=static/uploads
MAX_CONTENT_LENGTH=16777216
```

### Customization
- **Mood Categories**: Edit the emotion classification in `classify_emotion()` function
- **Coping Strategies**: Modify responses in the `generate_coping_response()` function
- **UI Styling**: Update `static/css/style.css` for custom styling
- **Emergency Resources**: Modify emergency contacts in `static/js/main.js`

## 🚨 Important Safety Information

⚠️ **This application is for support purposes only and is NOT a substitute for professional mental health treatment.**

### When to Seek Professional Help
- If you're having thoughts of self-harm or suicide
- If you're experiencing severe depression or anxiety
- If your mental health is impacting your daily life
- For ongoing mental health support and therapy

### Emergency Contacts
- **Emergency Services**: 911
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **NAMI HelpLine**: 1-800-950-NAMI (6264)

## 🔒 Privacy & Security

- User passwords are hashed using SHA-256
- Chat history is encrypted in the database
- Uploaded images are stored securely
- No personal data is shared with third parties
- Users can delete their data at any time

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Make sure all dependencies are installed: `pip install -r requirements.txt`

2. **API key errors**
   - Verify your Gemini API key is correct
   - Check if the API key has proper permissions

3. **Database errors**
   - Ensure the `database/` folder exists
   - Check file permissions for database creation

4. **File upload issues**
   - Verify the `static/uploads/` folder exists
   - Check file size limits (16MB max by default)

### Getting Help
- Check the browser console for JavaScript errors
- Review the Flask console output for server errors
- Ensure all file paths are correct
- Verify Python version compatibility (3.8+)

## 📈 Future Enhancements

- [ ] Real-time mood analytics dashboard
- [ ] Integration with wearable devices
- [ ] Group chat support features
- [ ] Multi-language support
- [ ] Advanced crisis intervention protocols
- [ ] Integration with telehealth platforms
- [ ] Mobile app development

## 🤝 Contributing

This project is designed for mental health support. If you'd like to contribute:

1. Focus on user safety and privacy
2. Test thoroughly before submitting changes
3. Follow ethical AI guidelines
4. Consider accessibility in all features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Bootstrap for the responsive UI framework
- Font Awesome for the icons
- Mental health professionals who inspired this project

---

**Remember: Your mental health matters. You are not alone. Help is always available.**

For immediate crisis support, contact:
- 🇺🇸 National Suicide Prevention Lifeline: 988
- 🇺🇸 Crisis Text Line: Text HOME to 741741
- 🆘 Emergency Services: 911
