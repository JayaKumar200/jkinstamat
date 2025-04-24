// const mongoose = require('mongoose');

// const db = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if MongoDB isn't reachable
//       connectTimeoutMS: 10000, // Timeout for initial connection
//     });
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.log('MongoDB connection error:', err.message);
//   }
// };

// module.exports = db;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // ✅ Add this for debug
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
































