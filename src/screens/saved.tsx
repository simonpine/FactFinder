import Navbar from "../components/navbar";
import { doc, getDoc } from "firebase/firestore"
import { db, auth } from "../fireBaseCom";
import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingNew from "../components/loadingCard";
import NewCard from "../components/newCard";
import NewBox from "../components/newBox";
const forLoad: Array<number> = [1, 2, 3, 4, 5, 6]

function Saved() {
  
  const [newsList, setNewsList]: any = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState({ content: '' })
  const [user] = useAuthState(auth)
  const [reload, setReload] = useState(Math.random())
  useEffect(() => {
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
        <NewBox setTheNew={setShowNew} newDetails={showNew}>
        </NewBox>
      }
      <Navbar selected={3} />
      <main className="FullContainer">
        <div className="AllNewsCont">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
            <Masonry gutter={'15px'}>
              {!loading ?
                newsList.length > 0 ?
                  newsList.map((notc: any) => {
                    return notc.title !== '[Removed]' ? (
                      <NewCard setReload={setReload} setTheNew={setShowNew} newDetails={notc} key={notc.article_id} />
                      // <></>
                    ) :
                      (<></>)
                  })
                  :
                  <></>
                :
                forLoad.map((a: number) => {
                  return (
                    <LoadingNew key={a} />
                  )
                })
              }
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </main>
    </>
  );
}

export default Saved;
