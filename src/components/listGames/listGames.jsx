import star from '../../img/starFilled.png'
import './styles.css'
import GameCard from "../gameCard/gameCard"
import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useCurrentUser } from "../../providers/UserProvider"
import 'reactjs-popup/dist/index.css';
import { useState } from "react";


function ListGames() {
    const { games } = useCurrentUser();
    const [ allGames, setAllGames ] = useState([])

    useEffect( () => {
        setAllGames(games)
        console.log(games)
    },[games])


    return (
        <div className="gamesBoard">
            {games.map((game) => {
                return (
                    <div className="gameCard" key={game.id}>
                        {" "}
                        <img src={game.url} className="gameCover" alt='No cover'></img>
                        <Popup className="popup-content" trigger={
                            <div className="gameInfos">
                                <h1>{game.title} </h1>
                                <h1>{game.plataform} </h1>
                            </div>
                        } position="right center">
                            <div>
                                <GameCard {...game} className="popup-content" />
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