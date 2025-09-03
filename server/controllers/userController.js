import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import crypto from "crypto"; // needed for signature verification
import transactionModel from "../models/transactionModel.js";

// ------------------- REGISTER -------------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, "myjwtsecret"); // hardcoded secret
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------- LOGIN -------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, "myjwtsecret");
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------- USER CREDITS -------------------
const userCredits = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId);

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------- RAZORPAY -------------------
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_RD8neyVQ5bItIj", // hardcoded key
  key_secret: "WzWo9LSG190TcNtNidlfSibe", // hardcoded secret
});

// create order
const paymentRazorpay = async (req, res) => {
  try {
    const { userId } = req.user;
    const { planId } = req.body;

    if (!planId) {
      return res.json({ success: false, message: "Plan ID is required" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify payment
const verifyRazorpay = async (req, res) => {
  try {
    const { response, orderId } = req.body;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    // step 1: verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "WzWo9LSG190TcNtNidlfSibe") // your secret
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // step 2: fetch order info
    const orderInfo = await razorpayInstance.orders.fetch(orderId);

    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(orderInfo.receipt);

      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment already processed" });
      }

      const userData = await userModel.findById(transactionData.userId);

      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });

      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "Credits Added" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
