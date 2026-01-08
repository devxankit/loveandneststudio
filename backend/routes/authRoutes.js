const express = require('express');
const router = express.Router();
const {
    loginAdmin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    updateAdminProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.put('/profile', protect, updateAdminProfile);

module.exports = router;
