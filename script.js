// DOM Elements
let settingsMenu = document.querySelector(".settings-menu");
let darkBtn = document.getElementById("dark-btn");

// Toggle settings menu
function settingsMenuToggle() {
    settingsMenu.classList.toggle("settings-menu-height");
}

// Dark mode functionality
if (darkBtn) {
    darkBtn.onclick = function() {
        darkBtn.classList.toggle("dark-btn-on");
        document.body.classList.toggle("dark-theme");
        
        // Save to localStorage
        if (localStorage.getItem("theme") == "light") {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    }
}

// Load theme from localStorage
function loadTheme() {
    if (localStorage.getItem("theme") == "dark") {
        darkBtn.classList.add("dark-btn-on");
        document.body.classList.add("dark-theme");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load theme
    loadTheme();
    
    // Close settings menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-user-icon') && 
            !event.target.closest('.settings-menu')) {
            settingsMenu.classList.remove('settings-menu-height');
        }
    });
    
    // Initialize search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // Initialize dark mode toggle in settings
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (darkBtn) darkBtn.click();
        });
    }
});

// Search functionality
function performSearch(query) {
    if (query.trim()) {
        alert(`Searching for: ${query}`);
        // In a real app, you would navigate to search results
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('user');
        // Redirect to login (in a real app)
        alert('Logged out successfully');
        router.navigate('/');
    }
}

// Post interaction functions
function likePost(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (post) {
        const likeBtn = post.querySelector('.like-btn');
        const likeCount = post.querySelector('.like-count');
        
        if (likeBtn.classList.contains('liked')) {
            likeBtn.classList.remove('liked');
            likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i> Like';
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
        } else {
            likeBtn.classList.add('liked');
            likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i> Liked';
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        }
    }
}

// Comment functionality
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        commentsSection.style.display = 
            commentsSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Share functionality
function sharePost(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (post) {
        const shareUrl = window.location.origin + '/post/' + postId;
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    }
}

// Friend request functions
function acceptFriend(userId) {
    console.log('Friend request accepted:', userId);
    // Update UI
    const requestItem = document.querySelector(`[data-user-id="${userId}"]`);
    if (requestItem) {
        requestItem.innerHTML = '<p>Now friends!</p>';
    }
}

function declineFriend(userId) {
    console.log('Friend request declined:', userId);
    // Remove from UI
    const requestItem = document.querySelector(`[data-user-id="${userId}"]`);
    if (requestItem) {
        requestItem.remove();
    }
}

// Notification functions
function markAsRead(notificationId) {
    const notification = document.querySelector(`[data-notification-id="${notificationId}"]`);
    if (notification) {
        notification.classList.remove('unread');
        // Update badge count
        updateNotificationBadge(-1);
    }
}

function updateNotificationBadge(change) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        let count = parseInt(badge.textContent) + change;
        if (count <= 0) {
            badge.style.display = 'none';
        } else {
            badge.textContent = count;
            badge.style.display = 'flex';
        }
    }
}

// Messenger functions
function startNewConversation(userId) {
    console.log('Starting conversation with user:', userId);
    router.navigate('/messenger');
}

// Theme toggle shortcut (Ctrl+Shift+D)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (darkBtn) darkBtn.click();
    }
});
