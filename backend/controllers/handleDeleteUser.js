const User = require('../models/Users');

async function handleDeleteUser(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required!' });

    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) return res.status(404).json({ error: 'User not found!' });

        res.status(200).json({
            message: 'User deleted successfully!',
            deletedUser: { name: deletedUser.username, email: deletedUser.email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

module.exports = { handleDeleteUser };