// const express = require('express')
// const route = express.Router()
// const controller = require('../controller/controller.js')
// const verifyToken = require('../middleware/auth');

// route.post('/signin',controller.getLogin)

// route.post('/login',verifyToken,(req,res)=>{
// 	res.status(201).json({ message: 'Welcome, you are authenticated!', user: req.user });
// })

// module.exports = route







// const express = require('express');
// const { signUp } = require('../controller/controller.js');
// const verifyToken = require('../middleware/auth.js');

// const router = express.Router();

// router.post('/signup', signUp);
// router.post('/login', verifyToken, (req, res) => {
//   res.json({ message: 'Access granted!', user: req.user });
// });

// module.exports = router;






const express = require('express');
const { signUp,userProduct,userDelete } = require('../controller/controller.js');
const verifyToken = require('../middleware/auth.js');
const router = express.Router();
const User = require('../model/fetch.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
router.post('/signup', signUp);
router.post('/product',userProduct)
router.delete('/delete/:id',userDelete)
router.post('/login',async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 2. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to send email ');
  }
});

const mailOptions = {
  from: `"JK Instamat" <${process.env.EMAIL_USER}>`,
  to: email, 
  subject: 'Login Successful - JK Instamat',
  text: `Hi ${user.userName},\n\nYou have successfully logged in!\n\nThank you,\nJK Instamat Team`
};


transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Mail Error :', err);
  } else {
    console.log('Mail Sent:', info.response);
  }
});

    // 4. Respond
    return res.status(200).json({
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/products',userProduct)


module.exports = router;
