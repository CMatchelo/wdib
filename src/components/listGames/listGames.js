import { useState, useEffect } from "react"
import { db } from '../../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import star from '../../img/starFilled.png'
import './styles.css'
import GameCard from "../gameCard/gameCard"
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function ListGames() {
    const [games, setGames] = useState([]);
    const gamesCollectionRef = collection(db, "games");
    
    /*const updateGame = async (id, rate) => {
        const userDoc = doc(db, "games", id)
        const newFields = { rate: rate + 1 }
        await updateDoc(userDoc, newFields)
    }

    const deleteGame = async (id) => {
        const userDoc = doc(db, "games", id)
        await deleteDoc(userDoc);
    }

    function test() {
        alert("testou")
    }*/

    useEffect(() => {
        const getGames = async () => {
            const data = await getDocs(gamesCollectionRef);
            setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getGames();
    }, )

    return (
        <div className="gamesBoard">
            {games.map((game) => {
                return (

                    <div className="gameCard">
                        {" "}
                        <img src={game.url} className="gameCover" alt='No cover'></img>
                        <Popup className="popup-content" trigger={
                            <div className="gameInfos">
                                <h1>{game.title} </h1>
                                <h1>{game.plataform} </h1>
                            </div>
                        } position="right center">
                            <div>
                                <GameCard { ... game } className="popup-content"/>
                            </div>
                        </Popup>

                        <div className="rateField">
                            <span className="numberRate">{game.rate} </span><img src={star} alt="star" className="starRate"></img>
                        </div>

                    </div>
                );
            })}
        </div>
    )
}

export default ListGames;

/*
<button onClick={() => { updateGame(game.id, game.rate) }} >Increase</button>
                        <button onClick={() => { deleteGame(game.id) }}> Excluir </button>
                        */