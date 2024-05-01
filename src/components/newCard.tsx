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
                <img alt={newDetails.description} src={newDetails.image_url ? newDetails.image_url : errorImg} />
                <div className='BarsCont'>
                    <div>
                        <h5 className='ClasificationText1'>Polarization: </h5>
                        <h5 className='ClasificationText' style={{color: (100 * Math.abs(newDetails.polarization)) > 70? '#ff2b2b': (100 * Math.abs(newDetails.polarization)) > 30? '#e872ff': '#24FF00'}}>{`${(100 * Math.abs(newDetails.polarization))}%`}</h5>
                        <div className='Progresbar'>
                            <div style={{ width: `${(100 * Math.abs(newDetails.polarization))}%`, backgroundColor: (100 * Math.abs(newDetails.polarization)) > 70? '#ff2b2b': (100 * Math.abs(newDetails.polarization)) > 30? '#e872ff': '#24FF00'}}></div>
                        </div>
                    </div>
                    <div>
                        <h5 className='ClasificationText'>Falsity: </h5>
                        <h5 className='ClasificationText' style={{color: (100 * Math.abs(newDetails.falsity)) > 70? '#ff2b2b': (100 * Math.abs(newDetails.falsity)) > 30? '#e872ff': '#24FF00'}}>{`${(100 * Math.abs(newDetails.falsity))}%`}</h5>
                        <div className='Progresbar'>
                            <div style={{ width: `${(100 * Math.abs(newDetails.falsity))}%`, backgroundColor: (100 * Math.abs(newDetails.falsity)) > 70? '#ff2b2b': (100 * Math.abs(newDetails.falsity)) > 30? '#e872ff': '#24FF00'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 className='NewDateCard'>{newDetails.pubDate.slice(0, 10)}</h5>
            <h4 className='NewTitleCard'>{newDetails.title}</h4>
            <div className='ButtonContCard'>
                <button onClick={() => { console.log(newDetails.text) }} className='GitHubButton ColorChangeButton'>
                    Read more
                </button>
                <button className='MarkButton' onClick={() => setSelected(!selected)}>
                    <img alt='Check box for save the new' src={selected ? mark2 : mark} />
                </button>
            </div>
        </div>
    )
}
export default NewCard