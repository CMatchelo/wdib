import { useCurrentUser } from "../../providers/UserProvider"
import { useState, useEffect } from "react";
import logoutIcon from '../../img/logoutIcon.png'
import searchIcon from '../../img/searchIcon.png'
import joystickIcon from '../../img/joystickIcon.png'
import './styles.css'
import GamePage from "../gamePage/gamePage";


function LoginManager() {
    const { user, user2, gamesDB, logout, login, register } = useCurrentUser();
    const [loginEmail, setLoginEmail] = useState("teste3@test.com")
    const [loginPassword, setLoginPassword] = useState("123456789")

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerUsername, setRegisterUsername] = useState("")

    const [registered, setRegistered] = useState(true);
    const [query, setQuery] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);
    const [gameSelected, setGameSelected] = useState(null)

    const blurSearch = () => {
        setTimeout(() => {
            setFilteredGames([]);
            document.getElementById("searchArea").classList.remove('searchAreaMobile');
        }, "100")
    }
    const changeMenu = (e) => {
        setRegistered(e)
    }
    // Login Form
    const loginArea = (
        <div className="loginArea">
            <h3>Login</h3>
            <input className="inputInitial" placeholder='Email' value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }}></input>
            <input className="inputInitial" placeholder='Password' value={loginPassword} type="password" onChange={(e) => { setLoginPassword(e.target.value) }}></input>
            <button onClick={() => login(loginEmail, loginPassword)}> Login </button>
        </div>
    )

    // Register Form
    const registerArea = (
        <div className="regArea">
            <h3>Register</h3>
            <input className="inputInitial" placeholder='Email' value={registerEmail} onChange={(e) => { setRegisterEmail(e.target.value) }}></input>
            <input className="inputInitial" placeholder='Password' value={registerPassword} type="password" onChange={(e) => { setRegisterPassword(e.target.value) }}></input>
            <input className="inputInitial" placeholder='Username' defaultValue="Test Username" onChange={(e) => { setRegisterUsername(e.target.value) }}></input>
            <button onClick={() => register(registerEmail, registerPassword, registerUsername)}> Register </button>
        </div>
    )

    // Initial page to login or register
    const loginDiv = (
        <div className="logRegArea">
            <div className="menuLogReg">
                <button className={registered ? "btnActive" : ""} onClick={() => changeMenu(true)}>Login</button>
                <button className={registered ? "" : "btnActive"} onClick={() => changeMenu(false)}>Register</button>
            </div>
            {registered ? loginArea : registerArea}
        </div>
    )
    const openSeach = () => {
        document.getElementById("searchArea").classList.add('searchAreaMobile');
        document.getElementById("searchInput").focus();
    }
    // Topbar with logout
    const logoutDiv = (
        <div className="loggedArea">
            <h2 className="greetingText"> Hi {user2?.username}</h2>
            <div className="searchArea" id="searchArea">
                <input
                    id="searchInput"
                    className="searchInput"
                    type="text"
                    placeholder="Search for a game..."
                    value={query}
                    onChange={(e => setQuery(e.target.value))}
                    // onBlur={() => setFilteredGames([])}
                    onBlur={blurSearch}
                />
                {filteredGames.length > 0 && (
                    <ul>
                        {filteredGames.map(game => (
                            <li onClick={() => setGameSelected(game)} key={game.title}><img alt={"cover_" + game.title} className="coverList" src={game.url} /> {game.title} - {game.year}</li>
                        ))}
                    </ul>
                )}
                {/* {(filteredGames.length === 0 && query !== "" && document.getElementById('searchInput') === document.activeElement) && (
                    <ul>
                        Register here
                    </ul>
                )} */}
            </div>
            <h3 className="timePlayedText"><img src={joystickIcon} alt="Gametime" /> {user2?.totalGametime} hours </h3>
            <button onClick={openSeach} className="logoutBtn searchBtn"><img src={searchIcon} alt="search" /></button>
            <button className="logoutBtn" onClick={logout}><img src={logoutIcon} alt="logout" /></button>
        </div>
    )
    
    // Search for game and fill list          
    useEffect(() => {
        if (query !== "") {
            var q = query.replace(/[^A-Za-z0-9]/g, '');
            const results = gamesDB.filter(game =>
                game.title.toLowerCase().replace(/[^A-Za-z0-9]/g, '').includes(q.toLowerCase())
            );
            setFilteredGames(results);
            if (filteredGames.length === 0) {
                console.log(filteredGames.length)
                document.getElementById("registerArea").style.display = "flex";
            } else {
                document.getElementById("registerArea").style.display = "none";
            }
        } else {
            setFilteredGames([]);
            document.getElementById("registerArea").style.display = "none";
        }
    }, [query, gamesDB, filteredGames.length]);

    // eslint-disable-next-line no-unused-vars
    const test = () => {
        console.log(user, user2)
    }
    return (
        <div className="userManagerArea">
            {/* <h1 onClick={test}>Test</h1> */}
            {user ? logoutDiv : loginDiv}
            <GamePage gameSelected={gameSelected} />
        </div>
    )
}

export default LoginManager;