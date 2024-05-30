const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User'); // Adjust the path as necessary
const { sendResetEmail } = require('../utils/mailer');
const bcrypt = require("bcryptjs");


router.post('/auth/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Log the received email in the server terminal
    console.log('Received email:', email);

    if (!email) {
        console.error('Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Find user with case-insensitive email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.error(`User not found for email: ${email}`);
            return res.status(400).json({ error: 'User not found' });
        }

        // Generate the token and set expiry time
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        // Save the user with the new token and expiry date
        await user.save();

        // Log the token generation and user update
        console.log(`Generated token for ${email}: ${token}`);

        // Send the reset email
        sendResetEmail(email, token);
        console.log(`Password reset email sent to ${email}`);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error(`Error processing request for ${email}: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/auth/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Find user with the given reset token and not expired
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password and reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = '';
        user.resetPasswordExpires = '';

        // Save the updated user document
        await user.save();

        res.status(200).json({ success: true, message: 'Password has been reset' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
