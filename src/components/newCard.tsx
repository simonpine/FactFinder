import errorImg from '../img/image-slash.png'
import mark from '../img/bookmark.png'
import mark2 from '../img/bookmark-(2).png'
import { useState } from 'react';
function NewCard({ newDetails }: {
    newDetails: any;
}) {
    const [selected, setSelected] = useState(false);
    return (
        <div className='NewCardCont'>
            <div className="firstRowNew">
                <img alt={newDetails.description} src={newDetails.urlToImage ? newDetails.urlToImage: errorImg} />
                <div>
                    <div>
                        <h5>Polarization:</h5>
                        <div/>
                    </div>
                    <div>
                        <h5>Falsity:</h5>
                        <div/>
                    </div>
                </div>
            </div>
            <h5 className='NewDateCard'>{newDetails.publishedAt.slice(0, 10)}</h5>
            <h4 className='NewTitleCard'>{newDetails.title}</h4>
            <div className='ButtonContCard'>
                <button onClick={()=>{console.log(newDetails.content)}} className='GitHubButton ColorChangeButton'>
                    Read more
                </button>
                <button className='MarkButton' onClick={()=> setSelected(!selected)}>
                    <img src={selected? mark2: mark}/>
                </button>
            </div>
        </div>
    )
}
export default NewCard