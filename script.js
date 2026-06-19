// DOM Elements
let settingsMenu = document.querySelector(".settings-menu");
let darkBtn = document.getElementById("dark-btn");

// Toggle settings menu with proper event delegation
function settingsMenuToggle() {
    if (settingsMenu) {
        settingsMenu.classList.toggle("settings-menu-height");
    }
}

// Dark mode functionality
function initDarkMode() {
    if (!darkBtn) return;
    
    const toggleDarkMode = () => {
        darkBtn.classList.toggle("dark-btn-on");
        document.body.classList.toggle("dark-theme");
        
        // Save to localStorage
        const currentTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);
    };
    
    darkBtn.addEventListener('click', toggleDarkMode);
}

// Load theme from localStorage
function loadTheme() {
    if (!darkBtn) return;
    
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        darkBtn.classList.add("dark-btn-on");
        document.body.classList.add("dark-theme");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Initialize when DOM is loaded - once only
document.addEventListener('DOMContentLoaded', function() {
    // Load theme
    loadTheme();
    
    // Initialize dark mode
    initDarkMode();
    
    // Close settings menu when clicking outside with delegated event
    const closeSettingsMenuHandler = (event) => {
        if (settingsMenu && 
            !event.target.closest('.nav-user-icon') && 
            !event.target.closest('.settings-menu')) {
            settingsMenu.classList.remove('settings-menu-height');
        }
    };
    
    document.addEventListener('click', closeSettingsMenuHandler);
    
    // Initialize search - use event delegation
    const searchHandler = (e) => {
        if (e.target.id === 'search-input' && e.key === 'Enter') {
            performSearch(e.target.value);
        }
    };
    
    document.addEventListener('keypress', searchHandler);
    
    // Initialize dark mode toggle in settings
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (darkBtn) darkBtn.click();
        });
    }
    
    // Theme toggle shortcut (Ctrl+Shift+D) - single listener
    const themeShortcutHandler = (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            if (darkBtn) darkBtn.click();
        }
    };
    
    document.addEventListener('keydown', themeShortcutHandler);
    
}, { once: true }); // Use 'once' option to prevent duplicate initialization

// Search functionality
function performSearch(query) {
    if (query.trim()) {
        console.log(`Searching for: ${query}`);
        // In a real app, you would navigate to search results
        // router.navigate(`/search?q=${encodeURIComponent(query)}`);
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('user');
        // Redirect to login (in a real app)
        alert('Logged out successfully');
        if (typeof router !== 'undefined') {
            router.navigate('/');
        }
    }
}

// Post interaction functions with efficient DOM queries
function likePost(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (!post) return;
    
    const likeBtn = post.querySelector('.like-btn');
    const likeCount = post.querySelector('.like-count');
    
    if (!likeBtn || !likeCount) return;
    
    const isLiked = likeBtn.classList.contains('liked');
    
    if (isLiked) {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i> Like';
        likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
    } else {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i> Liked';
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
}

// Comment functionality with scoped query
function toggleComments(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (!post) return;
    
    const commentsSection = post.querySelector(`#comments-${postId}`);
    if (commentsSection) {
        commentsSection.classList.toggle('hidden');
    }
}

// Share functionality
function sharePost(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (!post) return;
    
    const shareUrl = window.location.origin + '/post/' + postId;
    
    // Use Clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                console.log('Link copied to clipboard!');
                showNotification('Link copied to clipboard!');
            })
            .catch(err => console.error('Failed to copy:', err));
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        
        document.body.removeChild(textarea);
    }
}

// Friend request functions with efficient DOM queries
function acceptFriend(userId) {
    console.log('Friend request accepted:', userId);
    
    const requestItem = document.querySelector(`[data-user-id="${userId}"]`);
    if (requestItem) {
        requestItem.innerHTML = '<p>Now friends!</p>';
    }
}

function declineFriend(userId) {
    console.log('Friend request declined:', userId);
    
    const requestItem = document.querySelector(`[data-user-id="${userId}"]`);
    if (requestItem) {
        requestItem.remove();
    }
}

// Notification functions with efficient DOM queries
function markAsRead(notificationId) {
    const notification = document.querySelector(`[data-notification-id="${notificationId}"]`);
    if (notification) {
        notification.classList.remove('unread');
        updateNotificationBadge(-1);
    }
}

function updateNotificationBadge(change) {
    const badge = document.querySelector('.notification-badge');
    if (!badge) return;
    
    let count = parseInt(badge.textContent) + change;
    
    if (count <= 0) {
        badge.style.display = 'none';
    } else {
        badge.textContent = count;
        badge.style.display = 'flex';
    }
}

// Messenger functions
function startNewConversation(userId) {
    console.log('Starting conversation with user:', userId);
    if (typeof router !== 'undefined') {
        router.navigate('/messenger');
    }
}

// Notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1876f2;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Add CSS animation
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}
