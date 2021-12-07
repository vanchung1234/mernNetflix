const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../model/User')

// check if user is logged in
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.post('/register', async(req, res) => {
    const { username, password, repassword } = req.body

    if (!username || !password || !repassword)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password and/or repassword' })

    if (password != repassword)
        return res.status(400).json({ success: false, message: 'repassword incorrect' })

    if (password.length <= 4)
        return res.status(400).json({ success: false, message: 'min length of password is 4' })

    try {
        const user = await User.findOne({ username })

        if (user)
            return res.status(400).json({ success: false, message: 'User exist' })

        //all good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        //return token
        const accessToken = jwt.sign({ userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//Login User
router.post('/login', async(req, res) => {
    const { username, password } = req.body

    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })

    try {
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({ success: false, message: "Incorrect username or password" })

        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: "Incorrect username or password" })

        //all good
        const accessToken = jwt.sign({ userId: user._id,isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router