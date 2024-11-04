const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        console.log(newUser)
        res.redirect('/login')
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(201).json({ message: "GET all users success", data: users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const theUser = await prisma.user.findUnique({
            where: { id: Number(id) }
        })
        res.status(201).json({ message: "GET the User success", data: theUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.update({
            data: {
                name,
                email,
                password: hashedPassword
            },
            where: { id: Number(id) }
        });
        res.status(201).json({ message: "UPDATE user success", data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        })
        res.status(201).json({ message: "DELETE User success" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const theUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if(!theUser){
            return res.render('login.hbs', { message: "User doesn't exist"});
        }

        const isValidPassword = await bcrypt.compare(password, theUser.password);

        if(!isValidPassword){
            return res.render('login.hbs', { message: 'Wrong Password'});
        }
        req.session.user = {
            name: theUser.name,
            email: theUser.email
        };
        res.redirect('/');
    } catch (error) {
        res.render('login.hbs', { message: 'server error'});
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser, userLogin }