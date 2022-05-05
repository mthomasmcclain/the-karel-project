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


// SCRIPT RAN TO COPY COLLECTION CONTENT ==> CONTENTV2
// added imports above for { collection, getDocs, doc, setDoc }

// const logAll = async () => {
//     const querySnapshot = await getDocs(collection(db, "content"));
//     querySnapshot.forEach(dbdoc => {
//         const id = dbdoc.id
//         const data = dbdoc.data()
//         const parsedSrc = JSON.parse(data.src)

//         if (parsedSrc.graph) { // is map
//             try {
//                 const docRef = doc(db, "contentv2", id)
//                 setDoc(docRef, data)
//             } catch (e) {
//                 console.warn('Error in writeAll', e)
//             }
//             console.log(id, 'is map')
//         } else { // is graph
//             const newSrcUnJSON = { ...parsedSrc }
//             newSrcUnJSON.worlds = [
//                 {
//                     preWorld: { ...parsedSrc.preWorld },
//                     postWorld: { ...parsedSrc.postWorld }

//                 }
//             ]
//             delete newSrcUnJSON.preWorld
//             delete newSrcUnJSON.postWorld
//             newSrcUnJSON.maxBlocks = parsedSrc.karelBlockly.settings.maxBlocks
//             if (newSrcUnJSON.maxBlocks === -1) newSrcUnJSON.maxBlocks = null
//             delete newSrcUnJSON.karelBlockly.settings.maxBlocks
//             const src = JSON.stringify(newSrcUnJSON)
//             const newData = { src }
//             if (data.isExpert) newData.isExpert = true
//             try {
//                 const docRef = doc(db, "contentv2", id)
//                 setDoc(docRef, newData )
//             } catch (e) {
//                 console.warn('Error in writeAll', e)
//             }

//             console.log(id, newSrcUnJSON)
//         }
//     })
// }
// logAll()

export { db }