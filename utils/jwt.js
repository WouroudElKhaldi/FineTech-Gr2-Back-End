import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt'
export const generateToken = (user) => {
    const payload = {
        id : user.id ,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email ,
        role: user.role,
        image : user.image , 
        dob: user.dob ,
        password: user.password
    }
    return jwt.sign(payload , "secretKey" , {expiresIn: '4h'})
} // utils

export const verifyToken = (token) => {
    try {
        return jwt.verify(token , "secretKey")
    } catch (error){
        return null
    }
} // utilsx

export const comparePassword = async (password , hashedPassword) => {
    return bcrypt.compare(password , hashedPassword)
  }

  export const hashPassword = async (password) => {
    const salt = 10 ;
    return bcrypt.hash(password , salt)
  } // inside schema