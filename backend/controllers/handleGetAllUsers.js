const User = require('../models/Users');

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find({});
        if (users.length === 0) return res.status(404).json({ error: 'No users found!' });
        res.status(200).json({ message: 'Users retrieved successfully!', users });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

module.exports = { handleGetAllUsers };