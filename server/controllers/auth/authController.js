const User = require('../../models/User');
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
        // now we can create the new user
        const user = await User.create({
            fullName,
            email,
            password,
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

    if (password !== existingUser.password) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
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
module.exports = {registerUser,loginUser};