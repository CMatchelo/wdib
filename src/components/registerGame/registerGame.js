import { useState } from "react"
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

function CreateGame() {
    const gamesCollectionRef = collection(db, "games");
    const [newTitle, setNewTitle] = useState("")
    const [newRate, setNewRate] = useState(0)
    const [newPlataform, setNewPlataform] = useState("")
    const createGame = async () => {
        await addDoc(gamesCollectionRef, { title: newTitle, rate: Number(newRate), plataform: newPlataform })
    }

    return (
        <div>
            <input
                placeholder='Titulo'
                onChange={(event) => {
                    setNewTitle(event.target.value)
                }}
            />
            <input
                type="number"
                placeholder='Note'
                onChange={(event) => {
                    setNewRate(event.target.value)
                }}
            />
            <input
                placeholder='Plataforma'
                onChange={(event) => {
                    setNewPlataform(event.target.value)
                }}
            />
            <button onClick={createGame}>Adicionar jogo</button>
        </div>
    )
}

export default CreateGame;