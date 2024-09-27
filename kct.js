// app.js

const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response header content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send the response to the browser
    res.end('This is my first message.\n Welcome to KCT learning\n');
    
    // Log the message to the console
    console.log('This is my first message.\n Welcome to KCT learning');
});

// Server listens on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
