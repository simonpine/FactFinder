import { CallNewsHead } from "../functions";
import { useState, useEffect } from "react";
import SearchImg from '../img/search.png'
import NewCard from "../components/newCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import LoadingNew from "../components/loadingCard";
import error from '../img/times-hexagon.png';
import NewBox from "../components/newBox";
import handleViewport, { type InjectedViewportProps } from 'react-in-viewport';
import { Categories, Countries, Priority } from "../components/options";
import { useScrollLock } from 'usehooks-ts'


const forLoad: Array<number> = [1, 2, 3, 4, 5, 6]

const Block = (props: InjectedViewportProps<HTMLDivElement>) => {
    const { forwardedRef } = props;
    return (
      <div ref={forwardedRef}>
      </div>
    );
  };

const ViewportBlock = handleViewport(Block);


function Discover() {
    const { lock, unlock } = useScrollLock({
        autoLock: false,
      })
    const [page, setPage] = useState(1)
    const [numberArticles, setNumberArticles] = useState(0)
    const [newsList, setNewsList]: any = useState([])
    const [loading, setLoading] = useState(false)
    const [chargingData, setChargingData] = useState(false)
    const [category, setCategory] = useState('')
    const [prioritydomain, setPrioritydomain] = useState('')
    const [q, setQ] = useState('')
    const [contry, setContry] = useState('')

    const [showNew, setShowNew] = useState({ content: '' })
    async function Submit(evt: any) {
        await evt.preventDefault();
        await FetchData(contry, category, prioritydomain, q)
    }
    async function FetchData(contChange: string, cateChange: string, prioChange: string, qChange: string): Promise<void> {
        await setNewsList([]);
        await setNumberArticles(0)
        await setChargingData(true);
        const result = await CallNewsHead(cateChange, contChange, qChange, prioChange, 1)
        if (result.status !== 'error') {
            await setPage(result.nextPage)
            await setNumberArticles(result.totalResults)
            await setNewsList(result.results);
        }
        await setChargingData(false);

    }
    async function AddPage(): Promise<void> {
        // await console.log(numberArticles, newsList.length)
        await setLoading(true)
        const result = await CallNewsHead(category, contry, q, prioritydomain, page)
        await setPage(result.nextPage)
        if (result.status !== 'error') {
            await setNewsList([...newsList, ...result.results])
        }
        await setLoading(false)
    }
    async function clearFilters(): Promise<void> {
        await setCategory("top")
        await setQ("")
        await setContry("")
        await setPrioritydomain("")
        await setPage(1)
        await FetchData('', 'top', '', '')
    }

    useEffect(() => {
        document.body.style.overflow = 'auto'
        async function FetchData(): Promise<void> {
            await setChargingData(true)
            await setNewsList([])
            const result = await CallNewsHead('top', '', '', '', 1)
            if (result.status !== 'error') {
                await setPage(result.nextPage)
                const AllNews = await result.results
                await setNumberArticles(result.totalResults)
                await setNewsList(AllNews);
            }
            await setChargingData(false)
        }
        FetchData()
    }, [])
    return (
        <>
            {showNew.content !== '' &&
                <NewBox unlock={unlock} setTheNew={setShowNew} newDetails={showNew}>
                </NewBox>
            }
            {/* <Navbar selected={2} /> */}
            <main className="FullContainer">
                <form onSubmit={Submit} className="SearchCont">
                    <div className="PartOfFilters PartOfFiltersWrap">
                        <select value={contry} onChange={async (e) => {
                            await setContry(e.target.value)
                            await FetchData(e.target.value, category, prioritydomain, q)
                        }} >
                          <Countries/>
                        </select>
                        <select value={category} onChange={async (e) => {
                            await setCategory(e.target.value)
                            await FetchData(contry, e.target.value, prioritydomain, q)
                        }} >
                            <Categories/>
                        </select>
                        <select value={prioritydomain} onChange={async (e) => {
                            await setPrioritydomain(e.target.value)
                            await FetchData(contry, category, e.target.value, q)
                        }} >
                            <Priority/>
                        </select>
                    </div>
                    <div className="PartOfFilters">
                        <input value={q} className="SearchByQ" type='text' placeholder='Search by Keywords...' onChange={e => setQ(e.target.value)} />
                        <button className="SearchButton" type="submit">
                            <img alt="Search button" src={SearchImg} />
                        </button>
                    </div>
                </form>
                <section className="AllNewsCont">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
                        <Masonry gutter={'15px'}>
                            {!chargingData ?
                                newsList.length > 0 ?
                                    newsList.map((notc: any) => {
                                        return notc.title !== '[Removed]' && notc.content ? (
                                            <NewCard lock={lock} setReload={undefined} setTheNew={setShowNew} newDetails={notc} key={notc.article_id} />
                                        ) :
                                            (<></>)
                                    })
                                    :
                                    <div onClick={clearFilters} className=" errorMsg">
                                        <img alt="This show that the news banner doesnt came" src={error} />
                                        <h5>No news satisfies the filters.</h5>
                                    </div>

                                :
                                forLoad.map((a: number) => {
                                    return (
                                        <LoadingNew key={a} />
                                    )
                                })



                            }
                        </Masonry>
                    </ResponsiveMasonry>
                    {newsList.length < numberArticles &&
                        <div>
                            <ViewportBlock onEnterViewport={AddPage} />
                            <button disabled={loading} onClick={AddPage} className="GitHubButton">Show more
                                {loading &&
                                    <span className="mini-loading"></span>
                                }

                            </button>
                        </div >

                    }
                </section>
            </main>
        </>
    );
}

export default Discover;
