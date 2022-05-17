import React from 'react';
import 'reactjs-popup/dist/index.css';
import './styles.css'

function GameCard(game) {

    var gametime, dataFinished;
    if (game.gametime) {
        gametime = game.gametime + " hours";
    } else {
        gametime = "No info"
    }
    if (game.dataFinished) {
        dataFinished = game.dataFinished.seconds;
        var a = new Date(dataFinished * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        dataFinished = date + ' ' + month + ' ' + year;
    } else {
        dataFinished = "No info"
    }


    return (
        <div className='popupGameCard'>
            <div className='popupGameCover'>
                <img src={game.url} className="gameCover" alt='No cover'></img>
            </div>
            <div className='popupGameInfos'>
                <h1>Title: {game.title}</h1>
                <h1>Date: {dataFinished} </h1>
                <h1>Plataform: {game.plataform}</h1>
                <h1>Gametime: {gametime} </h1>
                <h1>Rating: {game.rate}/10 </h1>
            </div>
        </div>
    )
}

export default GameCard;
