import LinkImg from '../img/link-alt.png'
import { useKeyPressEvent } from "react-use";
import closeButton from '../img/cross-small.png'

function NewBox({ newDetails, setTheNew }: {
    newDetails: any;
    setTheNew: any
}) {
    useKeyPressEvent("Escape", () => {
        document.body.style.overflow = 'auto'
        setTheNew({ content: '' })
    });
    return (
        <>
            <article className="FullContNew">
                <aside className="Part1FullNew">
                    {newDetails.image_url &&
                        <img className="ImgFullNew" alt={`News representation from ${newDetails.source_id}`} src={newDetails.image_url} />
                    }                    <a target="blank" href={newDetails.link} className="LinkButton"> <img alt='A lenk to the source' src={LinkImg} />Source link</a>
                    <h2 className="TitleInFullNew">{newDetails.title}</h2>
                    <h3 className='MiniInfoFullBox'>Date: {newDetails.pubDate.slice(0, 10)}</h3>
                    <h3 className='MiniInfoFullBox'>By: {newDetails.creator ? newDetails.creator : 'Unknown'}</h3>
                    <div className='BarsCont'>
                        <figure>
                            <h5 className='MiniInfoFullBox2'>Polarization percentage: </h5>
                            <h4 className='ClasificationText' style={{ color: (100 * Math.abs(newDetails.polarization)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.polarization)) > 30 ? '#e872ff' : '#24FF00' }}>{`${Math.round(100 * (Math.abs((newDetails.polarization)))) !== 0 ? Math.round(100 * (Math.abs((newDetails.polarization)))) : '<1'}%`}</h4>
                            <div className='Progresbar'>
                                <div style={{ width: `${(100 * Math.abs(newDetails.polarization))}%`, backgroundColor: (100 * Math.abs(newDetails.polarization)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.polarization)) > 30 ? '#e872ff' : '#24FF00' }}></div>
                            </div>
                        </figure>
                        <figure>
                            <h5 className='MiniInfoFullBox2'>Falsity percentage: </h5>
                            <h4 className='ClasificationText' style={{ color: (100 * Math.abs(newDetails.falsity)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.falsity)) > 30 ? '#e872ff' : '#24FF00' }}>{`${Math.round(100 * (Math.abs((newDetails.falsity)))) !== 0 ? Math.round(100 * (Math.abs((newDetails.falsity)))) : '<1'}%`}</h4>
                            <div className='Progresbar'>
                                <div style={{ width: `${(100 * Math.abs(newDetails.falsity))}%`, backgroundColor: (100 * Math.abs(newDetails.falsity)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.falsity)) > 30 ? '#e872ff' : '#24FF00' }}></div>
                            </div>
                        </figure>
                    </div>
                </aside>
                <p>{newDetails.content ? newDetails.content : newDetails.description}</p>
            </article>
            <div onClick={() => {
                document.body.style.overflow = 'auto'
                setTheNew({ content: '' })
            }} className="ContWithTheQuit">
                <button className='ButtonCloseBox'>
                    <img alt='Close button' src={closeButton} />
                </button>
            </div>
        </>
    )
}
export default NewBox