#!/usr/bin/env python3
"""
Simple test script to verify the installation
"""

import sys
import os

def test_imports():
    """Test if all required modules can be imported"""
    try:
        import flask
        print("✅ Flask imported successfully")

        import google.generativeai
        print("✅ Google Generative AI imported successfully")

        from PIL import Image
        print("✅ Pillow (PIL) imported successfully")

        import sqlite3
        print("✅ SQLite3 imported successfully")

        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_directories():
    """Test if required directories exist"""
    dirs = ['database', 'static', 'static/css', 'static/js', 'static/uploads', 'templates']

    for dir_name in dirs:
        if os.path.exists(dir_name):
            print(f"✅ Directory '{dir_name}' exists")
        else:
            print(f"❌ Directory '{dir_name}' missing")
            return False
    return True

def test_files():
    """Test if required files exist"""
    files = [
        'app.py',
        'requirements.txt',
        'static/css/style.css',
        'static/js/main.js',
        'templates/base.html',
        'templates/index.html',
        'templates/login.html',
        'templates/register.html',
        'templates/dashboard.html'
    ]

    for file_name in files:
        if os.path.exists(file_name):
            print(f"✅ File '{file_name}' exists")
        else:
            print(f"❌ File '{file_name}' missing")
            return False
    return True

def main():
    print("🧪 MindCare AI Installation Test")
    print("=" * 40)

    print("\n1. Testing Python imports...")
    imports_ok = test_imports()

    print("\n2. Testing directory structure...")
    dirs_ok = test_directories()

    print("\n3. Testing required files...")
    files_ok = test_files()

    print("\n" + "=" * 40)

    if imports_ok and dirs_ok and files_ok:
        print("🎉 All tests passed! Installation looks good.")
        print("💡 Next steps:")
        print("   1. Set your GEMINI_API_KEY in app.py")
        print("   2. Run: python run.py")
        print("   3. Open http://localhost:5000 in your browser")
    else:
        print("❌ Some tests failed. Please check the issues above.")
        print("💡 Try running: pip install -r requirements.txt")

if __name__ == '__main__':
    main()
