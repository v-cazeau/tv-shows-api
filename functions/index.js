import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { login, signup } from './src/users.js'
import { getShows, addShow, deleteShow } from './src/shows.js'

const app = express() //creates our express app
app.use(cors())
app.use(express.json()) //___() the () evokes

//User Routes: 
app.post("/signup", signup)
app.post("/login", login)

//Show Routes:
app.get("/shows", getShows)
app.post("/shows", addShow) //WE WANT TO PROTECT
app.delete("/shows/:showId", deleteShow)

//lets us run locally without emulators: 
app.listen(3000, () => console.log(`Listen on http://localhost:3000...`))

export const api = functions.https.onRequest(app) //exports our cloud function