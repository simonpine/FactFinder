import { Link } from "react-router-dom";
import { useState } from "react";
import burger from '../img/menu-burger.png'
import git from '../img/github-logo.png'
import Google from '../img/Google.png'
// import Google2 from '../img/Google2.png'
import close from '../img/cross-small.png'
import { auth } from '../fireBaseCom'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from "firebase/compat/app";
import lock from '../img/lock.png'

import linkedin from '../img/linkedin.png'
import instragram from '../img/instagram.png'
import simonPine from '../img/simonpine.png'
import github from '../img/github-sign.png'
import Logo from '../img/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom';


// auth.signOut()
function Navbar({ selected }: {
    selected: number;
}) {
    let location = useLocation();
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState(false)
    return (
        <>
            {settings &&
                <>
                    <div onClick={() => setSettings(false)} className="ContWithTheQuit">
                    </div>
                    <div className="FullContSetting">
                        <div className="NameAndLogo">
                            <button onClick={() => setSettings(false)} className="ButtonIcon CloseButton">
                                <img alt="Close Button" src={close} />
                            </button>
                            <img alt="User logged icon" className="UserLogoSettings" src={auth.currentUser.photoURL} />
                        </div>
                        <div className="NameAndLogo">
                            <h3>{auth.currentUser.displayName}</h3>
                        </div>
                        <button onClick={() => {
                            if (location.pathname === '/saved') {
                                setSettings(false)
                                navigate('/')
                                auth.signOut()
                            }
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
                        <div className={`${selected !== 1 && 'borderDetail'}`}>
                            <Link className={`NavMoveItem ${selected === 1 && 'NavOptionSelected'}`} to={{ pathname: "/" }}>Home</Link>
                        </div>
                    </li>
                    <li className="ListNavItem">
                        <div className={`${selected !== 2 && 'borderDetail'}`}>
                            <Link className={`NavMoveItem ${selected === 2 && 'NavOptionSelected'}`} to={{ pathname: "/discover" }}>Discover</Link>
                        </div>
                    </li>
                    <li className="ListNavItem">
                        <div className={`br ${selected !== 3 && 'borderDetail'} `}>
                            {user ?
                                <Link className={`NavMoveItem ${selected === 3 && 'NavOptionSelected'}`} to={{ pathname: "/saved" }}>Saved
                                </Link>
                                :
                                <div className="NavMoveItem">
                                    Saved
                                    {!user && <img alt='Please log in to acces to this function' src={lock} />}

                                </div>
                            }
                        </div>
                    </li>
                </ul>
                <footer className="MiniIconCont">
                    <a className="MiniIconInformation" target="blank" href="https://www.linkedin.com/in/simon-pineda-0b8abb251/">
                        <img alt="Linkedin of Simon Pineda" src={linkedin} />
                    </a>
                    <a className="MiniIconInformation" target="blank" href="https://www.simonpine.com">
                        <img alt="Portfolio of Simon Pineda" src={simonPine} />
                    </a>
                    <a className="MiniIconInformation" target="blank" href="https://github.com/simonpine">
                        <img alt="Github of Simon Pineda" src={github} />
                    </a>
                    <a className="MiniIconInformation" target="blank" href="https://www.instagram.com/simonpineda0521/">
                        <img alt="Instagram of Simon Pineda" src={instragram} />
                    </a>
                </footer>
            </aside>
            <nav className="navbar">
                <Link to={{ pathname: "/" }} className={`AppTitleUni ${selected === 1 && 'nonnHover'}`}>
                    <h2 className='NavTitle'>Fact</h2>
                    <h2 className="NavTitle FinderBorder">Finder</h2>
                    <h1 className="MiniDescrip">Explore &  <br></br> Discover</h1>
                    <div className='LogoNavMobil MagicalBorder'>
                        <img alt='FactFinder logo' src={Logo} />
                    </div>
                </Link>
                <div className="AppTitleUni2">
                    <a id="GithubButton" className="GitHubButton" target="blank" href="https://github.com/simonpine/FactFinder">
                        <img alt="Github icon button" src={git} />
                        Model code
                    </a>
                    {!user ?
                        <button onClick={signInWithGoogle} className="GitHubButton">
                            <img alt="Google icon button" src={Google} />
                            Sign in
                        </button>
                        :
                        <button onClick={() => setSettings(true)} className="GitHubButton">
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