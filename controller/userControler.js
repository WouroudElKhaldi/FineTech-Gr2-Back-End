import { comparePassword, generateToken, verifyToken , hashPassword } from '../middlewares/auth.js'
import db from '../models/index.js'
import fs from 'fs/promises'

const { UserModel } = db

export const createUser = async (req, res) => {
    const { firstName, lastName, dob, email, password, role } = req.body
    const image = req.file?.path

    if (!firstName || !lastName || !dob || !email || !password || !role)
        res.status(400).send('All fields are required!')
    if(!req.file) {
        return res.status(400).json({error : "Please upload an image"})
    }
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await UserModel.create({
            firstName,
            lastName,
            dob,
            email,
            password: hashedPassword,
            image,
            role
        })
        if (newUser)
            res.status(200).json({ message: `New User ${firstName} ${lastName} has been created successfully!`, User: newUser })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const showAllUsers = async (req, res) => {
    const { page = 1, pageSize = 5 } = req.query
    const offset = (page - 1) * pageSize
    try {
        const users = await UserModel.findAll({
            offset,
            limit: parseInt(pageSize)
        })
        res.status(200).json({ Users: users })
    }
    catch (error) {
        res.status(500).json({error : error})
    }
}

export const showOneUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findOne({ where: { id: id } })
        if (user)
            res.status(200).json({ User: user })
        else
            res.status(404).send(`User ${id} does not exist!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateUser = async (req, res) => {
    const id = req.body.id;
    const { firstName, lastName, dob, email, password, role } = req.body;
    const newImage = req.file?.path;

    if (!firstName || !lastName || !dob || !email || !password || !role) {
        res.status(400).send('All fields are required!');
        return;
    }

    try {
        const user = await UserModel.findOne({ where: { id: id } });
        const oldImage = user.image;

        if (!user) {
            res.status(404).send(`User ${id} does not exist!`);
            return;
        }

        const editUser = await UserModel.update(
            {
                firstName,
                lastName,
                dob,
                email,
                password,
                image: newImage,
                role
            },
            {
                where: { id: id }
            }
        ); 
        if (req.file) {
            await fs.unlink(oldImage);
        }
        res.status(200).send(`User ${user.firstName} has been updated successfully!`);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteUser = async (req, res) => {
    const id = req.body.id
    try {
        const user = await UserModel.findOne({ where: { id: id } })
        if (!user)
            res.status(404).send(`User ${id} does not exist!`)
        await user.destroy()
        res.status(200).json({message : `User ${id} has been deleted successfully!`})
    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const loginUser = async (req , res) => {
    const {email , password} = req.body ;
    try {
        const user = await UserModel.findOne({where : {email : email}})
        if (!user){
            return res.status(401).json({
                err : 'Invalid email or password'
            })
        }

        const isPasswordValid = await comparePassword(password , user.password) 
        if(!isPasswordValid){
            return res.status(401).json({
                err: 'Invalid password'
            })
        }
        const token = generateToken(user)

        res.status(200).json({
            token
        })
    } catch (error) {
        
    }
}

export const authenticateUser = (req , res , next) =>{
    const token = req.headers.authorization ;
    if(!token){
        return res.status(401).json({
            err: 'Unauthorized'
        })
    }
    const decodedToken = verifyToken(token) ;

    if(!decodedToken){
        return res.status(401).json({
            err: 'Invalid token'
        })
    }
    req.user = decodedToken ; 
    next()
}

export const authorizeUser = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
 
      next();
    };
  };