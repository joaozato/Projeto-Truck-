import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma= new PrismaClient()
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

//Register
// post router, async, requisition an response
router.post('/cadastro' , async(req, res) => { //function
    try{  //here he is trying to get the info
    
    const user = req.body   //user ask for a requisition in body
// here salt bcrypt is the crypt system, gensalt (10) generate a encript mode
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)
// hash is the same, include a hash crypt in the password
    const userDB = await prisma.user.create({  //here is our user that will be created
        data: {
            email: user.email,
            name: user.name,        //we declarete the variables and what they will receive
            password: hashPassword,
        },
    })

    res.status(201).json(userDB)    //if was a sucess, the program return a response (res) and the json return (userDB)
    }
    catch(err){} //if not, catch the error and return a json with error message
    res.status(500).json({message: "Server error, try again"})
})


//login

router.post('/login', async (req, res) => {
    
    try {
    const userInfo = req.body

    //search user in the database
    const user = await prisma.user.findUnique({
        where: { email: userInfo.email},
    })
    // verify if the user exist inside of the data base
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    //compare the passwords, among the database password (hash) and the user password (normal)
    const isMatch = await bcrypt.compare(userInfo.password, user.password)
    if(!isMatch){
        return res.status(400).json({message: "Invalid Password"})
    }

    //generate JWT
    const token = jwt.sign({id: user.id}, JWT_SECRET, { expiresIn: '5h'})


    res.status(200).json(token)
    }catch (err) {
        res.status(500).json({ message: 'Server error, try again'})
    }


})

export default router



