import { useState } from "react"
import { db } from '../../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import './styles.css'

function CreateGame() {
    const gamesCollectionRef = collection(db, "games");
    const [newTitle, setNewTitle] = useState("")
    const [newRate, setNewRate] = useState(0)
    const [newPlataform, setNewPlataform] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newGametime, setNewGametime] = useState("")
    const createGame = async () => {
        if (newTitle && newRate && newPlataform && newDate) {
            alert("cadastra");
            await addDoc(gamesCollectionRef, { title: newTitle, rate: Number(newRate), plataform: newPlataform, url: newUrl,  dataFinished: newDate, gametime: newGametime})
        } else {
            alert("Preenchas todos os dados obrigatórios")
        }
    }

    return (
        <div className="registerArea">
            <div className="registerInfos">
                <input
                    className="gameInfoInput"
                    placeholder='Title'
                    onChange={(event) => {
                        setNewTitle(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    type="number"
                    placeholder='Rating'
                    onChange={(event) => {
                        setNewRate(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    placeholder='Plataform'
                    onChange={(event) => {
                        setNewPlataform(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    placeholder='URL'
                    onChange={(event) => {
                        setNewUrl(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    placeholder='Date'
                    onChange={(event) => {
                        setNewDate(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    placeholder='Gametime'
                    onChange={(event) => {
                        setNewGametime(event.target.value)
                    }}
                />
            </div>
            <div className="registerSend">
                <button className="gameRegisterBtn" onClick={createGame}>Zerei</button>
            </div>

        </div>
    )
}

export default CreateGame;