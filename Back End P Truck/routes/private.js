import express from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()
const prisma = new PrismaClient()

router.get('/list-users', async (req, res) => {

   try{
                                                //this ignore the password
        const users = await prisma.user.findMany()
        
        res.status(200).json({ message: "users listed with sucess", users})
    } catch(err) {
        res.status(500).json({ message: "Server error"})
    }
   
})

export default router