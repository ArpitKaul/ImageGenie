import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";


const registerUser = async (req , res)=>{
    try{
        const {name,email,password} = req.body;
        

        if(!name || !email || !password){
            return res.json({sucess:false,message: 'Missing Details'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        console.log(token)

        res.json({sucess: true , token , user: {name: user.name}})

    }catch(error){
        console.log(error)
        res.json({sucess: false, message: error.message})
    }
}
// user 

const loginUser = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({sucess:false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            console.log(token);
            

            res.json({sucess: true , token , user:{name: user.name}})
        }else{
            return res.json({sucess:false , message: "Invalid credentials"})
        }

    } catch (error){
        console.log(error)
        res.json({sucess:false , message: error.message})
    }
}


const userCredits = async (req, res)=>{
    try{ 
        const {userId} = req.user

        const user = await userModel.findById(userId)
        res.json({success: true, credits: user.creditBalance, user:{name: user.name}})
    }catch (error){
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

// razorpay

const razorpayInstance = new razorpay({
    key_id: "rzp_test_DAcS9dFt98s47o",
    key_secret: "RBX3uEvsTLiDDADmiTymT8y6"
});

const paymentRazorpay = async(req, res) => {
    try {
        const {userId} = req.user // Get userId from auth middleware
        const {planId} = req.body

        if(!planId) {
            return res.json({success: false, message: 'Plan ID is required'})
        }

        let credits, plan, amount, date 

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced': // Fixed typo (was 'Advances')
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business': // Fixed typo (was 'Buisness')
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
               return res.json({success: false, message: 'Plan not found'});
        }

        date = Date.now();

        const transactionData = {
            userId, 
            plan, 
            amount, 
            credits, 
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: 'INR', // Hardcoded for now (should be from env)
            receipt: newTransaction._id,
        }

        // Verify Razorpay instance is initialized
        if(!razorpayInstance) {
            throw new Error('Razorpay instance not initialized')
        }

        const order = await razorpayInstance.orders.create(options)
        res.json({success: true, order})


    } catch (error){
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

const verifyRazorpay = async (req , res)=>{
    try {

        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({success:false, message: 'Payment Failed'})
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})

            res.json({success: true, message:"Credits Added"})
        }else{
            res.json({success: false, message: 'Payment Failed'})
        } 
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {registerUser ,  loginUser , userCredits , paymentRazorpay , verifyRazorpay}