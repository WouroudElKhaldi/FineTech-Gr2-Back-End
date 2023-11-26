import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const generateSecretKey = () => {
    return crypto.randomBytes(20).toString('hex') ;

}
const secretKey = generateSecretKey()

export const generateToken = (user) => {
    const payload = {
        id : user.id ,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    }
    return jwt.sign(payload , "secretKey")
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token , "secretKey")
    } catch (error){
        return null
    }
}

export const hashPassword = async (password) => {
    const salt = 10 ;
    return bcrypt.hash(password , salt)
}

export const comparePassword = async (password , hashedPassword) => {
    return bcrypt.compare(password , hashedPassword)
}