const User = require('../models/Users');

async function handleSignUp(req, res) {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username) return res.status(400).json({ error: 'Name is required!' });
    if (!email) return res.status(400).json({ error: 'Email is required!' });
    if (!password) return res.status(400).json({ error: 'Password is required!' });

    const user = new User({ username, email, password });
    if (!user) return res.status(400).json({ error: 'User creation failed!' });

    try {
        await user.save();
        return res.status(201).json({
            message: 'User created successfully!',
            user: { username, email }
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists!' });
        }
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

module.exports = { handleSignUp };