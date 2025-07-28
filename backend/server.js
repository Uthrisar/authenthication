const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { handleLogin } = require('./controllers/handleLogin');
const { handleSignUp } = require('./controllers/handleSignUp');
const { handleDeleteUser } = require('./controllers/handleDeleteUser');
const { handleGetAllUsers } = require('./controllers/handleGetAllUsers');
const { connectMongoDB } = require('./connect');

const port = process.env.PORT || 5005;

dotenv.config();
const app = express();

connectMongoDB(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Signup Route
app.post('/signup', handleSignUp);

// Login Route
app.post('/login', handleLogin);;

// Get All Users
app.get('/all-users', handleGetAllUsers);

// Delete User by Email
app.delete('/delete-user', handleDeleteUser);

// Start Server
app.listen(port, () => { console.log(`server is running on port ${port}`) });