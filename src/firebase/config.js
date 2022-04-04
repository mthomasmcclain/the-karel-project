import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDqu6akBmvGoHgtZA6TYfoiI29ESgIZdYo",
    authDomain: "the-karel-project.firebaseapp.com",
    projectId: "the-karel-project",
    storageBucket: "the-karel-project.appspot.com",
    messagingSenderId: "750205772439",
    appId: "1:750205772439:web:e1b8f3698d3dccfeadffd2",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }