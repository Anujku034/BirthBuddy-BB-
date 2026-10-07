const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendResetPasswordOtp = require("../../services/emailService.js");

// ============================================================
// REGISTER USER
// ============================================================

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// ============================================================
// LOGIN USER
// ============================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: existingUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        userId: existingUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

// ============================================================
// REFRESH ACCESS TOKEN
// ============================================================

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const newAccessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};

// ============================================================
// LOGOUT USER
// ============================================================

const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};

// ============================================================
// UPDATE PROFILE
// ============================================================

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message: "Full name and email are required",
      });
    }

    const trimmedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      return res.status(400).json({
        message: "Full name cannot be empty",
      });
    }

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email cannot be empty",
      });
    }

    // Check whether another account already uses this email
    const emailExists = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: userId },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email is already registered with another account",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.fullName = trimmedName;
    user.email = normalizedEmail;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

// ============================================================
// CHANGE PASSWORD
// ============================================================

const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // Required fields
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All password fields are required",
      });
    }

    // Confirm new password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message:
          "New password and confirm password do not match",
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Verify current password
    const isCurrentPasswordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        message:
          "New password must be different from your current password",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Failed to change password",
    });
  }
};

// ============================================================
// FORGOT PASSWORD
// ============================================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const emailExist = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!emailExist) {
      return res.status(404).json({
        message: "Email does not exist",
      });
    }

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    emailExist.resetPasswordOtp = otp;

    emailExist.resetPasswordOtpExpire =
      Date.now() + 10 * 60 * 1000;

    await emailExist.save();

    await sendResetPasswordOtp(
      emailExist.email,
      otp
    );

    return res.status(200).json({
      message: "Otp send successfully",
    });
  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong. please try again.",
    });
  }
};

// ============================================================
// VERIFY OTP
// ============================================================

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and Otp are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      !user.resetPasswordOtpExpire ||
      user.resetPasswordOtpExpire < new Date()
    ) {
      return res.status(400).json({
        message:
          "OTP has expired. Please request a new OTP",
      });
    }

    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};

// ============================================================
// RESET PASSWORD
// ============================================================

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashPassword = await bcrypt.hash(
      password,
      12
    );

    user.password = hashPassword;

    // Clear OTP after successful reset
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpire = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(
      "RESET PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong. Please try again",
    });
  }
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};