var socket;
var userName;

function initSocket() {
    socket = new WebSocket('ws://your-server-url'); // Replace with your WebSocket server URL

    socket.onopen = function(event) {
        console.log("WebSocket connection opened:", event);
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.type === 'message') {
            displayMessage(data);
        }
    };

    socket.onclose = function(event) {
        console.log("WebSocket connection closed:", event);
    };
}

function login() {
    var nameInput = document.getElementById("name");
    var chatContainer = document.getElementById("chat-container");

    userName = nameInput.value.trim();

    if (userName !== "") {
        // Display the chat container
        chatContainer.style.display = "block";

        // Set the user's name
        document.getElementById("userName").textContent = userName;

        // Initialize WebSocket
        initSocket();

        // Hide the login container
        document.getElementById("login-container").style.display = "none";
    }
}

function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value.trim();

    if (message !== "") {
        var data = {
            type: 'message',
            user: userName,
            message: message
        };

        // Send the message to the server
        socket.send(JSON.stringify(data));

        // Clear the message input
        messageInput.value = '';
    }
}

function displayMessage(data) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("p");
    messageElement.textContent = `${data.user}: ${data.message}`;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom to show the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}
