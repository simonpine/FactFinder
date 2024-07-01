import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import burger from '../img/menu-burger.png'
import git from '../img/github-logo.png'
import Google from '../img/Google.png'
import close from '../img/cross-small.png'
import { auth } from '../fireBaseCom'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from "firebase/compat/app";
import lockImg from '../img/lock.png'
import { useKeyPressEvent } from "react-use";
import linkedin from '../img/linkedin.png'
import instragram from '../img/instagram.png'
import simonPine from '../img/simonpine.png'
import github from '../img/github-sign.png'
import Logo from '../img/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollLock } from 'usehooks-ts'


// auth.signOut()
function Navbar() {
    let location = useLocation();
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState(false)
    const { lock, unlock } = useScrollLock({
        autoLock: false,
      })
    useKeyPressEvent("Escape", () => {
        unlock()
        setSettings(false)
    });
    return (
        <>
            {settings &&
                <>
                    <div onClick={() => {
                        unlock()
                        setSettings(false)
                    }} className="ContWithTheQuit">
                    </div>
                    <div className="FullContSetting">
                        <div className="NameAndLogo">
                            <button onClick={() => {
                                unlock()
                                setSettings(false)
                            }} className="ButtonIcon CloseButton">
                                <img alt="Close Button" src={close} />
                            </button>
                            <img alt="User logged icon" className="UserLogoSettings" src={auth.currentUser.photoURL} />
                        </div>
                        <div className="NameAndLogo">
                            <h3>{auth.currentUser.displayName}</h3>
                        </div>
                        <button onClick={() => {
                            if (location.pathname === '/saved') {
                                unlock()
                                setSettings(false)
                                navigate('/')
                                auth.signOut()
                            }
                            unlock()
                            setSettings(false)
                            auth.signOut()
                        }} className="GitHubButton ColorChangeButton">
                            Log out
                        </button>
                    </div>
                </>
            }
            {isOpen && <div onClick={() => {
                setIsOpen(false)
            }} className="BackButtonToClose"></div>}
            <aside className={`SideBar ${!isOpen && "SideBarHide"}`}>
                <button onClick={() => {
                    setIsOpen(false)
                }} className="ButtonIcon CloseButton">
                    <img alt="Close Button" src={close} />
                </button>
                <ul className="ListNavCont">
                    <li className="ListNavItem">
                        <NavLink style={{ textDecoration: 'none' }} to={{ pathname: "/" }}>
                            {({ isActive }) => (
                                <div className={`${!isActive && 'borderDetail'}`}>
                                    <h3 onClick={() => {!isActive && setIsOpen(false)}} className={`NavMoveItem ${isActive && 'NavOptionSelected'}`} >Home</h3>
                                </div>
                            )}
                        </NavLink>
                    </li>
                    <li className="ListNavItem">
                        <NavLink style={{ textDecoration: 'none' }} to={{ pathname: "/discover" }}  >
                            {({ isActive }) => (
                                <div className={`${!isActive && 'borderDetail'}`}>
                                    <h3 onClick={() => {!isActive && setIsOpen(false)}}  className={`NavMoveItem ${isActive && 'NavOptionSelected'}`} >Discover</h3>
                                </div>
                            )}
                        </NavLink>
                    </li>
                    <li className="ListNavItem">
                        {user ?
                            <NavLink style={{ textDecoration: 'none' }} to={{ pathname: "/saved" }} onClick={() => { setIsOpen(false) }} >
                                {({ isActive }) => (
                                    <div className={`${!isActive && 'borderDetail'}`}>
                                        <h3 onClick={() => { setIsOpen(false) }} className={`NavMoveItem ${isActive && 'NavOptionSelected'}`} >Saved</h3>
                                    </div>
                                )}
                            </NavLink>
                            :
                            <div className="borderDetail">
                                <div className="NavMoveItem">
                                    Saved
                                    <img alt='Please log in to acces to this function' src={lockImg} />

                                </div>
                            </div >
                        }
                    </li>
                </ul>
                <footer>
                    <ul className="MiniIconCont">
                        <li>
                            <a className="MiniIconInformation" target="blank" href="https://www.linkedin.com/in/simon-pineda-0b8abb251/">
                                <img alt="Linkedin of Simon Pineda" src={linkedin} />
                            </a>
                        </li>
                        <li>
                            <a className="MiniIconInformation" target="blank" href="https://www.simonpine.com">
                                <img alt="Portfolio of Simon Pineda" src={simonPine} />
                            </a>
                        </li>
                        <li>
                            <a className="MiniIconInformation" target="blank" href="https://github.com/simonpine">
                                <img alt="Github of Simon Pineda" src={github} />
                            </a>
                        </li>
                        <li>
                            <a className="MiniIconInformation" target="blank" href="https://www.instagram.com/simonpineda0521/">
                                <img alt="Instagram of Simon Pineda" src={instragram} />
                            </a>
                        </li>
                    </ul>
                    <h4 className="Rights">© 2024 SimonPine, Inc</h4>
                </footer>
            </aside>
            <nav className="navbar">
                <Link to={{ pathname: "/" }} className={`AppTitleUni`}>
                    <h2 className='NavTitle'>Fact</h2>
                    <h2 className="NavTitle FinderBorder">Finder</h2>
                    <h1 className="MiniDescrip">The truth of <br></br>world news.</h1>
                    <div className='LogoNavMobil MagicalBorder'>
                        <img alt='FactFinder logo' src={Logo} />
                    </div>
                </Link>
                <div className="AppTitleUni2">
                    <a id="GithubButton" className="GitHubButton" target="blank" href="https://github.com/simonpine/fact-finder-api/blob/main/DataScienceAnalisisModel.ipynb">
                        <img alt="Github icon button" src={git} />
                        Model code
                    </a>
                    {!user ?
                        <button onClick={signInWithGoogle} className="GitHubButton">
                            <img alt="Google icon button" src={Google} />
                            Sign in
                        </button>
                        :
                        <button onClick={() => {
                            lock()
                            setSettings(true)
                        }} className="GitHubButton">
                            {/* <img alt="Google icon button" src={Google2} /> */}
                            <img alt={`${auth.currentUser.displayName} display icon`} style={{ borderRadius: '5px' }} src={auth.currentUser.photoURL}></img>
                            {auth.currentUser.displayName}
                        </button>
                    }
                    <button className="ButtonIcon BurgerMenu" onClick={() => {
                        setIsOpen(!isOpen)
                    }} >
                        <img alt="Button to display side menu" src={burger} />
                    </button>
                </div>
            </nav>
        </>
    )
}
export default Navbar