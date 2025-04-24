// const express = require('express')
// const mongoose = require('mongoose')
// const store = require('../configure/store.js')

// const User = new mongoose.Schema({
// 	userName:{
// 		type:String,
// 		required:true,
// 	},
//     email:{
//     	type:String,
//     	required:true,
//     	lowercase:true,
//     },
//     password:{
//     	type:String,
//     	required:true,
//     }
// })


// module.exports = mongoose.model('userdata',User)







const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 7
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  products: [
    {
      name: { type: String,  },
      price: { type: Number,}
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
