// MindCare AI JavaScript Functions

// Global variables
let isTyping = false;
let lastActivity = Date.now();

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is inactive for too long
    setInterval(checkInactivity, 300000); // Check every 5 minutes

    // Add event listeners
    document.addEventListener('click', updateActivity);
    document.addEventListener('keypress', updateActivity);

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Update user activity timestamp
function updateActivity() {
    lastActivity = Date.now();
}

// Check for user inactivity
function checkInactivity() {
    const inactiveTime = Date.now() - lastActivity;
    const fiveMinutes = 5 * 60 * 1000;

    if (inactiveTime > fiveMinutes) {
        showInactivityReminder();
    }
}

// Show inactivity reminder
function showInactivityReminder() {
    if (document.getElementById('chatMessages')) {
        addMessageToChat('bot', '💭 I noticed you've been quiet for a while. Remember, I'm here whenever you need support. How are you feeling right now?');
    }
}

// Validate form inputs
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Show loading spinner
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="spinner-border spinner-border-sm me-2" role="status"></div>Loading...';
    }
}

// Hide loading spinner
function hideLoading(elementId, originalText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = originalText;
    }
}

// Format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
        return 'Just now';
    } else if (diffHours < 24) {
        return Math.floor(diffHours) + 'h ago';
    } else {
        return date.toLocaleDateString();
    }
}

// Emotion-based responses
const emotionResponses = {
    happy: {
        emoji: '😊',
        color: 'success',
        suggestions: [
            'Share what made you happy!',
            'Keep that positive energy!',
            'What's bringing you joy today?'
        ]
    },
    sad: {
        emoji: '😢',
        color: 'primary',
        suggestions: [
            'It's okay to feel sad sometimes',
            'Want to talk about it?',
            'Let's try a breathing exercise'
        ]
    },
    anxious: {
        emoji: '😰',
        color: 'warning',
        suggestions: [
            'Let's practice deep breathing',
            'Try the 5-4-3-2-1 grounding technique',
            'Focus on what you can control'
        ]
    },
    stressed: {
        emoji: '😣',
        color: 'danger',
        suggestions: [
            'Take a moment to breathe',
            'Let's prioritize your tasks',
            'Remember to be kind to yourself'
        ]
    },
    angry: {
        emoji: '😠',
        color: 'dark',
        suggestions: [
            'Take deep breaths',
            'Count to 10 slowly',
            'What triggered this feeling?'
        ]
    },
    neutral: {
        emoji: '😐',
        color: 'secondary',
        suggestions: [
            'How can I support you today?',
            'What's on your mind?',
            'Any particular topic you'd like to discuss?'
        ]
    }
};

// Get emotion-specific response
function getEmotionResponse(emotion) {
    return emotionResponses[emotion] || emotionResponses.neutral;
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showToast('Copied to clipboard!', 'success');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Generate random motivational quote
function getMotivationalQuote() {
    const quotes = [
        "Every day is a new beginning. Take a deep breath and start again.",
        "You are stronger than you think and more capable than you imagine.",
        "Progress, not perfection, is the goal.",
        "Your mental health is just as important as your physical health.",
        "It's okay to not be okay sometimes. Healing takes time.",
        "You matter. Your feelings are valid. You are not alone.",
        "Small steps every day lead to big changes over time.",
        "Be patient with yourself. Growth takes time.",
        "You've survived 100% of your worst days. You're doing great.",
        "Your current situation is not your final destination."
    ];

    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Show random motivational quote
function showMotivationalQuote() {
    const quote = getMotivationalQuote();
    if (typeof addMessageToChat === 'function') {
        addMessageToChat('bot', `✨ ${quote}`);
    }
}

// Emergency resources
const emergencyResources = {
    crisis: {
        title: "Crisis Support",
        resources: [
            { name: "National Suicide Prevention Lifeline", contact: "988", type: "phone" },
            { name: "Crisis Text Line", contact: "Text HOME to 741741", type: "text" },
            { name: "Emergency Services", contact: "911", type: "emergency" }
        ]
    },
    support: {
        title: "Mental Health Support",
        resources: [
            { name: "NAMI HelpLine", contact: "1-800-950-NAMI (6264)", type: "phone" },
            { name: "SAMHSA National Helpline", contact: "1-800-662-4357", type: "phone" },
            { name: "BetterHelp", contact: "www.betterhelp.com", type: "website" }
        ]
    }
};

// Show emergency resources
function showEmergencyResources() {
    let resourcesHtml = '<div class="emergency-resources"><h5>🆘 Emergency Resources</h5>';

    Object.values(emergencyResources).forEach(category => {
        resourcesHtml += `<h6>${category.title}</h6><ul>`;
        category.resources.forEach(resource => {
            resourcesHtml += `<li><strong>${resource.name}:</strong> ${resource.contact}</li>`;
        });
        resourcesHtml += '</ul>';
    });

    resourcesHtml += '</div>';

    if (typeof addMessageToChat === 'function') {
        addMessageToChat('bot', resourcesHtml);
    }
}

// Detect if message contains crisis keywords
function detectCrisisKeywords(message) {
    const crisisKeywords = [
        'suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself',
        'self harm', 'cutting', 'overdose', 'jump off', 'gun', 'pills'
    ];

    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Handle potential crisis situation
function handleCrisisDetection(message) {
    if (detectCrisisKeywords(message)) {
        setTimeout(() => {
            if (typeof addMessageToChat === 'function') {
                addMessageToChat('bot', '🚨 I'm concerned about what you've shared. Please know that you're not alone, and help is available. If you're in immediate danger, please contact emergency services (911) or the National Suicide Prevention Lifeline (988). Would you like me to provide more resources?');
            }
        }, 1000);
        return true;
    }
    return false;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        showToast,
        getMotivationalQuote,
        detectCrisisKeywords,
        handleCrisisDetection
    };
}