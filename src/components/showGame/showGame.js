import { useState, useEffect } from "react"
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import star from '../../img/starFilled.png'
import './styles.css'


function ShowGame() {
    const [games, setGames] = useState([]);
    const gamesCollectionRef = collection(db, "games");

    const updateGame = async (id, rate) => {
        const userDoc = doc(db, "games", id)
        const newFields = { rate: rate + 1 }
        await updateDoc(userDoc, newFields)
    }

    const deleteGame = async (id) => {
        const userDoc = doc(db, "games", id)
        await deleteDoc(userDoc);
    }

    useEffect(() => {

        const getGames = async () => {
            const data = await getDocs(gamesCollectionRef);
            setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getGames();

    }, [])
    return (
        <div>
            
            <div className="gamesBoard">
            {games.map((game) => {
                return (
                    <div className="gameCard">
                        {" "}
                        <img src={game.url} className="gameCover"></img>
                        <h1>{game.title} </h1>
                        <h1>{game.plataform} </h1>
                        <div className="rateField">
                            <span>{game.rate} </span><img src={star} className="starRate"></img>
                        </div>
                        <button onClick={() => { updateGame(game.id, game.rate) }} >Increase</button>
                        <button onClick={() => { deleteGame(game.id) }}> Excluir </button>
                    </div>
                );
            })}
            </div>
        </div>
    )
}

export default ShowGame;