import db from '../models/index.js'
import fs from 'fs/promises'

const { UserModel } = db

export const createUser = async (req, res) => {
    const { firstName, lastName, dob, email, password, role } = req.body
    const image = req.file?.path

    if (!firstName || !lastName || !dob || !email || !password || !role)
        res.status(400).send('All fields are required!')
    try {
        const newUser = await UserModel.create({
            firstName,
            lastName,
            dob,
            email,
            password,
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
            include: [UserModel],
            offset,
            limit: parseInt(pageSize)
        })
        res.status(200).json({ Users: users })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const showOneUser = async (req, res) => {
    const id = req.body.id
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
    const id = req.body.id
    const { firstName, lastName, dob, email, password, role } = req.body
    const newImage = req.file?.path
    if (!firstName || !lastName || !dob || !email || !password || !role)
        res.status(400).send('All fields are required!')
    try {
        const user = await UserModel.findOne({ where: { id: id } })
        const oldImage = user.image
        if (!user)
            res.status(404).send(`User ${id} does not exist!`)
        const editUser = await UserModel.update({
            firstName,
            lastName,
            dob,
            email,
            password,
            newImage,
            role
        })
        await fs.unlink(oldImage)
        if (editUser)
            res.status(200).send(`User ${id} has been updated successfully!`)
        else
            res.status(404).send(`User ${id} does not exist!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUser = async (req, res) => {
    const id = req.body.id
    try {
        const user = await UserModel.findOne({ where: { id: id } })
        if (!user)
            res.status(404).send(`User ${id} does not exist!`)
        await user.destroy()
        res.status(200).send(`User ${id} has been deleted successfully!`)
    }
    catch (error) {
        res.status(500).send(error)
    }
}