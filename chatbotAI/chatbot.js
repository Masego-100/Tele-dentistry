// DOM Elements (Second file the one for testing )
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.overlay');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    // Chat elements
    const chatContainer = document.getElementById('chat-container');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const userInput = document.getElementById('user-input');
    const sendButton = document.querySelector('.send-button');
    const typingForm = document.querySelector('.typing-form');
    const headerTitle = document.querySelector('.header-title');
    const clearChatBtn = document.querySelector('[title="Clear Chat"]');
    const themeToggleBtn = document.querySelector('[title="Toggle Theme"]');
    
    // File upload elements
    const fileUpload = document.getElementById('file-upload');
    const filePreview = document.getElementById('file-preview');
    const imagePreview = document.getElementById('image-preview');
    const fileName = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file');
    
    // Voice input
    const voiceInputBtn = document.querySelector('.voice-input-btn');
    
    // Example cards
    const exampleCards = document.querySelectorAll('.example-card');
    
    // API Configuration - IMPORTANT: This should ideally be handled server-side
    // Use environment variables or a backend API to protect your key
    const API_KEY = 'AIzaSyARzLtS2ELsvy019_P58CMAKNYYlMQGpfU'; // Replace with your API key securely
    // Updated to v1 (non-beta) endpoints
    const API_URL_VISION = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent';
    
    // Set username if available
    const username = localStorage.getItem('username') || 'User';
    document.querySelectorAll('#username').forEach(el => el.textContent = username);
    
    // Initialize chat state
    let activeChatId = 'default';
    let isWaitingForResponse = false;
    let selectedFile = null;
    
    // Event Listeners
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
    
    // Handle conversation selection
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all conversations
            conversationItems.forEach(conv => conv.classList.remove('active'));
            
            // Add active class to clicked conversation
            item.classList.add('active');
            
            // Update header title
            const title = item.querySelector('.conversation-title').textContent;
            headerTitle.textContent = title;
            
            // Load conversation (would connect to actual data in production)
            loadConversation(item.dataset.id || 'default');
            
            // Hide welcome screen, show chat
            welcomeScreen.style.display = 'none';
            chatContainer.style.display = 'flex';
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    });
    
    // New chat button
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            // Remove active class from all conversations
            conversationItems.forEach(conv => conv.classList.remove('active'));
            
            // Update header
            headerTitle.textContent = 'New Chat';
            
            // Clear chat container
            clearChat();
            
            // Add initial bot message
            addBotMessage("Hello! I'm your dental assistant AI. How can I help you today?");
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    }
    
    // Send message on form submit
    if (typingForm) {
        typingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sendMessage();
        });
    }
    
    // Send message with send button if available
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            sendMessage();
        });
    }
    
    // Auto-resize textarea
    if (userInput) {
        userInput.addEventListener('input', () => {
            userInput.style.height = 'auto';
            userInput.style.height = (userInput.scrollHeight) + 'px';
            
            // Limit max height
            if (userInput.scrollHeight > 150) {
                userInput.style.overflowY = 'auto';
            } else {
                userInput.style.overflowY = 'hidden';
            }
        });
        
        // Allow Ctrl+Enter or Cmd+Enter to send
        userInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                sendMessage();
                e.preventDefault();
            }
        });
    }
    
    // File upload handling
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                selectedFile = file;
                
                // Display file preview
                filePreview.style.display = 'block';
                fileName.textContent = file.name;
                
                // If it's an image, show preview
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                } else {
                    imagePreview.style.display = 'none';
                }
            }
        });
    }
    
    // Remove selected file
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', () => {
            selectedFile = null;
            fileUpload.value = '';
            filePreview.style.display = 'none';
        });
    }
    
    // Voice input (would need Web Speech API implementation)
    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', () => {
            // Check if browser supports speech recognition
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                
                recognition.lang = 'en-US';
                recognition.interimResults = false;
                
                recognition.start();
                voiceInputBtn.innerHTML = '<i class="fas fa-circle"></i>';
                voiceInputBtn.classList.add('recording');
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    userInput.value = transcript;
                    
                    // Auto resize
                    userInput.style.height = 'auto';
                    userInput.style.height = (userInput.scrollHeight) + 'px';
                };
                
                recognition.onend = function() {
                    voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    voiceInputBtn.classList.remove('recording');
                };
                
                recognition.onerror = function() {
                    voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    voiceInputBtn.classList.remove('recording');
                };
            } else {
                alert('Your browser does not support voice input.');
            }
        });
    }
    
    // Clear chat button
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            // Show confirmation dialog
            if (confirm('Are you sure you want to clear this chat?')) {
                clearChat();
                addBotMessage("Chat cleared. How can I help you today?");
            }
        });
    }
    
    // Theme toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Add animation class
            document.body.classList.add('dark-theme-transition');
            
            // Update icon
            const themeIcon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                document.body.classList.remove('dark-theme-transition');
            }, 500);
        });
        
        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.querySelector('i').className = 'fas fa-sun';
        }
    }
    
    // Example card clicks
    exampleCards.forEach(card => {
        card.addEventListener('click', () => {
            const text = card.querySelector('.example-title').textContent;
            userInput.value = text;
            welcomeScreen.style.display = 'none';
            chatContainer.style.display = 'flex';
            sendMessage();
        });
    });
    
    // Functions
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '' && !selectedFile) return;
        
        // Add user message to chat
        if (message !== '') {
            addUserMessage(message);
        }
        
        // Show loading indicator
        showLoading(true);
        
        // Clear input
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Process file if selected
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                // Add message with the image
                addUserMessage(`[Image: ${selectedFile.name}]`, selectedFile);
            }
            
            // Hide file preview
            filePreview.style.display = 'none';
            selectedFile = null;
            fileUpload.value = '';
        }
        
        // Call Gemini API
        if (message !== '') {
            callGeminiAPI(message);
        } else if (selectedFile && selectedFile.type.startsWith('image/')) {
            callGeminiVisionAPI(selectedFile);
        }
    }
    
    // Add user message to chat
    function addUserMessage(message, file = null) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let imageHtml = '';
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.classList.add('user-image');
                document.querySelector('#temp-image-container').appendChild(imgElement);
            };
            reader.readAsDataURL(file);
            imageHtml = '<div id="temp-image-container" class="user-image-container"></div>';
        }
        
        const messageHtml = `
            <div class="message user-message">
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                    ${imageHtml}
                    <span class="timestamp">${timestamp}</span>
                </div>
            </div>
        `;
        
        chatContainer.insertAdjacentHTML('beforeend', messageHtml);
        scrollToBottom();
    }
    
    // Add bot message to chat
    function addBotMessage(message) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Convert URLs to links
        message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Convert markdown-style code blocks
        message = message.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Convert markdown-style inline code
        message = message.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convert markdown-style bold
        message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert markdown-style italic
        message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert markdown-style lists (improved)
        let lines = message.split('\n');
        let inList = false;
        let listType = null;
        
        for (let i = 0; i < lines.length; i++) {
            // Ordered list
            if (lines[i].match(/^\d+\.\s+/)) {
                if (!inList || listType !== 'ol') {
                    // Start a new list
                    lines[i] = inList ? '</ul><ol><li>' + lines[i].replace(/^\d+\.\s+/, '') + '</li>' : '<ol><li>' + lines[i].replace(/^\d+\.\s+/, '') + '</li>';
                    inList = true;
                    listType = 'ol';
                } else {
                    // Continue the list
                    lines[i] = '<li>' + lines[i].replace(/^\d+\.\s+/, '') + '</li>';
                }
            }
            // Unordered list
            else if (lines[i].match(/^-\s+/)) {
                if (!inList || listType !== 'ul') {
                    // Start a new list
                    lines[i] = inList ? '</ol><ul><li>' + lines[i].replace(/^-\s+/, '') + '</li>' : '<ul><li>' + lines[i].replace(/^-\s+/, '') + '</li>';
                    inList = true;
                    listType = 'ul';
                } else {
                    // Continue the list
                    lines[i] = '<li>' + lines[i].replace(/^-\s+/, '') + '</li>';
                }
            }
            // End list if line is not part of a list
            else if (inList && lines[i].trim() !== '') {
                lines[i] = (listType === 'ol' ? '</ol>' : '</ul>') + lines[i];
                inList = false;
                listType = null;
            }
        }
        
        // Close any open list
        if (inList) {
            lines.push(listType === 'ol' ? '</ol>' : '</ul>');
        }
        
        message = lines.join('\n');
        
        const messageHtml = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    ${message}
                    <span class="timestamp">${timestamp}</span>
                    <div class="message-actions">
                        <button class="message-action-btn" title="Copy" onclick="copyToClipboard(this)">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="message-action-btn" title="Thumbs Up">
                            <i class="fas fa-thumbs-up"></i>
                        </button>
                        <button class="message-action-btn" title="Thumbs Down">
                            <i class="fas fa-thumbs-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Hide loading indicator
        showLoading(false);
        
        chatContainer.insertAdjacentHTML('beforeend', messageHtml);
        scrollToBottom();
    }
    
    // Show/hide loading indicator
    function showLoading(show) {
        const loadingIndicator = document.querySelector('.loading-indicator');
        
        if (!loadingIndicator) return;
        
        if (show) {
            loadingIndicator.style.display = 'flex';
            isWaitingForResponse = true;
        } else {
            loadingIndicator.style.display = 'none';
            isWaitingForResponse = false;
        }
        
        scrollToBottom();
    }
    
    // Clear chat container
    function clearChat() {
        chatContainer.innerHTML = '';
    }
    
    // Load conversation (in a real app, this would fetch data)
    function loadConversation(id) {
        // This is a placeholder - in a real app, you would load
        // messages from your database or API
        activeChatId = id;
        clearChat();
        
        // Add some dummy messages for demonstration
        if (id === 'default') {
            addBotMessage("Hello! I'm your dental assistant AI. I can help you with information about oral hygiene, dental procedures, and identifying potential issues from images. How can I help you today?");
        }
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Copy text to clipboard
    window.copyToClipboard = function(button) {
        const messageContent = button.closest('.message-content');
        const textToCopy = messageContent.innerText.replace(/Copy\nThumbs Up\nThumbs Down/, '').trim();
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show copied feedback
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalIcon;
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };
    
    // Call Gemini API for text
    async function callGeminiAPI(message) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    }
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (data.candidates && data.candidates[0].content) {
                    const responseText = data.candidates[0].content.parts[0].text;
                    addBotMessage(responseText);
                } else {
                    throw new Error('Invalid response format from API');
                }
            } else {
                throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            addBotMessage("I'm having trouble connecting right now. Please try again later. Error: " + error.message);
        }
    }
    
        // Call Gemini Vision API for images
    async function callGeminiVisionAPI(imageFile) {
        try {
            // Convert image to base64
            const base64Image = await fileToBase64(imageFile);
            
            // Prepare prompt for dental analysis
            const prompt = "Please analyze this dental image and identify any potential issues or problems. Provide detailed information about what you see and any recommendations.";
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: imageFile.type,
                                    data: base64Image.split(',')[1]
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        topK: 32,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    }
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (data.candidates && data.candidates[0].content) {
                    const responseText = data.candidates[0].content.parts[0].text;
                    addBotMessage(responseText);
                } else {
                    throw new Error('Invalid response format from API');
                }
            } else {
                throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error calling Gemini Vision API:', error);
            addBotMessage("I'm having trouble analyzing this image. Please make sure it's clear and try again. Error: " + error.message);
        }
    }

    // Convert file to base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    
    // Initialize the chat interface
    // Check if chat container exists and load default conversation
    if (chatContainer) {
        if (welcomeScreen) {
            welcomeScreen.style.display = 'flex';
        } else {
            loadConversation('default');
        }
    }
});