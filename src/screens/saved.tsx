import { doc, getDoc } from "firebase/firestore"
import { db, auth } from "../fireBaseCom";
import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useScrollLock } from 'usehooks-ts'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingNew from "../components/loadingCard";
import NewCard from "../components/newCard";
import NewBox from "../components/newBox";
import representation from '../img/Empty-pana.svg'
import arrow from '../img/arrow-small-right.png'

const forLoad: Array<number> = [1, 2, 3, 4, 5, 6]

function Saved() {
  const { lock, unlock } = useScrollLock({
    autoLock: false,
  })
  const [newsList, setNewsList]: any = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState({ content: '' })
  const [user]: any = useAuthState(auth)
  const [reload, setReload] = useState(Math.random())
  useEffect(() => {
    document.body.style.overflow = 'auto'
    async function LoadData() {
      // await setLoading(true)
      const itemsColection = doc(db, 'users', user.uid)
      await getDoc(itemsColection).then((snap) => {
        if (snap.exists()) {
          const dart = snap.data().SavedNews
          setNewsList(dart)
        }
        else {
          setNewsList([])
        }
      })
      await setLoading(false)

    }
    user && LoadData()
  }, [reload, user])
  return (
    <>
      {showNew.content !== '' &&
        <NewBox unlock={unlock} setTheNew={setShowNew} newDetails={showNew}>
        </NewBox>
      }
      <main className="FullContainer">
        <div className="AllNewsCont">
          {newsList.length > 0 || loading ? <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
            <Masonry gutter={'15px'}>
              {!loading ?

                newsList.map((notc: any) => {
                  return <NewCard lock={lock} setReload={setReload} setTheNew={setShowNew} newDetails={notc} key={notc.article_id} />
                })
                :
                forLoad.map((a: number) => {
                  return (
                    <LoadingNew key={a} />
                  )
                })
              }
            </Masonry>
          </ResponsiveMasonry> :
            <div className="ErrorContainer">
              <img className="ilustration" alt="You haven't save news, this seccition is empty" src={representation} />

              <div>
                <p className="NoNewsText">You haven't saved news</p>
                <Link to={{ pathname: "/discover" }} className='GitHubButton'>Discover news <img className='MoveOnHover1' alt='Arrow to indicate the page change' src={arrow} /></Link>

              </div>

            </div>
          }
        </div>
      </main>
    </>
  );
}

export default Saved;
