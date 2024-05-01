import errorImg from '../img/image-slash.png'
import mark from '../img/bookmark.png'
import mark2 from '../img/bookmark-(2).png'
import { useState, useEffect } from 'react';
import { fetchHTML } from '../functions';
function NewCard({ newDetails }: {
    newDetails: any;
}) {
    const [fullContent, setFullContent] = useState('')
    const [selected, setSelected] = useState(false);
    // useEffect(() => {

    // }, [])
    async function FetchData(): Promise<void> {
        await fetchHTML(newDetails.url).then(res => console.log(res))
        // await setFullContent(newDetails.url)
    }
    return (
        <div className='NewCardCont'>
            <div className="firstRowNew">
                <img alt={newDetails.description} src={newDetails.image ? newDetails.image : errorImg} />
                <div>
                    <div>
                        <h5>Polarization:</h5>
                        <div />
                    </div>
                    <div>
                        <h5>Falsity:</h5>
                        <div />
                    </div>
                </div>
            </div>
            <h5 className='NewDateCard'>{newDetails.publishedAt.slice(0, 10)}</h5>
            <h4 className='NewTitleCard'>{newDetails.title}</h4>
            <div className='ButtonContCard'>
                <button onClick={() => { FetchData() }} className='GitHubButton ColorChangeButton'>
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