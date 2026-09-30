const User = require('../../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
const refreshAccessToken = async(req,res) => {
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json({
        message:"Refresh token not found",
      });
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const newAccessToken = jwt.sign(
      {userId: decoded.userId},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "15m"}

    )
    return res.status(200).json({
      accessToken: newAccessToken,
    });
  }
  catch(error){
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
const forgotPassword = (req,res) => {
  
}
module.exports = {registerUser,loginUser,refreshAccessToken,logoutUser};