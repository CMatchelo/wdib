import React, { useState } from 'react';
import { useCurrentUser } from "../../providers/UserProvider"
//import { db } from '../../firebase-config'
//import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import './styles.css'
import { useEffect } from 'react';

const GamePage = ({ gameSelected }) => {
    const { games, setGames } = useCurrentUser();
    const [newTitle, setNewTitle] = useState("")
    const [newRate, setNewRate] = useState(0)
    const [newPlataform, setNewPlataform] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newGametime, setNewGametime] = useState("")
    const [gameOpened, setGameOpened] = useState(null)

    useEffect(() => {
        setGameOpened(gameSelected);
        setNewTitle(gameSelected?.title);
        setNewUrl(gameSelected?.url)
    }, [gameSelected])

    const saveGame = async () => {
        if (newDate && newRate && newPlataform) {
            var date = newDate.split("-");
            var newDate2 = new Date(date[0], date[1] - 1, date[2]);
            /*await addDoc(collection(db, `users/${user.user.uid}/games`),
                {
                    title: newTitle,
                    rate: Number(newRate),
                    plataform: newPlataform,
                    url: newUrl,
                    dataFinished: newDate2,
                    gametime: newGametime
                })
            user2.totalGametime = (+user2.totalGametime) + (+newGametime)
            console.log(newTitle, newRate, newPlataform, newUrl, newDate, newGametime)
            console.log(user2.totalGametime)
            await setDoc(doc(db, 'users', user.user.uid, 'infos', 'infos'), { totalGametime: user2.totalGametime }, { merge: true });
            */var newGame =
            {
                title: newTitle,
                rate: Number(newRate),
                plataform: newPlataform,
                url: newUrl,
                dataFinished: newDate2,
                gametime: newGametime
            }
            setGames([...games, newGame]);
            document.getElementById("registerArea").style.display = "none";
        } else {
            alert("Preenchas todos os dados obrigatórios")
        }
    }
    const closeGamePage = () => {
        setGameOpened(null);
    }
    const checkValue = (val, type) => {
        console.log(val)
        if (type === "time") {
            console.log(type)
            if (parseInt(val) < 1) {
                val = 1;
                console.log(val)
            }
        }
    }
    return (
        <div>
            {gameOpened && (
                <div className='gameWindow'>
                    <div>
                        <span className='closeGamePageBtn' onClick={closeGamePage}>X</span>
                    </div>
                    <div className='gamePageCover'>
                        <img src={gameSelected?.url} alt='GameCover not found'></img>
                    </div>
                    <div className='gamePageData'>
                        <div className='gamePageInfo'>
                            <div className='gamePageTitleArea'>
                                <span
                                    className='gamePageTitle'
                                >
                                    {gameSelected?.title}&nbsp;
                                </span>
                                <span className='gamePageYear'>
                                    {gameSelected?.year}
                                </span>
                            </div>
                            <div className='gamePagePlatformsList'>
                                {gameSelected?.platforms.map((option, index) => (
                                    <span className='gamePageReponse' key={index}>{option}&nbsp;</span>
                                ))}
                            </div>
                            {/* <div className='gamePageBtns'>
                                <button className='gamePageBtn'>Completed</button>
                                <button className='gamePageBtn'>Backlog List</button>
                                <button className='gamePageBtn'> S2 </button>
                            </div> */}
                        </div>
                        <div className='gamePageInputs'>
                            <span>Platform </span>
                            <select className='gameInfoInput gameCompletedInfo'
                                onChange={(event) => {
                                    setNewPlataform(event.target.value)
                                }}
                            >
                                <option key="" value=""> - Select - </option>
                                {gameSelected?.platforms.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <span>Date </span>
                            <input
                                className='gameInfoInput gameCompletedInfo'
                                type="date"
                                onChange={(event) => {
                                    setNewDate(event.target.value)
                                }}
                            />

                            <span>Game time (in hours) </span>
                            <input
                                className='gameInfoInput gameCompletedInfo'
                                type="number"
                                min={0}
                                onChange={(event) => {
                                    setNewGametime(event.target.value);
                                    checkValue(event.target.value, "time");
                                }}
                            />

                            <span>Rating </span>
                            <input
                                className='gameInfoInput gameCompletedInfo'
                                type="number"
                                max={10}
                                min={0}
                                onChange={(event) => {
                                    setNewRate(event.target.value);
                                    checkValue(event.target.value, "rating");
                                }}
                            />
                            <button
                                className='gamePageBtn'
                                onClick={saveGame}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePage;
