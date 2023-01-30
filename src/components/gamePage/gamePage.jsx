import React, { useState, useEffect } from 'react';

function GamePage() {
    const [game, setGame] = useState({});

    // useEffect(() => {
    //     fetch('https://api.igdb.com/v4/games/1945?fields=*', {  // Enter your IP address here

    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Client-ID': 'zimtcekjnrntqn51rx5jmqdkpev1c9',
    //             'Authorization': 'Bearer g5sn5isnjfjygvi5f9xruvsjsl1zam',
    //         }
    //         //data: "fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;"
    //     })
    //         .then(resposta => {
    //             return resposta.json()
    //         })
    //         .then(json => {
    //             console.log(json);
    //             return json;
    //         })
    // }, []);



    return (
        <div>
            {/* <h1>{game.name}</h1>
            <p>{game.summary}</p> */}
        </div>
    );
};

export default GamePage;
