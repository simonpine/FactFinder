import errorImg from '../img/image-slash.png'
import mark from '../img/bookmark.png'
import mark2 from '../img/bookmark-(2).png'
import { useState, useEffect } from 'react';
import { fetchHTML } from '../functions';
function NewCard({ newDetails }: {
    newDetails: any;
}) {
    const [selected, setSelected] = useState(false);

    return (
        <div className='NewCardCont'>
            <div className="firstRowNew">
                <img alt={newDetails.description} src={newDetails.image ? newDetails.image : errorImg} />
                <div>
                    <div>
                        <h5>Polarization: {newDetails.sentiment}</h5>
                        <div />
                    </div>
                    <div>
                        <h5>Falsity:</h5>
                        <div />
                    </div>
                </div>
            </div>
            <h5 className='NewDateCard'>{newDetails.publish_date.slice(0, 10)}</h5>
            <h4 className='NewTitleCard'>{newDetails.title}</h4>
            <div className='ButtonContCard'>
                <button onClick={() => { console.log(newDetails.text) }} className='GitHubButton ColorChangeButton'>
                    Read more
                </button>
                <button className='MarkButton' onClick={() => setSelected(!selected)}>
                    <img src={selected ? mark2 : mark} />
                </button>
            </div>
        </div>
    )
}
export default NewCard