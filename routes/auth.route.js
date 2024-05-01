const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/registration', 
[
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Uncorrect pass').isLength({ min:6 })
],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorrect data in registration'
            })
        }

        const {email, password} = req.body

        const isUsed = await User.findOne({ email })

        if(isUsed){
            return res.status(300).json({message: 'Email is in use'})
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new User({
            email, password: hashedPassword
        })

        await user.save()

        res.status(201).json({message: 'User is created'})
    } catch (error) {
        console.log(error)
        res.json(error) 
    }
})


router.post('/login', 
[
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Uncorrect pass').exists()
],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorrect data in registration'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: 'no user'})
        }
        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message:'Pass not match'})
        }
        const jwtSecret = 'something'

        const token = jwt.sign(
            {userId: user.id}, 
            jwtSecret,
            {expiresIn: '1h'}
        )
        
        res.json({token, userId: user.id})

    } catch (error) {
        console.log(error)
        res.json(error) 
    }
})

module.exports = router