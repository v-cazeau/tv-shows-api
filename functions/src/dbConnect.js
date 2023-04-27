import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { key } from "../key.js"

initializeApp({ //connect to our firebase PROJECT
    credential: cert(key) //using these credentials
})

export const db = getFirestore() //connect use to FireSTORE db