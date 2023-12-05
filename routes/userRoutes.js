import express from 'express'
import { createUser, showAllUsers, showOneUser, updateUser, deleteUser, loginUser } from '../controller/userControler.js'
import {upload} from '../middlewares/upload.js'
import {authenticateUser , authorizeUser , loggedInUser} from '../middlewares/auth.js'

const userRoutes = express.Router()

userRoutes.post('/create', upload.single('image'), createUser )
userRoutes.get('/showAll',authenticateUser ,showAllUsers)
userRoutes.get('/showOne/:id', showOneUser)
userRoutes.patch('/update', upload.single('image'), updateUser)
userRoutes.delete('/delete', deleteUser)

userRoutes.post('/login' , loginUser, loggedInUser)
export default userRoutes