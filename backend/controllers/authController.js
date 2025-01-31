import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";


export const registerController = async (req, res) => {
    try {
        const { name, number, email, password, cpassword } = req.body;
        
        
        //validations
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!number) {
            return res.send({ message: "Number is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!cpassword) {
            return res.send({ message: "Confirm Password is Required" });
        }
        if (cpassword != password) {
            return res.send({ message: "Password is not matched" });
        }

        //check user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {

            return res.status(200).send({
                message: false,
                message: "Already register please login",
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            number,
            email,
            password: hashedPassword,
        }).save();
       
        res.status(200).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validations
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Invalid Email or Password",
            })
        }

        //check user
        const user = await userModel.findOne({ email });
        
        if (!user) {
            res.status(404).send({
                success: false,
                message: "This email is not registered"
            })

        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id : user._id}, process.env.JWT_SECRET,{expiresIn:"7d"});

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        })

    }
}