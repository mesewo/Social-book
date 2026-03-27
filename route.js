// class Router {
//     constructor() {
//         this.routes = {};
//         this.currentPath = '';
//         this.init();
//     }

//     init() {
//         // Define all routes
//         this.routes = {
//             '/': 'home',
//             '/profile': 'profile',
//             '/messenger': 'messenger',
//             '/notifications': 'notifications',
//             '/watch': 'watch',
//             '/friends': 'friends',
//             '/groups': 'groups',
//             '/marketplace': 'marketplace'
//         };

//         // Handle link clicks
//         document.addEventListener('click', (e) => {
//             const link = e.target.closest('a[href^="/"]');
//             if (link && link.getAttribute('href') !== '#') {
//                 e.preventDefault();
//                 const path = link.getAttribute('href');
//                 this.navigate(path, e);
//             }
//         });

//         // Handle back/forward buttons
//         window.addEventListener('popstate', () => {
//             this.loadRoute(window.location.pathname);
//         });

//         // Load initial route
//         this.loadRoute(window.location.pathname || '/');
//     }

//     navigate(path, event = null) {
//         if (event) event.preventDefault();
        
//         if (this.currentPath !== path) {
//             window.history.pushState({}, '', path);
//             this.loadRoute(path);
//         }
//     }

//     async loadRoute(path) {
//         this.currentPath = path;
        
//         // Update active navigation
//         this.updateActiveNav(path);
        
//         // Show loading spinner
//         this.showLoading();
        
//         try {
//             // Load page content
//             const content = await this.getPageContent(path);
            
//             // Update main content
//             document.getElementById('page-content').innerHTML = content;
            
//             // Load sidebars
//             await this.loadSidebars(path);
            
//             // Initialize page-specific scripts
//             this.initPageScripts(path);
            
//         } catch (error) {
//             console.error('Error loading route:', error);
//             document.getElementById('page-content').innerHTML = `
//                 <div class="error-container">
//                     <h2>Page Not Found</h2>
//                     <p>The page you're looking for doesn't exist.</p>
//                     <button class="btn btn-primary" onclick="router.navigate('/')">Go Home</button>
//                 </div>
//             `;
//         }
        
//         // Hide loading spinner
//         this.hideLoading();
//     }

//     updateActiveNav(path) {
//         // Remove active class from all nav items
//         document.querySelectorAll('.nav-icon').forEach(item => {
//             item.classList.remove('active');
//         });
        
//         // Add active class to current nav item
//         const activeNav = document.querySelector(`.nav-icon[href="${path}"]`);
//         if (activeNav) {
//             activeNav.classList.add('active');
//         }
//     }

//     showLoading() {
//         document.getElementById('page-content').innerHTML = `
//             <div class="loading-spinner">
//                 <div class="spinner"></div>
//             </div>
//         `;
//     }

//     hideLoading() {
//         // Spinner will be replaced by content
//     }

//     async getPageContent(path) {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 300));
        
//         const pageData = {
//             '/': this.getHomePage(),
//             '/profile': this.getProfilePage(),
//             '/messenger': this.getMessengerPage(),
//             '/notifications': this.getNotificationsPage(),
//             '/watch': this.getWatchPage(),
//             '/friends': this.getFriendsPage(),
//             '/groups': this.getGroupsPage(),
//             '/marketplace': this.getMarketplacePage()
//         };

//         return pageData[path] || this.getNotFoundPage();
//     }

//     async loadSidebars(path) {
//         const leftSidebar = document.getElementById('left-sidebar');
//         const rightSidebar = document.getElementById('right-sidebar');
        
//         // Default sidebars for most pages
//         if (path === '/' || path === '/profile') {
//             leftSidebar.innerHTML = this.getLeftSidebar();
//             rightSidebar.innerHTML = this.getRightSidebar();
//             leftSidebar.style.display = 'block';
//             rightSidebar.style.display = 'block';
//         } else {
//             // Hide sidebars for other pages
//             leftSidebar.style.display = 'none';
//             rightSidebar.style.display = 'none';
//         }
//     }

//     initPageScripts(path) {
//         // Initialize scripts based on current page
//         switch(path) {
//             case '/':
//                 this.initHomePage();
//                 break;
//             case '/messenger':
//                 this.initMessengerPage();
//                 break;
//             case '/profile':
//                 this.initProfilePage();
//                 break;
//             // Add other pages as needed
//         }
//     }

//     // Page Content Generators
//     getHomePage() {
//         return `
//             <div class="story-gallery">
//                 <div class="story">
//                     <div class="story-add">
//                         <i class="fas fa-plus"></i>
//                     </div>
//                     <img src="images/status-1.png" class="story-img">
//                     <p class="story-name">Create Story</p>
//                 </div>
//                 <div class="story">
//                     <img src="images/member-1.png" class="story-profile">
//                     <img src="images/status-2.png" class="story-img">
//                     <p class="story-name">Aster</p>
//                 </div>
//                 <!-- Add more stories -->
//             </div>

//             <div class="write-post-container">
//                 <div class="user-profile">
//                     <img src="images/profile-pic.png">
//                     <div>
//                         <p>Abebe Tekola</p>
//                         <small>Public <i class="fas fa-caret-down"></i></small>
//                     </div>
//                 </div>
//                 <div class="post-input-container">
//                     <textarea id="post-text" rows="3" placeholder="What's on your mind, Abebe?"></textarea>
//                     <div class="add-post-links">
//                         <a href="#"><i class="fas fa-video"></i> Live Video</a>
//                         <a href="#"><i class="fas fa-photo-video"></i> Photo/Video</a>
//                         <a href="#"><i class="fas fa-smile"></i> Feeling/Activity</a>
//                     </div>
//                 </div>
//             </div>

//             <div id="posts-container">
//                 <!-- Posts will be loaded here -->
//             </div>
            
//             <button class="load-more-btn" onclick="loadMorePosts()">
//                 <i class="fas fa-spinner"></i> Load More Posts
//             </button>
//         `;
//     }

//     getProfilePage() {
//         return `
//             <div class="profile-header">
//                 <div class="cover-photo">
//                     <button class="edit-cover-btn">
//                         <i class="fas fa-camera"></i> Edit Cover Photo
//                     </button>
//                 </div>
//                 <div class="profile-info">
//                     <img src="images/profile-pic.png" class="profile-pic-large">
//                     <div class="profile-details">
//                         <h1 class="profile-name">Abebe Tekola</h1>
//                         <div class="profile-stats">
//                             <span><strong>500</strong> friends</span>
//                             <span><strong>45</strong> mutual friends</span>
//                         </div>
//                         <div class="profile-actions">
//                             <button class="btn btn-primary">
//                                 <i class="fas fa-plus"></i> Add Friend
//                             </button>
//                             <button class="btn btn-secondary">
//                                 <i class="fas fa-message"></i> Message
//                             </button>
//                             <button class="btn btn-secondary">
//                                 <i class="fas fa-ellipsis"></i>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="profile-tabs">
//                 <button class="profile-tab active">Posts</button>
//                 <button class="profile-tab">About</button>
//                 <button class="profile-tab">Friends</button>
//                 <button class="profile-tab">Photos</button>
//                 <button class="profile-tab">Videos</button>
//             </div>

//             <div class="profile-content">
//                 <div class="write-post-container">
//                     <div class="user-profile">
//                         <img src="images/profile-pic.png">
//                         <div>
//                             <p>Abebe Tekola</p>
//                             <small>Public <i class="fas fa-caret-down"></i></small>
//                         </div>
//                     </div>
//                     <div class="post-input-container">
//                         <textarea placeholder="What's on your mind, Abebe?"></textarea>
//                     </div>
//                 </div>
                
//                 <div id="profile-posts">
//                     <!-- Profile posts will be loaded here -->
//                 </div>
//             </div>
//         `;
//     }

//     getMessengerPage() {
//         return `
//             <h1 class="page-title">Messenger</h1>
//             <div class="messenger-container">
//                 <div class="conversations-list">
//                     <div class="conversation-search">
//                         <input type="text" placeholder="Search messages" class="search-input">
//                     </div>
//                     <div class="conversation-item active">
//                         <img src="images/member-1.png" class="conversation-avatar">
//                         <div>
//                             <h4>Aster Kebede</h4>
//                             <p>Hey! How are you doing?</p>
//                         </div>
//                     </div>
//                     <!-- More conversations -->
//                 </div>
                
//                 <div class="chat-area">
//                     <div class="chat-header">
//                         <img src="images/member-1.png" class="conversation-avatar">
//                         <div>
//                             <h3>Aster Kebede</h3>
//                             <small>Active now</small>
//                         </div>
//                     </div>
                    
//                     <div class="messages-container" id="messages-container">
//                         <!-- Messages will be loaded here -->
//                     </div>
                    
//                     <div class="message-input-container">
//                         <input type="text" class="message-input" placeholder="Type a message...">
//                         <button class="btn btn-primary">
//                             <i class="fas fa-paper-plane"></i> Send
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     getNotificationsPage() {
//         return `
//             <h1 class="page-title">Notifications</h1>
//             <div class="notifications-list">
//                 <div class="notification-item unread">
//                     <img src="images/member-1.png" class="notification-avatar">
//                     <div>
//                         <p><strong>Aster Kebede</strong> liked your post</p>
//                         <span class="notification-time">2 minutes ago</span>
//                     </div>
//                 </div>
//                 <!-- More notifications -->
//             </div>
//         `;
//     }

//     getLeftSidebar() {
//         return `
//             <div class="imp-links">
//                 <a href="/profile" onclick="router.navigate('/profile', event)">
//                     <i class="fas fa-user"></i> My Profile
//                 </a>
//                 <a href="/friends" onclick="router.navigate('/friends', event)">
//                     <i class="fas fa-users"></i> Friends
//                 </a>
//                 <a href="/groups" onclick="router.navigate('/groups', event)">
//                     <i class="fas fa-user-group"></i> Groups
//                 </a>
//                 <a href="/marketplace" onclick="router.navigate('/marketplace', event)">
//                     <i class="fas fa-store"></i> Marketplace
//                 </a>
//                 <a href="/watch" onclick="router.navigate('/watch', event)">
//                     <i class="fas fa-play-circle"></i> Watch
//                 </a>
//             </div>
//         `;
//     }

//     getRightSidebar() {
//         return `
//             <div class="sidebar-title">
//                 <h4>Birthdays</h4>
//             </div>
//             <div class="birthday-item">
//                 <i class="fas fa-birthday-cake"></i>
//                 <p><strong>Aster Kebede</strong> has a birthday today</p>
//             </div>
            
//             <div class="sidebar-title">
//                 <h4>Contacts</h4>
//                 <a href="#"><i class="fas fa-video"></i></a>
//                 <a href="#"><i class="fas fa-search"></i></a>
//                 <a href="#"><i class="fas fa-ellipsis"></i></a>
//             </div>
            
//             <div class="online-list">
//                 <div class="online">
//                     <img src="images/member-1.png">
//                 </div>
//                 <p>Aster Kebede</p>
//             </div>
//             <!-- More contacts -->
//         `;
//     }

//     // Add other page generators here...
//     getWatchPage() { return '<h1>Watch Page</h1>'; }
//     getFriendsPage() { return '<h1>Friends Page</h1>'; }
//     getGroupsPage() { return '<h1>Groups Page</h1>'; }
//     getMarketplacePage() { return '<h1>Marketplace Page</h1>'; }
//     getNotFoundPage() { return '<h1>Page Not Found</h1>'; }

//     // Page Initializers
//     initHomePage() {
//         // Load posts
//         this.loadPosts();
        
//         // Initialize post creation
//         const postTextarea = document.getElementById('post-text');
//         if (postTextarea) {
//             postTextarea.addEventListener('keypress', (e) => {
//                 if (e.key === 'Enter' && !e.shiftKey && postTextarea.value.trim()) {
//                     this.createPost(postTextarea.value);
//                     postTextarea.value = '';
//                 }
//             });
//         }
//     }

//     initMessengerPage() {
//         const messageInput = document.querySelector('.message-input');
//         const sendButton = document.querySelector('.message-input-container .btn');
        
//         if (messageInput && sendButton) {
//             const sendMessage = () => {
//                 const text = messageInput.value.trim();
//                 if (text) {
//                     this.addMessage(text, 'sent');
//                     messageInput.value = '';
                    
//                     // Simulate reply after 1 second
//                     setTimeout(() => {
//                         this.addMessage('Thanks for your message!', 'received');
//                     }, 1000);
//                 }
//             };
            
//             messageInput.addEventListener('keypress', (e) => {
//                 if (e.key === 'Enter') sendMessage();
//             });
            
//             sendButton.addEventListener('click', sendMessage);
//         }
//     }

//     // Utility Methods
//     loadPosts() {
//         const posts = [
//             {
//                 id: 1,
//                 user: { name: 'Abebe Tekola', avatar: 'images/profile-pic.png' },
//                 time: '2 hours ago',
//                 content: 'Just finished an amazing project! #coding #webdev',
//                 image: 'images/feed-image-1.png',
//                 likes: 120,
//                 comments: 45,
//                 shares: 12
//             },
//             // Add more posts
//         ];
        
//         const container = document.getElementById('posts-container');
//         if (container) {
//             container.innerHTML = posts.map(post => this.createPostHTML(post)).join('');
//         }
//     }

//     createPostHTML(post) {
//         return `
//             <div class="post-container">
//                 <div class="post-header">
//                     <img src="${post.user.avatar}" class="post-avatar">
//                     <div>
//                         <h4>${post.user.name}</h4>
//                         <small>${post.time}</small>
//                     </div>
//                 </div>
//                 <p class="post-content">${post.content}</p>
//                 ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
//                 <div class="post-stats">
//                     <span>${post.likes} likes</span>
//                     <span>${post.comments} comments</span>
//                     <span>${post.shares} shares</span>
//                 </div>
//                 <div class="post-actions">
//                     <button class="post-action-btn" onclick="likePost(${post.id})">
//                         <i class="fas fa-thumbs-up"></i> Like
//                     </button>
//                     <button class="post-action-btn">
//                         <i class="fas fa-comment"></i> Comment
//                     </button>
//                     <button class="post-action-btn">
//                         <i class="fas fa-share"></i> Share
//                     </button>
//                 </div>
//             </div>
//         `;
//     }

//     createPost(content) {
//         const post = {
//             id: Date.now(),
//             user: { name: 'Abebe Tekola', avatar: 'images/profile-pic.png' },
//             time: 'Just now',
//             content: content,
//             likes: 0,
//             comments: 0,
//             shares: 0
//         };
        
//         const container = document.getElementById('posts-container');
//         if (container) {
//             container.insertAdjacentHTML('afterbegin', this.createPostHTML(post));
//         }
//     }

//     addMessage(text, type) {
//         const container = document.getElementById('messages-container');
//         if (container) {
//             const messageDiv = document.createElement('div');
//             messageDiv.className = `message message-${type}`;
//             messageDiv.textContent = text;
//             container.appendChild(messageDiv);
//             container.scrollTop = container.scrollHeight;
//         }
//     }
// }

// // Initialize router globally
// const router = new Router();

// // Global helper functions
// function loadMorePosts() {
//     const button = document.querySelector('.load-more-btn');
//     if (button) {
//         button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
//         setTimeout(() => {
//             router.loadPosts();
//             button.innerHTML = '<i class="fas fa-spinner"></i> Load More Posts';
//         }, 1000);
//     }
// }

// function likePost(postId) {
//     // Implement like functionality
//     console.log('Liked post:', postId);
// }
