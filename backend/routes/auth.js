const express = require('express')
const router = express.Router()
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
router.post('/', async (req,res) => {
    try {
      const { email, password } = req.body;
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Email นี้ยังไม่มีในระบบ" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "รหัสผ่านไม่ถูกต้อง." });
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET , { expiresIn: 3600 });
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('password')
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })
  
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router