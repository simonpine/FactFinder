import { Link } from 'react-router-dom'
import arrow from '../img/arrow-small-right.png'
import errorImg from '../img/404.svg'
function Error404() {
    return (
        <div style={{flexDirection: 'column'}} className="ErrorContainer">
            <img className="ilustration" alt="No news satisfies the filters" src={errorImg} />
            <div>
                <Link to={{ pathname: "/" }} className='GitHubButton'>Back home <img className='MoveOnHover1' alt='Arrow to indicate the page change' src={arrow} /></Link>
            </div>
        </div>
    )
}
export default Error404