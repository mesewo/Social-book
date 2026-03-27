// Navigation and Routing System
let currentPage = 'home';
let settingsMenu = document.querySelector(".settings-menu");
let darkBtn = document.getElementById("dark-btn");

// Page templates
const pageTemplates = {
    home: `
        <div class="container">
            <div class="left-sidebar">
                <div class="imp-links">
                    <a href="#" onclick="navigateTo('home')">
                        <img src="images/news.png">
                        Latest News
                    </a>
                    <a href="#" onclick="navigateTo('friends')">
                        <img src="images/friends.png">
                        Friends
                    </a>
                    <a href="#" onclick="navigateTo('groups')">
                        <img src="images/group.png">
                        Group
                    </a>
                    <a href="#" onclick="navigateTo('marketplace')">
                        <img src="images/marketplace.png">
                        Marketplace
                    </a>
                    <a href="#" onclick="navigateTo('watch')">
                        <img src="images/watch.png">
                        Watch
                    </a>
                    <a href="#">
                        See More...
                    </a>
                </div>
                <div class="shortcut-links">
                    <p>Your Shortcuts</p>
                    <a href="#"><img src="images/shortcut-1.png">Web Developers</a>
                    <a href="#"><img src="images/shortcut-2.png">Web Design Course</a>
                    <a href="#"><img src="images/shortcut-3.png">Full Stack Development</a>
                    <a href="#"><img src="images/shortcut-4.png">Website Experts</a>
                </div>
            </div>

            <div class="main-content">
                <div class="story-gallery">
                    <div class="story story1">
                        <div class="background"></div>
                        <img src="images/upload.png">
                        <p>Post Story</p>
                    </div>
                    <div class="story story2">
                        <div class="background"></div>
                        <img src="images/member-1.png">
                        <p>Aster</p>
                    </div>
                    <div class="story story3">
                        <div class="background"></div>
                        <img src="images/member-2.png">
                        <p>Demlewo</p>
                    </div>
                    <div class="story story4">
                        <div class="background"></div>
                        <img src="images/member-3.png">
                        <p>Birtalu</p>
                    </div>
                    <div class="story story5">
                        <div class="background"></div>
                        <img src="images/member-4.png">
                        <p>Damtewo</p>
                    </div>
                </div>

                <div class="write-post-container">
                    <div class="user-profile">
                        <img src="images/profile-pic.png">
                        <div>
                            <p>Abebe Tekola</p>
                            <small>Public <i class="fa-solid fa-caret-down"></i></small>
                        </div>
                    </div>

                    <div class="post-input-container">
                        <textarea rows="3" placeholder="What's on your mind, Abebe?" id="post-textarea"></textarea>
                        <div class="add-post-links">
                            <a href="#"><img src="images/live-video.png">Live Video</a>
                            <a href="#"><img src="images/photo.png">Photo/Video</a>
                            <a href="#"><img src="images/feeling.png">Feeling Activity</a>
                        </div>
                    </div>
                </div>

                <div id="posts-container">
                    <!-- Posts will be loaded here -->
                </div>
            </div>

            <div class="right-sidebar">
                <div class="sidebar-title">
                    <h4>Events</h4>
                    <a href="#">See All</a>
                </div>
                <div class="event">
                    <div class="left-event">
                        <h3>18</h3>
                        <span>March</span>
                    </div>
                    <div class="right-event">
                        <h4>Social Media</h4>
                        <p><i class="fa-solid fa-location-dot"></i>University of Gondar</p>
                        <a href="#">More Info</a>
                    </div>
                </div>
                <div class="event">
                    <div class="left-event">
                        <h3>22</h3>
                        <span>June</span>
                    </div>
                    <div class="right-event">
                        <h4>Mobile Marketing</h4>
                        <p><i class="fa-solid fa-location-dot"></i>University of Gondar</p>
                        <a href="#">More Info</a>
                    </div>
                </div>
                <div class="sidebar-title">
                    <h4>Advertisement</h4>
                    <a href="#">Close</a>
                </div>
                <img src="images/advertisement.png" class="sidebar-adds">

                <div class="sidebar-title">
                    <h4>Conversation</h4>
                    <a href="#">Hide Chat</a>
                </div>

                <div class="online-list">
                    <div class="online">
                        <img src="images/member-1.png">
                    </div>
                    <p>Aster Kebede</p>
                </div>

                <div class="online-list">
                    <div class="online">
                        <img src="images/member-2.png">
                    </div>
                    <p>Damtewo Demse</p>
                </div>
                <div class="online-list">
                    <div class="online">
                        <img src="images/member-3.png">
                    </div>
                    <p>Birtalu Fendka</p>
                </div>
            </div>
        </div>
    `,
    
    profile: `
        <div class="container">
            <div class="profile-header">
                <div class="cover-photo">
                    <button class="edit-cover-btn" style="position: absolute; bottom: 20px; right: 20px; background: white; padding: 8px 15px; border-radius: 6px; border: none; cursor: pointer;">
                        <i class="fas fa-camera"></i> Edit Cover Photo
                    </button>
                </div>
                <div class="profile-info">
                    <img src="images/profile-pic.png" class="profile-pic-large">
                    <div>
                        <h2>Abebe Tekola</h2>
                        <p>500 friends · University of Gondar</p>
                        <div class="profile-actions">
                            <button class="btn btn-primary">Add to Story</button>
                            <button class="btn btn-secondary">Edit Profile</button>
                            <button class="btn btn-secondary">···</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="main-content">
                <div class="profile-details" style="background: var(--bg-color); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>Details</h3>
                    <p><i class="fas fa-graduation-cap"></i> Studied at University of Gondar</p>
                    <p><i class="fas fa-home"></i> Lives in Gondar, Ethiopia</p>
                    <p><i class="fas fa-map-marker-alt"></i> From Addis Ababa, Ethiopia</p>
                    <p><i class="fas fa-heart"></i> Single</p>
                </div>
                
                <div class="write-post-container">
                    <div class="user-profile">
                        <img src="images/profile-pic.png">
                        <div>
                            <p>Abebe Tekola</p>
                            <small>Public <i class="fa-solid fa-caret-down"></i></small>
                        </div>
                    </div>
                    <div class="post-input-container">
                        <textarea rows="3" placeholder="What's on your mind, Abebe?"></textarea>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    messenger: `
        <div class="container">
            <div class="messenger-container">
                <h2 class="page-title">Messenger</h2>
                <div class="message-thread">
                    <div class="message-header">
                        <img src="images/member-1.png" width="40" style="border-radius: 50%; margin-right: 10px;">
                        <div>
                            <h4>Aster Kebede</h4>
                            <small>Active now</small>
                        </div>
                    </div>
                    <div class="message-content">
                        <p>Hey! How are you doing?</p>
                    </div>
                </div>
                
                <div class="message-input">
                    <input type="text" placeholder="Type a message...">
                    <button>Send</button>
                </div>
            </div>
        </div>
    `,
    
    notifications: `
        <div class="container">
            <h2 class="page-title">Notifications</h2>
            <div class="notification-item unread">
                <img src="images/member-1.png" class="notification-avatar">
                <div>
                    <p><strong>Aster Kebede</strong> liked your post</p>
                    <span class="notification-time">2 minutes ago</span>
                </div>
            </div>
            <div class="notification-item">
                <img src="images/member-2.png" class="notification-avatar">
                <div>
                    <p><strong>Damtewo Demse</strong> commented on your photo</p>
                    <span class="notification-time">1 hour ago</span>
                </div>
            </div>
        </div>
    `,
    
    watch: `
        <div class="container">
            <h2 class="page-title">Watch</h2>
            <p>Watch videos from your friends and favorite creators.</p>
        </div>
    `,
    
    friends: `
        <div class="container">
            <h2 class="page-title">Friends</h2>
            <p>Connect with your friends.</p>
        </div>
    `,
    
    groups: `
        <div class="container">
            <h2 class="page-title">Groups</h2>
            <p>Join groups with people who share your interests.</p>
        </div>
    `,
    
    marketplace: `
        <div class="container">
            <h2 class="page-title">Marketplace</h2>
            <p>Buy and sell items in your local community.</p>
        </div>
    `
};

// Navigation function
function navigateTo(page) {
    if (page === currentPage) return;
    
    // Update active navigation
    document.querySelectorAll('.nav-icon').forEach(nav => {
        nav.classList.remove('active');
    });
    document.getElementById(`nav-${page}`).classList.add('active');
    
    // Show loading
    document.getElementById('app-container').innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    `;
    
    // Update current page
    currentPage = page;
    
    // Load page content after short delay
    setTimeout(() => {
        loadPage(page);
    }, 300);
}

// Load page content
function loadPage(page) {
    const appContainer = document.getElementById('app-container');
    
    if (pageTemplates[page]) {
        appContainer.innerHTML = pageTemplates[page];
        
        // Initialize page-specific functionality
        if (page === 'home') {
            initializeHomePage();
        } else if (page === 'messenger') {
            initializeMessengerPage();
        }
    } else {
        appContainer.innerHTML = '<h2>Page not found</h2>';
    }
}

// Initialize home page
function initializeHomePage() {
    // Load posts
    loadPosts();
    
    // Setup post creation
    const textarea = document.getElementById('post-textarea');
    if (textarea) {
        textarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey && this.value.trim()) {
                createPost(this.value);
                this.value = '';
            }
        });
    }
}

// Load sample posts
function loadPosts() {
    const posts = [
        {
            user: { name: 'Abebe Tekola', avatar: 'images/profile-pic.png' },
            time: 'June 24 2024, 10:50 AM',
            content: 'I am <span>doing</span> some work stu. <a href="#">#Mesewo</a> <a href="#">#Kewose</a>',
            image: 'images/feed-image-1.png',
            likes: 120,
            comments: 45,
            shares: 12
        },
        {
            user: { name: 'Yordi Zeberga', avatar: 'images/photo1.png' },
            time: 'June 24 2024, 10:50 AM',
            content: 'I am <span>doing</span> some work stu. <a href="#">#Mesewo</a> <a href="#">#Kewose</a>',
            image: 'images/feed-image-2.png',
            likes: 120,
            comments: 230,
            shares: 20
        }
    ];
    
    const container = document.getElementById('posts-container');
    if (container) {
        container.innerHTML = posts.map(post => createPostHTML(post)).join('');
    }
}

// Create post HTML
function createPostHTML(post) {
    return `
        <div class="post-container">
            <div class="post-row">
                <div class="user-profile">
                    <img src="${post.user.avatar}">
                    <div>
                        <p>${post.user.name}</p>
                        <span>${post.time}</span>
                    </div>
                </div>
                <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
            <p class="post-text">${post.content}</p>
            <img src="${post.image}" class="post-img">
            <div class="post-row">
                <div class="activity-icons">
                    <div><img src="images/like-blue.png">${post.likes}</div>
                    <div><img src="images/comments.png">${post.comments}</div>
                    <div><img src="images/share.png">${post.shares}</div>
                </div>
                <div class="post-profile-icon">
                    <img src="images/profile-pic.png"><i class="fa-solid fa-caret-down"></i>
                </div>
            </div>
        </div>
    `;
}

// Create new post
function createPost(content) {
    const post = {
        user: { name: 'Abebe Tekola', avatar: 'images/profile-pic.png' },
        time: 'Just now',
        content: content,
        likes: 0,
        comments: 0,
        shares: 0
    };
    
    const container = document.getElementById('posts-container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', createPostHTML(post));
    }
}

// Initialize messenger page
function initializeMessengerPage() {
    const messageInput = document.querySelector('.message-input input');
    const sendButton = document.querySelector('.message-input button');
    
    if (messageInput && sendButton) {
        sendButton.addEventListener('click', function() {
            sendMessage(messageInput.value);
            messageInput.value = '';
        });
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(this.value);
                this.value = '';
            }
        });
    }
}

// Send message
function sendMessage(text) {
    if (text.trim()) {
        const thread = document.querySelector('.message-thread');
        if (thread) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message-content';
            messageDiv.style.marginLeft = '0';
            messageDiv.style.backgroundColor = '#1876f2';
            messageDiv.style.color = 'white';
            messageDiv.innerHTML = `<p>${text}</p>`;
            thread.appendChild(messageDiv);
        }
    }
}

// Settings menu toggle
function settingsMenuToggle() {
    if (settingsMenu) {
        settingsMenu.classList.toggle("settings-menu-height");
    }
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
        if (darkBtn) darkBtn.classList.add("dark-btn-on");
        document.body.classList.add("dark-theme");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully');
        navigateTo('home');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load theme
    loadTheme();
    
    // Setup dark mode toggle in settings
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (darkBtn) darkBtn.click();
        });
    }
    
    // Close settings menu when clicking outside
    document.addEventListener('click', function(event) {
        if (settingsMenu && 
            !event.target.closest('.nav-user-icon') && 
            !event.target.closest('.settings-menu')) {
            settingsMenu.classList.remove('settings-menu-height');
        }
    });
    
    // Setup search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                alert('Searching for: ' + this.value);
                this.value = '';
            }
        });
    }
    
    // Load initial page (home)
    navigateTo('home');
    
    // Mark home as active
    document.getElementById('nav-home').classList.add('active');
});
