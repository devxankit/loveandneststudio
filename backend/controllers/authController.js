const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkey12345', {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        res.status(404);
        throw new Error('Admin not found with this email');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.resetPasswordOtp = otp;
    admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

    // Send email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_USER}>`,
        to: admin.email,
        subject: 'Password Reset OTP - Love & Nest Studio',
        text: `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #5A2A45;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>You requested a password reset for the Love & Nest Studio Admin Panel.</p>
                <div style="background: #F9F7F2; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #5A2A45;">${otp}</span>
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #999;">Love & Nest Studio © 2024</p>
            </div>
        `,
    };

    console.log(`[DEBUG] Generated OTP for ${email}: ${otp}`);

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[SUCCESS] Email sent successfully to ${admin.email}`);
        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error("FATAL: Email sending failed");
        console.error("Error details:", error.message);
        console.error("Nodemailer Error Code:", error.code);
        console.error("Nodemailer Command:", error.command);
        res.status(500);
        throw new Error(`Email Service Error: ${error.message}`);
    }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    res.json({ message: 'OTP verified successfully' });
});

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const admin = await Admin.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    admin.password = newPassword;
    admin.resetPasswordOtp = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    res.json({ message: 'Password reset successful' });
});

// @desc    Update Admin Profile (from settings)
// @route   PUT /api/auth/profile
// @access  Private
const updateAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
        admin.email = req.body.email || admin.email;
        if (req.body.password) {
            admin.password = req.body.password;
        }

        const updatedAdmin = await admin.save();
        res.json({
            _id: updatedAdmin._id,
            email: updatedAdmin.email,
            token: generateToken(updatedAdmin._id),
        });
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
});

module.exports = {
    loginAdmin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    updateAdminProfile
};
