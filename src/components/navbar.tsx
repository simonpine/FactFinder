import { Link } from "react-router-dom";
import { useState } from "react";
import burger from '../img/menu-burger.png'
import git from '../img/github-logo.png'
import close from '../img/cross-small.png'
// import linkedin from '../img/linkedin.png'
// import instragram from '../img/instagram.png'
// import simonPine from '../img/simonpine.png'
// import github from '../img/github-sign.png'
function Navbar({ selected }: {
    selected: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {isOpen && <div onClick={() => setIsOpen(false)} className="BackButtonToClose"></div>}
            <div className={`SideBar ${!isOpen && "SideBarHide"}`}>
                <button onClick={() => setIsOpen(false)} className="ButtonIcon CloseButton">
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
                        <div className={`${selected === 1 && 'borderDetail'}`}>
                            <Link className={`NavMoveItem ${selected === 3 && 'NavOptionSelected'}`} to={{ pathname: "/saved" }}>Saved</Link>
                        </div>
                    </li>
                </ul>
                <div className="MiniIconCont">
                    {/* <a className="MiniIconInformation" target="blank" href="https://www.linkedin.com/in/simon-pineda-0b8abb251/">
                        <img alt="Linkedin of Simon Pineda" src={linkedin}/>
                    </a>
                    <a className="MiniIconInformation" target="blank" href="https://www.simonpine.com">
                        <img alt="Portfolio of Simon Pineda" src={simonPine}/>
                    </a>
                    <a className="MiniIconInformation" target="blank" href="https://github.com/simonpine">
                        <img alt="Github of Simon Pineda" src={github}/>
                    </a>
                    <a className="MiniIconInformation" target="blank" href="https://www.instagram.com/simonpineda0521/">
                        <img alt="Instagram of Simon Pineda" src={instragram}/>
                    </a> */}
                </div>
            </div>
            <nav className="navbar">
                <div className="AppTitleUni">
                    <h2 className='NavTitle'>Fact</h2>
                    <h2 className="NavTitle FinderBorder">Finder</h2>
                    <h3 className="MiniDescrip">Explore &  <br></br> Discover</h3>
                </div>
                <div className="AppTitleUni">
                    <a className="GitHubButton" target="blank" href="https://github.com/simonpine/FactFinder">
                        <img alt="Github icon button" src={git} />
                        Source code
                    </a>
                    <button className="ButtonIcon BurgerMenu" onClick={() => setIsOpen(!isOpen)} >
                        <img alt="Button to display side menu" src={burger} />
                    </button>
                </div>
            </nav>
        </>
    )
}
export default Navbar