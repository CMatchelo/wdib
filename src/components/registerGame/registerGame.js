import { useState } from "react"
import { db } from '../../firebase-config'
import { collection, addDoc, setDoc } from 'firebase/firestore'
import { useCurrentUser } from "../../providers/UserProvider"
import './styles.css'

function CreateGame() {
    const { user } = useCurrentUser();
    const gamesCollectionRef = collection(db, "games");
    const [newTitle, setNewTitle] = useState("")
    const [newRate, setNewRate] = useState(0)
    const [newPlataform, setNewPlataform] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newGametime, setNewGametime] = useState("")
    const createGame = async () => {
        if (newDate && newTitle && newRate && newPlataform) {
            var date = newDate.split("-");
            var newDate2 = new Date(date[0], date[1] - 1, date[2]);
            await addDoc(collection(db, user.user.uid), { title: newTitle, rate: Number(newRate), plataform: newPlataform, url: newUrl, dataFinished: newDate2, gametime: newGametime })
            console.log(user.user.uid)
            //window.location.reload(false);
        } else {
            alert("Preenchas todos os dados obrigatórios")
        }
    }

    return (
        <div className="registerArea">
            <span className="titleRegister">Beated +1 game? <br /> Register here</span>
            <div className="registerInfos">
                <input
                    className="gameInfoInput"
                    placeholder='Title *'
                    onChange={(event) => {
                        setNewTitle(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    type="number"
                    min="0"
                    max="10"
                    placeholder='Rating *'
                    onChange={(event) => {
                        setNewRate(event.target.value)
                    }}
                />
                
                <select name="select" className="gameInfoInput" onChange={(event) => {
                        setNewPlataform(event.target.value)
                    }}>
                    <option value="Xbox Serie">Xbox Series</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Xbox 360">Xbox 360</option>
                    <option value="PC">PC</option>
                    <option value="Playstation 5">Playstation 5</option>
                    <option value="Playstation 4">Playstation 4</option>
                    <option value="Playstation 3">Playstation 3</option>
                </select>
                <input
                    className="gameInfoInput"
                    placeholder='Image URL'
                    onChange={(event) => {
                        setNewUrl(event.target.value)
                    }}
                />
                <input
                    type="date"
                    className="gameInfoInput"
                    placeholder='Date *'
                    onChange={(event) => {
                        setNewDate(event.target.value)
                    }}
                />
                <input
                    className="gameInfoInput"
                    placeholder='Gametime in hours'
                    onChange={(event) => {
                        setNewGametime(event.target.value)
                    }}
                />
            </div>
            <div className="registerSend">
                <button className="gameRegisterBtn" onClick={createGame}>Beaten</button>
            </div>

        </div>
    )
}

export default CreateGame;