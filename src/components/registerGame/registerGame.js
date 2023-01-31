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
    const [obj, setNewObj] = useState([
        {
            "id": 11,
            "title": "Grand Theft Auto III",
            "year": 2001,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 2", "PC", "Xbox", "Android", "iOS"],
            "url": "https://howlongtobeat.com/games/250px-GTA3boxcover.jpg?width=250"
          },
          {
            "id": 12,
            "title": "Grand Theft Auto: Vice City",
            "year": 2002,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 2", "PC", "Xbox", "Android", "iOS"],
            "url": "https://howlongtobeat.com/games/4075_Grand_Theft_Auto_Vice_City.jpg?width=250"
          },
          {
            "id": 13,
            "title": "Grand Theft Auto: San Andreas",
            "year": 2004,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 2", "PC", "Xbox", "Android", "iOS"],
            "url": "https://howlongtobeat.com/games/GTASABOX.jpg?width=250"
          },
          {
            "id": 14,
            "title": "Grand Theft Auto IV",
            "year": 2008,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3", "Xbox 360", "PC"],
            "url": "https://howlongtobeat.com/games/250px-GTAIV_Logo.jpg?width=250"
          },
          {
            "id": 15,
            "title": "Grand Theft Auto V",
            "year": 2013,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3", "Xbox 360", "PlayStation 4", "Xbox One", "PC"],
            "url": "https://howlongtobeat.com/games/250px-GTAIV_Logo.jpg?width=250"
          },
          {
            "id": 16,
            "title": "Uncharted: Drake's Fortune",
            "year": 2007,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3"],
            "url": "https://howlongtobeat.com/games/Uncharted_Drakes_Fortune.jpg?width=250"
          },
          {
            "id": 17,
            "title": "Uncharted 2: Among Thieves",
            "year": 2009,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3"],
            "url": "https://howlongtobeat.com/games/Uncharted_2_updated_PS3_logo.jpg?width=250"
          },
          {
            "id": 18,
            "title": "Uncharted 3: Drake's Deception",
            "year": 2011,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3"],
            "url": "https://howlongtobeat.com/games/Uncharted_3_Boxart.jpg?width=250"
          },
          {
            "id": 19,
            "title": "Uncharted 4: A Thief's End",
            "year": 2016,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 4"],
            "url": "https://howlongtobeat.com/games/Uncharted_4_Reveal_Wallpaper.jpg?width=250"
          },
          {
            "id": 20,
            "title": "Batman: Arkham Asylum",
            "year": 2009,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3", "Xbox 360", "PC"],
            "url": "https://howlongtobeat.com/games/Batman_Arkham_Asylum_GOTY.jpg?width=250"
          },
          {
            "id": 21,
            "title": "Batman: Arkham City",
            "year": 2011,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 3", "Xbox 360", "PC", "Wii U"],
            "url": "https://howlongtobeat.com/games/11963_Batman_Arkham_City_GOTY.jpg?width=250"
          },
          {
            "id": 22,
            "title": "Batman: Arkham Knight",
            "year": 2015,
            "genre": "Action-adventure",
            "platforms": ["PlayStation 4", "Xbox One", "PC"],
            "url": "https://howlongtobeat.com/games/Batman_Arkham_Knight_Cover_Art.jpg?width=250"
          }
    ])
    const createGame = async () => {
        if (newDate && newTitle && newRate && newPlataform) {
            var date = newDate.split("-");
            var newDate2 = new Date(date[0], date[1] - 1, date[2]);
            await addDoc(collection(db, `users/${user.user.uid}/games`), { title: newTitle, rate: Number(newRate), plataform: newPlataform, url: newUrl, dataFinished: newDate2, gametime: newGametime })
            user2.totalGametime = (+user2.totalGametime) + (+newGametime)
            console.log(user2.totalGametime)
            await setDoc(doc(db, 'users', user.user.uid, 'infos', 'infos'), { totalGametime: user2.totalGametime }, { merge: true });
            //window.location.reload(false);
        } else {
            alert("Preenchas todos os dados obrigatórios")
        }

        // await addDoc(collection(db, "gamesDB"), {obj})
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
                                placeholder='Game Title *'
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
                                placeholder='Cover Image URL'
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
                                type="number"
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