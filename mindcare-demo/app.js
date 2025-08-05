// Application Data
const APP_DATA = {
    sampleResponses: {
        happy: [
            "😊 That's wonderful to hear! What's been bringing you joy today?",
            "🌟 I love your positive energy! Keep embracing those good feelings.",
            "😄 It's great that you're feeling happy! What made today special?"
        ],
        sad: [
            "😢 I hear you, and it's okay to feel sad sometimes. Would you like to talk about what's on your mind?",
            "💙 Thank you for sharing. Sadness is a natural emotion. I'm here to listen.",
            "🤗 I'm sorry you're feeling down. Remember that these feelings are temporary."
        ],
        anxious: [
            "😰 Anxiety can feel overwhelming. Let's try some deep breathing together - inhale for 4, hold for 4, exhale for 6.",
            "🌱 I understand anxiety is tough. Try the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
            "💨 Feeling anxious is challenging. Let's focus on what you can control right now."
        ],
        stressed: [
            "😤 Stress is really hard to deal with. What's been the biggest source of stress for you lately?",
            "🧘‍♀️ When we're stressed, it helps to break things down. Can you list 3 small things you can accomplish today?",
            "💪 Stress shows you care, but let's find ways to manage it better. What usually helps you relax?"
        ],
        angry: [
            "😠 It's completely normal to feel angry. What triggered these feelings?",
            "🔥 Anger is a valid emotion. Let's work through this together. Take a deep breath.",
            "⚡ I hear your frustration. Sometimes counting to 10 or taking a walk can help cool down."
        ],
        depressed: [
            "💙 I'm here with you. Depression is serious, and you're brave for reaching out. Have you been able to talk to anyone about this?",
            "🤝 You're not alone in this. Depression affects many people, and there are ways to feel better. Would you like some resources?",
            "🌅 Thank you for trusting me. Remember, seeking help is a sign of strength, not weakness."
        ],
        neutral: [
            "🙂 Thanks for checking in. How has your day been so far?",
            "💭 I'm here to listen. Is there anything particular on your mind today?",
            "🌿 It's good to touch base. Sometimes neutral days are exactly what we need."
        ]
    },
    moodAnalysisSamples: [
        "MOOD: Happy | OBSERVATION: I can see a genuine smile and bright eyes in your photo | SUGGESTION: Your joy is evident! Keep doing what makes you feel this good.",
        "MOOD: Contemplative | OBSERVATION: You appear thoughtful and reflective in this image | SUGGESTION: Taking time to reflect is healthy. What's been on your mind?",
        "MOOD: Stressed | OBSERVATION: I notice some tension in your facial expression | SUGGESTION: Consider taking some deep breaths or a short break.",
        "MOOD: Calm | OBSERVATION: You look peaceful and relaxed | SUGGESTION: This calm energy is wonderful. Try to hold onto this feeling."
    ],
    motivationalQuotes: [
        "Every day is a new beginning. Take a deep breath and start again.",
        "You are stronger than you think and more capable than you imagine.",
        "Progress, not perfection, is the goal.",
        "Your mental health is just as important as your physical health.",
        "It's okay to not be okay sometimes. Healing takes time.",
        "You matter. Your feelings are valid. You are not alone.",
        "Small steps every day lead to big changes over time.",
        "Be patient with yourself. Growth takes time."
    ],
    crisisResources: [
        { name: "National Suicide Prevention Lifeline", contact: "988", available: "24/7" },
        { name: "Crisis Text Line", contact: "Text HOME to 741741", available: "24/7" },
        { name: "NAMI HelpLine", contact: "1-800-950-NAMI (6264)", available: "M-F 10am-8pm ET" },
        { name: "SAMHSA National Helpline", contact: "1-800-662-4357", available: "24/7" }
    ]
};

// Application State
let currentMood = 'neutral';
let chatHistory = [];
let isTyping = false;

// Page Navigation
function startDemo() {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('chat-page').classList.add('active');
    initializeChat();
}

function goHome() {
    document.getElementById('chat-page').classList.remove('active');
    document.getElementById('landing-page').classList.add('active');
}

function showFeatures() {
    document.getElementById('features-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Chat Initialization
function initializeChat() {
    displayDailyQuote();
    updateCurrentMoodDisplay();
    populateCrisisResources();
    
    // Focus on input
    document.getElementById('chat-input').focus();
}

// Daily Quote
function displayDailyQuote() {
    const quote = APP_DATA.motivationalQuotes[
        Math.floor(Math.random() * APP_DATA.motivationalQuotes.length)
    ];
    document.getElementById('daily-quote-text').textContent = quote;
}

// Chat Functionality
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
        generateAIResponse(message);
    }, 500);
}

function addMessage(content, sender, isHTML = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (isHTML) {
        messageContent.innerHTML = content;
    } else {
        const p = document.createElement('p');
        p.textContent = content;
        messageContent.appendChild(p);
    }
    
    const timestamp = document.createElement('div');
    timestamp.className = 'message-time';
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageContent.appendChild(timestamp);
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(messageContent);
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Store in history
    chatHistory.push({ content, sender, timestamp: new Date() });
}

function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const messagesContainer = document.getElementById('chat-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'message bot typing-indicator';
    typingElement.id = 'typing-indicator';
    
    typingElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
    isTyping = false;
}

function generateAIResponse(userMessage) {
    showTypingIndicator();
    
    // Analyze message for emotional keywords
    const detectedMood = analyzeMessageMood(userMessage);
    const responses = APP_DATA.sampleResponses[detectedMood];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some follow-up suggestions based on mood
    const followUp = generateFollowUpSuggestion(detectedMood);
    
    setTimeout(() => {
        hideTypingIndicator();
        addMessage(response, 'bot');
        
        // Add follow-up after a short delay
        if (followUp) {
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    addMessage(followUp, 'bot');
                }, 1000);
            }, 1500);
        }
    }, 1500 + Math.random() * 1000); // Random delay for realism
}

function analyzeMessageMood(message) {
    const lowercaseMessage = message.toLowerCase();
    
    // Keyword detection for different moods
    const moodKeywords = {
        happy: ['happy', 'great', 'wonderful', 'amazing', 'excellent', 'good', 'fantastic', 'joy', 'excited'],
        sad: ['sad', 'down', 'upset', 'cry', 'crying', 'hurt', 'disappointed', 'lonely', 'blue'],
        anxious: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'scared', 'anxiety', 'overwhelmed'],
        stressed: ['stressed', 'pressure', 'busy', 'overwhelmed', 'deadline', 'work', 'exhausted', 'tired'],
        angry: ['angry', 'mad', 'furious', 'frustrated', 'annoyed', 'irritated', 'rage', 'upset'],
        depressed: ['depressed', 'hopeless', 'worthless', 'empty', 'numb', 'suicide', 'die', 'end it all']
    };
    
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
            currentMood = mood;
            updateCurrentMoodDisplay();
            return mood;
        }
    }
    
    return 'neutral';
}

function generateFollowUpSuggestion(mood) {
    const suggestions = {
        happy: "Would you like to share what's making you feel so positive? It could help inspire others! 🌟",
        sad: "Sometimes it helps to talk about what's bothering you. I'm here to listen without judgment. Would you like to share more?",
        anxious: "Anxiety is tough, but you're not alone. Would you like me to guide you through a quick relaxation exercise?",
        stressed: "Stress can build up quickly. Have you tried any stress-relief techniques that work for you? I can suggest some if you'd like.",
        angry: "It's important to acknowledge anger. Once you've taken some deep breaths, would you like to talk about what's triggering these feelings?",
        depressed: "Depression can make everything feel overwhelming. Please know that reaching out shows incredible strength. Have you considered speaking with a mental health professional?",
        neutral: "How has your overall mental health been lately? I'm here if you need support with anything."
    };
    
    return suggestions[mood] || null;
}

// Mood Selection
function selectMood(mood) {
    currentMood = mood;
    updateCurrentMoodDisplay();
    
    // Auto-send mood message
    const moodMessages = {
        happy: "I'm feeling really happy today! 😊",
        sad: "I'm feeling quite sad right now...",
        anxious: "I'm feeling anxious and worried.",
        stressed: "I've been really stressed lately.",
        angry: "I'm feeling angry and frustrated.",
        depressed: "I've been feeling depressed."
    };
    
    const input = document.getElementById('chat-input');
    input.value = moodMessages[mood];
    sendMessage();
}

function updateCurrentMoodDisplay() {
    const currentMoodElement = document.getElementById('current-mood');
    const moodIcons = {
        happy: 'fas fa-smile',
        sad: 'fas fa-frown',
        anxious: 'fas fa-dizzy',
        stressed: 'fas fa-tired',
        angry: 'fas fa-angry',
        depressed: 'fas fa-cloud-rain',
        neutral: 'fas fa-meh'
    };
    
    currentMoodElement.innerHTML = `
        <i class="${moodIcons[currentMood]}"></i>
        <span>${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}</span>
    `;
}

// Photo Upload Simulation
function triggerPhotoUpload() {
    document.getElementById('photo-upload').click();
}

document.getElementById('photo-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        simulateMoodAnalysis(file);
    }
});

function simulateMoodAnalysis(file) {
    showTypingIndicator();
    
    // Simulate processing time
    setTimeout(() => {
        hideTypingIndicator();
        
        const analysis = APP_DATA.moodAnalysisSamples[
            Math.floor(Math.random() * APP_DATA.moodAnalysisSamples.length)
        ];
        
        const analysisHTML = `
            <p><strong>📸 Photo Analysis Complete</strong></p>
            <div style="background: var(--color-bg-3); padding: var(--space-12); border-radius: var(--radius-base); margin: var(--space-8) 0;">
                <p style="margin: 0; font-family: var(--font-family-mono); font-size: var(--font-size-sm);">${analysis}</p>
            </div>
            <p>Remember, this is just an AI interpretation. Your feelings are valid regardless of what the analysis shows. How are you actually feeling right now?</p>
        `;
        
        addMessage(analysisHTML, 'bot', true);
    }, 2000);
}

// Modal Functions
function showMoodTracker() {
    document.getElementById('mood-tracker-modal').classList.remove('hidden');
}

function closeMoodTracker() {
    document.getElementById('mood-tracker-modal').classList.add('hidden');
}

function showCrisisResources() {
    document.getElementById('crisis-modal').classList.remove('hidden');
}

function closeCrisisModal() {
    document.getElementById('crisis-modal').classList.add('hidden');
}

function populateCrisisResources() {
    const container = document.getElementById('crisis-resources-list');
    container.innerHTML = '';
    
    APP_DATA.crisisResources.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource-item';
        resourceElement.innerHTML = `
            <h5>${resource.name}</h5>
            <div class="resource-contact">${resource.contact}</div>
            <div class="resource-hours">Available: ${resource.available}</div>
        `;
        container.appendChild(resourceElement);
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Escape to close modals
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
    
    // Alt+H to go home
    if (event.altKey && event.key === 'h') {
        goHome();
    }
    
    // Alt+C to focus chat input
    if (event.altKey && event.key === 'c') {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.focus();
        }
    }
});

// Crisis keyword detection
function checkForCrisisKeywords(message) {
    const crisisKeywords = [
        'suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm',
        'no point', 'better off dead', 'want to die', 'harm myself'
    ];
    
    const lowercaseMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowercaseMessage.includes(keyword));
}

// Enhanced AI Response with Crisis Detection
const originalGenerateAIResponse = generateAIResponse;
generateAIResponse = function(userMessage) {
    if (checkForCrisisKeywords(userMessage)) {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            const crisisResponse = `
                <p><strong>🚨 I'm very concerned about what you've shared.</strong></p>
                <p>Your life has value and meaning. You don't have to face this alone.</p>
                <p><strong>Please reach out for immediate help:</strong></p>
                <ul>
                    <li>🆘 <strong>Emergency Services:</strong> Call 911</li>
                    <li>🆘 <strong>Suicide Prevention:</strong> Call or text 988</li>
                    <li>🆘 <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                </ul>
                <p>Would you like me to provide more crisis resources, or is there someone you can talk to right now?</p>
            `;
            addMessage(crisisResponse, 'bot', true);
        }, 1000);
        return;
    }
    
    originalGenerateAIResponse(userMessage);
};

// Auto-scroll chat messages
function autoScrollChat() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up daily quote on landing page
    displayDailyQuote();
    
    // Add some demo interactions
    setTimeout(() => {
        const landingPage = document.getElementById('landing-page');
        if (landingPage && landingPage.classList.contains('active')) {
            // Auto-focus on main CTA if still on landing page
            const tryDemoBtn = document.querySelector('[onclick="startDemo()"]');
            if (tryDemoBtn) {
                tryDemoBtn.focus();
            }
        }
    }, 1000);
});

// Smooth scrolling for internal links
document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add some sample conversations for demonstration
const SAMPLE_CONVERSATIONS = [
    {
        user: "I've been feeling overwhelmed with work lately",
        bot: "Work stress can really take a toll on our mental health. It sounds like you're carrying a heavy load right now. What specifically about work has been most overwhelming for you?"
    },
    {
        user: "I don't know how to manage my anxiety",
        bot: "Anxiety can feel really challenging, but there are effective ways to manage it. Have you tried any breathing exercises or grounding techniques? I can walk you through some that many people find helpful."
    },
    {
        user: "I feel like nobody understands me",
        bot: "Feeling misunderstood can be really isolating and painful. That sense of disconnection is something many people experience, even though it might not seem that way. Would you like to talk about what's making you feel this way?"
    }
];

// Function to add sample conversation (could be triggered by a button)
function showSampleConversation() {
    const sample = SAMPLE_CONVERSATIONS[Math.floor(Math.random() * SAMPLE_CONVERSATIONS.length)];
    
    setTimeout(() => {
        addMessage(sample.user, 'user');
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(sample.bot, 'bot');
            }, 1500);
        }, 800);
    }, 500);
}

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced message function with accessibility
const originalAddMessage = addMessage;
addMessage = function(content, sender, isHTML = false) {
    originalAddMessage(content, sender, isHTML);
    
    // Announce new messages to screen readers
    if (sender === 'bot') {
        const textContent = isHTML ? content.replace(/<[^>]*>/g, '') : content;
        announceToScreenReader(`Bot says: ${textContent}`);
    }
};