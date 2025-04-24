// const express = require('express')
// const model = require('../model/fetch.js');
// const jwt = require('jsonwebtoken');

// require('dotenv').config(); 
// const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

// const getLogin = async(req,res)=>{
//     try{
//       const {userName,password,email} = req.body;

//     const existsEmail = await model.findOne({email})
//     if(existsEmail){
//       return res.json('The userEmail is already exists').status(404)
//     }

//     const data = new model({email,password,userName})

//      await data.save()

//       const token = jwt.sign({ id: data._id, email }, SECRET_KEY, {
//         expiresIn: '1h',
//       });

//       res.status(201).json({
//         message: 'User registered successfully',
//         user: data,
//         token: token, 
//       }); 

//   }catch(err){
//     res.status(500).json({ message: 'Registration failed', error: err.message });
//   }
// }

// module.exports = {getLogin}



const User = require('../model/fetch.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const SECRET_KEY = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ userName, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

const userProduct = async (req, res) => {
  const { item,productEmail } = req.body;

  if (!productEmail || !item.name || !item.price ) {
    return res.status(400).json({ message: "Email and valid product data are required" });
      }

  try {
    const user = await User.findOne({ email:productEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.products.push({name:item.name,price:item.price});
    await user.save(); 

    res.status(200).json({
      message: "Product stored successfully!",
      products: user.products,
      length:user.products.length,
    });
  } catch (err) {
    console.error("Error storing product:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// const userDelete = async (req, res) => {
//   try {
//     const { id} = req.params;
//     const {productEmail} = req.body;
//     if (!id) {
//       return res.status(400).json({ message: 'Id is empty' });
//     }

//     if(!productEmail){
//       return res.status(4000).json({message:'Email is empty'})
//     }

//     const email = await User.findOne({email:productEmail});

//       console.log(email)
//     if (!email) {
//       return res.status(404).json({ message: 'Invalid email' });

//     }

//     const deleteById = await User.updateOne({email:"productEmail"},{$pull:{products:{_id:ObjectId(id)}}})


//     return res.status(200).json({
//       message: 'Product is deleted using ID',
//     });

//   } catch (err) {
//     console.log(`Error: ${err.message}`);
//     return res.status(500).json({ message: err.message });
//   }
// };



// const userDelete = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { productEmail } = req.body;

//     if (!id) {
//       return res.status(400).json({ message: 'Id is empty' });
//     }

//     if (!productEmail) {
//       return res.status(400).json({ message: 'Email is empty' });
//     }

//     const emailExists = await User.findOne({ email: productEmail });

//     if (!emailExists) {
//       return res.status(404).json({ message: 'Invalid email' });
//     }

//     await User.updateOne(
//       { email: productEmail },
//       { $pull: { products: { _id: new mongoose.Types.ObjectId(id) } } }
//     );

//     return res.status(200).json({
//       message: 'Product is deleted using ID',

//     });

//   } catch (err) {
//     console.log(`Error: ${err.message}`);
//     return res.status(500).json({ message: err.message });
//   }
// };









const userDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const { productEmail } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is empty' });
    }

    if (!productEmail) {
      return res.status(400).json({ message: 'Email is empty' });
    }

    const user = await User.findOne({ email: productEmail });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email' });
    }

    // Find the product to get its name
    const productToDelete = user.products.find(
      (product) => product._id.toString() === id
    );

    if (!productToDelete) {
      return res.status(404).json({ message: 'Product not found in user data' });
    }

    // Proceed with deletion
    await User.updateOne(
      { email: productEmail },
      { $pull: { products: { _id: id } } }
    );

    return res.status(200).json({
      message: 'Product deleted successfully',
      name: productToDelete.name, // Send name back to frontend
    });

  } catch (err) {
    console.log(`Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};



module.exports = { signUp,userProduct , userDelete };
