const User = require('../models/Users');

async function handleLogin(req, res){
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required!' });
    if (!password) return res.status(400).json({ error: 'Password is required!' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found!' });
        if (user.password !== password) return res.status(401).json({ error: 'Invalid password!' });

        res.status(200).json({
            message: 'Login successful!',
            user: { username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

module.exports = { handleLogin };