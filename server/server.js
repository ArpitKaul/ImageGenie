// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';

// import connectDB from './config/mongodb.js';
// import userRouter from './routes/userRoutes.js';
// import imageRouter from './routes/imageRoutes.js';

// const PORT = process.env.PORT || 4000;
// const app = express();

// app.use(express.json());

// // ✅ Fixed CORS setup
// app.use(cors({
//   origin: "https://image-genie-lmzc.vercel.app", // your exact frontend domain
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// }));

// // ✅ Handle preflight OPTIONS requests globally
// app.options("*", cors());

// // ✅ Connect to database
// await connectDB();

// // ✅ Routes
// app.use('/api/user', userRouter);
// console.log("User Routes Loaded");
// app.use('/api/image', imageRouter);
// console.log("Image Routes Loaded");

// // ✅ Test route
// app.get('/', (req, res) => res.send("API Working"));

// // ✅ Start server
// app.listen(PORT, () => console.log('Server running on port ' + PORT));


import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();

app.use(express.json());

// ✅ Allow all origins for now (you can restrict later once you know your frontend URL)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Connect to database
await connectDB();

// ✅ Routes
app.use('/api/user', userRouter);
console.log("User Routes Loaded");
app.use('/api/image', imageRouter);
console.log("Image Routes Loaded");

// ✅ Root route
app.get('/', (req, res) => res.send("API Working"));

// ❌ No app.listen on Vercel
// ✅ Export app for Vercel serverless function
export default app;
