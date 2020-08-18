require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//usermodel
const User = require('../models/User')




router.post("/", async (req, res) => {
  try {
    let { email, password, passwordcheck, name } = req.body;

    // validate

    if (!email || !password || !passwordcheck)
      return res.status(400).json({ msg: "โปรดกรอกข้อมูลให้ครบถ้วน" });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "กรอก Password อย่างน้อย 6 ตัว" });
    if (password !== passwordcheck)
      return res
        .status(400)
        .json({ msg: "กรอก password กับ confirm password เหมือนกัน" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Email นี้มีคนใช้งานแล้ว" });

    if (!name) name = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      name,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });
    
    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  
  module.exports = router