import errorImg from '../img/image-slash.png'
import mark from '../img/bookmark.png'
import mark2 from '../img/bookmark-(2).png'
import { useState } from 'react';
import { auth, db } from '../fireBaseCom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

function NewCard({ newDetails, setTheNew, setReload }: {
    setTheNew: any;
    newDetails: any;
    setReload: any
}) {
    const [selected, setSelected] = useState(setReload !== undefined);
    const [user] = useAuthState(auth)

    return (
        <div className='NewCardCont'>
            <div className="firstRowNew">
                <img alt={`News representation from ${newDetails.source_id}`} src={newDetails.image_url ? newDetails.image_url : errorImg} />
                <div className='BarsCont'>
                    <div>
                        <h5 className='ClasificationText1'>Polarization: </h5>
                        <h5 className='ClasificationText' style={{ color: (100 * Math.abs(newDetails.polarization)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.polarization)) > 30 ? '#e872ff' : '#24FF00' }}>{`${Math.round(100 * (Math.abs((newDetails.polarization))))}%`}</h5>
                        <div className='Progresbar'>
                            <div style={{ width: `${(100 * Math.abs(newDetails.polarization))}%`, backgroundColor: (100 * Math.abs(newDetails.polarization)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.polarization)) > 30 ? '#e872ff' : '#24FF00' }}></div>
                        </div>
                    </div>
                    <div>
                        <h5 className='ClasificationText'>Falsity: </h5>
                        <h5 className='ClasificationText' style={{ color: (100 * Math.abs(newDetails.falsity)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.falsity)) > 30 ? '#e872ff' : '#24FF00' }}>{`${(100 * Math.abs(newDetails.falsity))}%`}</h5>
                        <div className='Progresbar'>
                            <div style={{ width: `${(100 * Math.abs(newDetails.falsity))}%`, backgroundColor: (100 * Math.abs(newDetails.falsity)) > 70 ? '#ff2b2b' : (100 * Math.abs(newDetails.falsity)) > 30 ? '#e872ff' : '#24FF00' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='DateAndSource'>
                <h5 className='NewDateCard2'>{newDetails.source_id.charAt(0).toUpperCase() + newDetails.source_id.slice(1)}</h5>
                <h5 className='NewDateCard'>{newDetails.pubDate.slice(0, 10)}</h5>
            </div>
            <h4 className='NewTitleCard'>{newDetails.title}</h4>
            <div className='ButtonContCard'>
                <button onClick={() => { setTheNew(newDetails) }} className='GitHubButton ColorChangeButton'>
                    Read more
                </button>
                {user &&
                    <button className='MarkButton' onClick={async () => {
                        const itemsColection = await doc(db, 'users', user.uid)
                        await getDoc(itemsColection).then((snap) => {
                            if (snap.exists()) {
                                const dart = snap.data().SavedNews
                                if (!dart.some((item: any) => item.article_id === newDetails.article_id)) {
                                    updateDoc(itemsColection, { SavedNews: [...dart, newDetails] })
                                }
                                else {
                                    for (let i = 0; i < dart.length; i++) {
                                        if (dart[i].article_id === newDetails.article_id) {
                                            dart.splice(i, 1);
                                        }
                                    }
                                    updateDoc(itemsColection, { SavedNews: [...dart] })
                                }
                            }
                            else {
                                setDoc(itemsColection, { SavedNews: [newDetails] })
                            }
                        })
                        await setSelected(!selected)
                        setReload !== undefined && setReload(Math.random)

                    }}>
                        <img alt='Check box for save the new' src={selected ? mark2 : mark} />
                    </button>
                }
            </div>
        </div>
    )
}
export default NewCard