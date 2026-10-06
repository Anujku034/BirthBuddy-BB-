const User = require('../../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendResetPasswordOtp = require("../../services/emailService.js");
const registerUser = async(req,res) => {
    try{
        const {fullName,email,password,confirmPassword} = req.body;
        // checking both password is same or not
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Passwords do not match",
            });
        }

        // check whether email is already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Email already registered",
            });
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password,12);
        // now we can create the new user
        const user = await User.create({
            fullName,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            message: "Registration successful",
            user:{
                id: user._id,
                fullName: user.fullName,
                email:user.email,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
           
            message:"Server error",
        });
    }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

   const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
   );
   if(!isPasswordCorrect){
    return res.status(400).json({
      message:"Invalid email or password",
    });
   }
   // making access token
   const accessToken = jwt.sign(
    {
      userId: existingUser._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m"
    }
   );
   // making refreshToken
   const refreshToken = jwt.sign(
    {userId: existingUser._id},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '7d'}
   )
   res.cookie("refreshToken", refreshToken,{
    httpOnly:true,
    secure: false,
    sameSite: 'strict',
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
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
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
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
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
const logoutUser = (req,res) => {
  res.clearCookie("refreshToken",{
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "Logout successful",
  });
};
const forgotPassword = async (req,res) => {
  // first take the email
  // verfiy is this email exist in my database or not
  // if yes then send otp to the email
  // ang navigate to the /verify-otp page 
  try{
    const{email} = req.body;
    if(!email){
      return res.status(400).json({
        message: "Email is required",
      });
    }
    const emailExist = await User.findOne({
      email: email.trim().toLowerCase(),


    });
    if(!emailExist){
      return res.status(404).json({
        message: "Email does not exist",
      });
    }
    // generate 6 digit otp
    const otp = crypto.randomInt(100000,1000000).toString();
    emailExist.resetPasswordOtp = otp;
    emailExist.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000;
    await emailExist.save();
    // send otp to user's gmail
    await sendResetPasswordOtp(
      emailExist.email,
      otp
    );
    // send response
    return res.status(200).json({
      message: "Otp send successfully",
    });
  }catch(error){
    console.error("Forgot password error: ",error);
    return res.status(500).json({
      message: "Something went wrong. please try again.",
    });
  }
};
const verifyOtp = async(req,res) => {
  try{
    const {email, otp} = req.body;
    // check required fields
    if(!email || !otp){
      return res.status(400).json({
        message: "Email and Otp are required",
      });
    }
    //find user
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if(!user){
      return res.status(404).json({
        message: "User not found",
      });

    }
    // check otp expiration
    if(user.resetPasswordOtpExpire < new Date()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP",

      });
    }
    // compare OTp
    if(user.resetPasswordOtp !== otp){
      return res.status(400).json({
        message: "Invalid OTP",
      });

    }
    // otp is correct
    return res.status(200).json({
      message:"OTP verified successfully",
    })
  }catch(error){
    console.log("Verify OTP error: ",error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};
const resetPassword = async(req,res) => {
  try{
    const{email,password} = req.body;
    if(!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({
      email: email.trim().toLowerCase(),

    });
    if(!user){
      return res.status(404).json({
        message: "User not found",
      });
    }
    // we will hash the password before saving it to the db
    const hashPassword = await bcrypt.hash(password,10);
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({
      message: "Password reset successfully",
    });
  }catch(error){
    console.log("Reset password error:",error);
    return res.status(500).json({
      message: "Something went wrong. Please try again"
    })
  }
}
module.exports = {registerUser,loginUser,refreshAccessToken,logoutUser,forgotPassword,verifyOtp,resetPassword};