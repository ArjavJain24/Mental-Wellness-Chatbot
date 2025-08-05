#!/usr/bin/env python3
"""
MindCare AI Mental Health Chatbot
Main runner script for the application
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from app import app, init_db

    if __name__ == '__main__':
        print("🧠 Starting MindCare AI Mental Health Chatbot...")
        print("🔧 Initializing database...")

        # Ensure directories exist
        os.makedirs('database', exist_ok=True)
        os.makedirs('static/uploads', exist_ok=True)

        # Initialize database
        init_db()
        print("✅ Database initialized successfully!")

        print("🌐 Starting web server...")
        print("📱 Access the application at: http://localhost:5000")
        print("⚠️  Remember to set your GEMINI_API_KEY in app.py")
        print("🛑 Press Ctrl+C to stop the server")
        print("-" * 50)

        # Run the Flask app
        app.run(debug=True, host='0.0.0.0', port=5000)

except ImportError as e:
    print(f"❌ Error importing required modules: {e}")
    print("💡 Make sure you've installed all requirements:")
    print("   pip install -r requirements.txt")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error starting application: {e}")
    sys.exit(1)
