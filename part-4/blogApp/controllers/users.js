const userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require('bcrypt');

userRouter.post('', async (req, res, next) => {

  const password = req.body.password
  if (!password || password.length < 3) return res.status(400).json({
    error: !password ? 'error password is a required field' :
     `${password} is less than the minimum length of 3 characters`
  })

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      passwordHash
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter