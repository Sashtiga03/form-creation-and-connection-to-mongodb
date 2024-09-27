// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (use your MongoDB URI if using Atlas)
mongoose.connect('mongodb://localhost:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a Mongoose Schema for employee
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    position: String,
    salary: Number
});

// Create a Mongoose model
const Employee = mongoose.model('Employee', employeeSchema);

// Serve the HTML form at the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission via POST request and save employee data
app.post('/addEmployee', async (req, res) => {
    const { name, email, position, salary } = req.body;

    // Log the incoming form data for debugging purposes
    console.log(req.body);

    const newEmployee = new Employee({
        name: name,
        email: email,
        position: position,
        salary: parseFloat(salary)
    });

    // Use async/await to handle the save operation
    try {
        await newEmployee.save();
        res.send('Employee data successfully saved');
    } catch (err) {
        console.error(err);
        res.send('Error saving employee data');
    }
});

// Handle GET request for /addEmployee to show a message if accessed directly via browser
app.get('/addEmployee', (req, res) => {
    res.send('Please submit employee data through the form at the home page.');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


