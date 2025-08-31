const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
router.post('/register', async (req,res)=>{
  const {username,email,password} = req.body;
  if(!username || !email || !password) return res.status(400).json({msg:'All fields required'});
  try{
    const hashed = await bcrypt.hash(password,10);
    await db.query('INSERT INTO users (username,email,password_hash) VALUES (?,?,?)',[username,email,hashed]);
    res.status(201).json({msg:'User registered'});
  }catch(err){
    console.error(err);
    res.status(500).json({msg:'Server error'});
  }
});

// Login
router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  try{
    const [rows] = await db.query('SELECT * FROM users WHERE email=?',[email]);
    if(rows.length===0) return res.status(400).json({msg:'User not found'});
    const user = rows[0];
    const match = await bcrypt.compare(password,user.password_hash);
    if(!match) return res.status(400).json({msg:'Wrong password'});
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    res.json({token,user:{id:user.id,username:user.username,email:user.email}});
  }catch(err){
    console.error(err);
    res.status(500).json({msg:'Server error'});
  }
});

module.exports = router;
