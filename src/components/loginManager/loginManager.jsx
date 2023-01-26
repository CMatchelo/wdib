import { useCurrentUser } from "../../providers/UserProvider"
import { useState } from "react";


function LoginManager() {
    const { user, logout, login, register } = useCurrentUser();
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const loginDiv = (
        <div>
            <h3>Login</h3>
            <input placeholder='Email' onChange={(e) => { setLoginEmail(e.target.value) }}></input>
            <input placeholder='Password' onChange={(e) => { setLoginPassword(e.target.value) }}></input>
            <button onClick={() => login(loginEmail, loginPassword)}> Login </button>
        </div>
    )

    const logoutDiv = (
        <div>
            {/* <h3>Register</h3>
            <input placeholder='Email' onChange={(e) => { setRegisterEmail(e.target.value) }}></input>
            <input placeholder='Password' onChange={(e) => { setRegisterPassword(e.target.value) }}></input>
            <button onClick={register}> Create User </button> */}
            <button onClick={logout}>Logout</button>
        </div>
    )

    const test = () => {
        console.log(user?.user.uid)
    }
    return (
        <div className="loginArea">
            {user ? logoutDiv : loginDiv}
            <h2 onClick={test}>{user?.user.email}</h2>
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