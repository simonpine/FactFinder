import { Link } from "react-router-dom";
import { useState } from "react";
import burger from '../img/menu-burger.png'
import git from '../img/github-logo.png'
import close from '../img/cross-small.png'

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