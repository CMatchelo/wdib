import { useState } from "react"
import { db } from '../../firebase-config'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useCurrentUser } from "../../providers/UserProvider"
import './styles.css'

function CreateGame() {
    const { user, user2 } = useCurrentUser();
    const [newTitle, setNewTitle] = useState("")
    const [newRate, setNewRate] = useState(0)
    const [newPlataform, setNewPlataform] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newGametime, setNewGametime] = useState("")
    // const [obj, setNewObj] = useState([
    //     {
    //         "id": 1,
    //         "title": "Forza Motorsports 7",
    //         "plataform": "Xbox One, Xbox Series, PC",
    //         "year": 2017,
    //         "genrer": "Racing, Simulator",
    //         "url": "https://howlongtobeat.com/games/46400_Forza_Motorsport_7.jpg?width=250"
    //     },
    //     {
    //         "id": 2,
    //         "title": "GTA 5",
    //         "plataform": "Xbox 360, Xbox One, Xbox Series, PS3, PS4, PS5, PC",
    //         "year": 2013,
    //         "genrer": "Action, Open world",
    //         "url": "https://howlongtobeat.com/games/46400_Forza_Motorsport_7.jpg?width=250"
    //     }
    // ])
    const createGame = async () => {
        if (newDate && newTitle && newRate && newPlataform) {
            var date = newDate.split("-");
            var newDate2 = new Date(date[0], date[1] - 1, date[2]);
            await addDoc(collection(db, `users/${user.user.uid}/games`), { title: newTitle, rate: Number(newRate), plataform: newPlataform, url: newUrl, dataFinished: newDate2, gametime: newGametime })
            user2.totalGametime = (+user2.totalGametime) + (+newGametime)
            await setDoc(doc(db, 'users', user.user.uid), { totalGameTime: user2.totalGameTime }, { merge: true });
            //window.location.reload(false);
        } else {
            alert("Preenchas todos os dados obrigatórios")
        }

        //await addDoc(collection(db, "gamesDB"), {obj})
        // obj.map(user => {
        //     addDoc(collection(db, "gamesDB"), user)
        //       .then(function(docRef) {
        //           console.log("Document written with ID: ", docRef.id);
        //       })
        //       .catch(function(error) {
        //           console.error("Error adding document: ", error);
        //       });
        //   });
    }

    return (
        <>
        <div>
            
        </div>
        <div className="registerArea">
            {user && (
                <>
                    <span className="titleRegister">Didn't find a game? <br /> Register here</span>
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
                </>
            )}

        </div>
        </>
    )
}

export default CreateGame;