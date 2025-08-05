from setuptools import setup, find_packages

setup(
    name="mindcare-ai-chatbot",
    version="1.0.0",
    description="AI-powered mental health chatbot with photo analysis",
    author="MindCare AI Team",
    packages=find_packages(),
    install_requires=[
        "Flask==2.3.3",
        "Werkzeug==2.3.7",
        "google-generativeai==0.8.5",
        "google-ai-generativelanguage==0.6.15",
        "Pillow==10.0.1",
        "python-dotenv==1.0.0",
    ],
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Healthcare Industry",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
)
