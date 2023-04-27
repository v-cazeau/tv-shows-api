import { FieldValue } from 'firebase-admin/firestore'
import { db } from './dbConnect.js'

const collection = db.collection('users')

export async function signup(req,res) {
    const { email, password } = req.body
    if(!email || password.length < 6 ) { //if pw or em is blank
        res.status(400).send({ message:"Email and Password are both required." })
        return
        }
    //TODO: check if email is already in use
    const newUser = {
        email: email.toLowerCase(), 
        password, 
        createdAt: FieldValue.serverTimestamp(), 
    }

    await collection.add(newUser)
    //once the user is added... log them in...
    login(req, res)
}

export async function login(req,res) {
    const { email,password } = req.body
    if(!email || !password) { //if pw or em is blank
        res.status(400).send({ message:"Email and Password are both required." })
        return
    }
    const users = await collection
        .where("email", "==", email.toLowerCase())
        .where("password", "==", password)
        .get()

    let user = users.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0] //FS automatically creates id (mongo does with _id)
    if(!user) {
        res.status(400).send({ message: "Invalid email and/or password." })
    }
    delete user.password
    res.send(user) // { email, createdAt, id }
}