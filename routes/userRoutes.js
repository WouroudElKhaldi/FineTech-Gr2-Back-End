import express from 'express'
import { createUser, showAllUsers, showOneUser, updateUser, deleteUser } from '../controller/userControler.js'
import {upload} from '../middlewares/upload.js'

const userRoutes = express.Router()

userRoutes.post('/create', upload.single('image'), createUser )
userRoutes.get('/showAll', showAllUsers)
userRoutes.get('/showOne/:id', showOneUser)
userRoutes.patch('/update', upload.single('image'), updateUser)
userRoutes.delete('/delete', deleteUser)

export default userRoutes