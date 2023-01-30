import { useCurrentUser } from "../../providers/UserProvider"
import { useState, useEffect } from "react";
import logoutIcon from '../../img/logoutIcon.png'
import './styles.css'


function LoginManager() {
    const { user, user2, logout, login, register } = useCurrentUser();
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerUsername, setRegisterUsername] = useState("")
    
    const [registered, setRegistered] = useState(true);

    const loginArea = (
        <div className="loginArea">
            <h3>Login</h3>
            <input placeholder='Email' defaultValue="teste@test.com" onChange={(e) => { setLoginEmail(e.target.value) }}></input>
            <input placeholder='Password' defaultValue="123456789" onChange={(e) => { setLoginPassword(e.target.value) }}></input>
            <button onClick={() => login(loginEmail, loginPassword)}> Login </button>
        </div>
    )
    const registerArea = (
        <div className="regArea">
            <h3>Register</h3>
            <input placeholder='Email' defaultValue="teste3@test.com" onChange={(e) => { setRegisterEmail(e.target.value) }}></input>
            <input placeholder='Password' defaultValue="123456789" onChange={(e) => { setRegisterPassword(e.target.value) }}></input>
            <input placeholder='Username' defaultValue="Test Username" onChange={(e) => { setRegisterUsername(e.target.value) }}></input>
            <button onClick={() => register(registerEmail, registerPassword, registerUsername)}> Login </button>
        </div>
    )
    const loginDiv = (
        <div className="logRegArea">
            <div className="menuLogReg">
                <button onClick={() => changeMenu(true)}>Login</button>
                <button onClick={() => changeMenu(false)}>Register</button>
            </div>
            { registered ? loginArea : registerArea }
        </div>
    )

    const logoutDiv = (
        <div className="loggedArea">
            {/* <h3>Register</h3>
                <input placeholder='Email' onChange={(e) => { setRegisterEmail(e.target.value) }}></input>
                <input placeholder='Password' onChange={(e) => { setRegisterPassword(e.target.value) }}></input>
                <button onClick={register}> Create User </button> */}
            <h2 className="greetingText"> Hi {user2?.firstName}</h2>
            <input placeholder="Search your game"></input>
            <h3>You've played for {user2?.totalGametime} hours </h3>
            <button className="logoutBtn" onClick={logout}><img src={logoutIcon} /></button>
        </div>
    )

    const changeMenu = (e) => {
        setRegistered(e)
    }

    const test = () => {
        console.log(user2)
    }
    return (
        <div className="userManagerArea">
            <h1 onClick={test}>Test</h1>
            {user ? logoutDiv : loginDiv}
        </div>
    )
}

export default LoginManager;

/*

const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth)
    }
*/