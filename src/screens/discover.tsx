import { CallNewsHead } from "../functions";
import { useState, useEffect } from "react";
import SearchImg from '../img/search.png'
import NewCard from "../components/newCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import LoadingNew from "../components/loadingCard";
import NewBox from "../components/newBox";
import handleViewport, { type InjectedViewportProps } from 'react-in-viewport';
import { Categories, Countries, Priority } from "../components/options";
import { useScrollLock } from 'usehooks-ts'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import emptyImg from '../img/No data-pana.svg'
import rotate from '../img/rotate-right.png'

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
        const { result, error } = await CallNewsHead(cateChange, contChange, qChange, prioChange, 1)
        if (result.status !== 'error') {
            await setPage(result.nextPage)
            await setNumberArticles(result.totalResults)
            await setNewsList(result.results);
        }
        if (error) {
            toast.error(error, {
                position: "top-left",
                theme: "dark"
            });
        }
        await setChargingData(false);

    }
    async function AddPage(): Promise<void> {
        // await console.log(numberArticles, newsList.length)
        await setLoading(true)
        const { result, error } = await CallNewsHead(category, contry, q, prioritydomain, page)
        await setPage(result.nextPage)
        if (result.status !== 'error') {
            await setNewsList([...newsList, ...result.results])
        }
        if (error) {
            toast.error(error, {
                position: "top-left",
                theme: "dark"
            });
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
            const { result, error } = await CallNewsHead('top', '', '', '', 1)
            if (result.status !== 'error') {
                await setPage(result.nextPage)
                const AllNews = await result.results
                await setNumberArticles(result.totalResults)
                await setNewsList(AllNews);
            }
            if (error) {
                toast.error(error, {
                    position: "top-left",
                    theme: "dark"
                });
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
                <ToastContainer />
                <form onSubmit={Submit} className="SearchCont">
                    <div className="PartOfFilters PartOfFiltersWrap">
                        <select value={contry} onChange={async (e) => {
                            await setContry(e.target.value)
                            await FetchData(e.target.value, category, prioritydomain, q)
                        }} >
                            <Countries />
                        </select>
                        <select value={category} onChange={async (e) => {
                            await setCategory(e.target.value)
                            await FetchData(contry, e.target.value, prioritydomain, q)
                        }} >
                            <Categories />
                        </select>
                        <select value={prioritydomain} onChange={async (e) => {
                            await setPrioritydomain(e.target.value)
                            await FetchData(contry, category, e.target.value, q)
                        }} >
                            <Priority />
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
                    {newsList.length > 0 || chargingData ?
                        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
                            <Masonry gutter={'15px'}>
                                {!chargingData ?
                                    newsList.map((notc: any) => {
                                        return <NewCard lock={lock} setReload={undefined} setTheNew={setShowNew} newDetails={notc} key={notc.article_id} />
                                    })
                                    :
                                    forLoad.map((a: number) => {
                                        return (
                                            <LoadingNew key={a} />
                                        )
                                    })
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                        :
                        <div className="ErrorContainer">
                            <img className="ilustration" alt="No news satisfies the filters" src={emptyImg} />
                            <div>
                                <p className="NoNewsText">No news satisfies the filters</p>
                                <button onClick={clearFilters} className='GitHubButton'>Clear the filters<img className='MoveOnHover' alt='On press reload the filtres to show the news' src={rotate} /></button>
                            </div>
                        </div>
                    }
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
