import { FieldValue } from "firebase-admin/firestore";
import { db } from "./dbConnect.js"; 

const collection = db.collection("shows"); 

export async function getShows(req, res) {
    const showsCollection = await collection.get()
    const shows = showsCollection.docs.map(doc =>({...doc.data(), id: doc.id}))
    res.send(shows)
}

export async function addShow(req, res) {
    const { year, title, poster, seasons } = req.body 
    if(!title) { //you could (!title || !poster || !seasons) and have all required; adding a respective response 
        res.status(400).send({ message: "Show title is required." })
        return
    }
    const newShow = {
        year, 
        title,
        poster, 
        seasons,
        createdAt: FieldValue.serverTimestamp()
    }

    await collection.add(newShow) //add the new show
    getShows(req, res) //return the updated list
}

export async function deleteShow(res, req) {
    const { showId } = req.params
    await collection.doc(showId).delete()
    getShows(req,res)
}