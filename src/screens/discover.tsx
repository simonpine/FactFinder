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
import { useDebounce } from "@uidotdev/usehooks";


const forLoad: Array<number> = [1, 2, 3, 4, 5, 6]
const ind = [
    'category',
    'prioritydomain',
    'q',
    'contry'
]
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
    const debouncedSearchTerm = useDebounce(q, 400);

    async function Submit(evt: any) {
        await evt.preventDefault();
    }

    useEffect(() => {
        const arr = [category, prioritydomain, debouncedSearchTerm, contry].map((item, index: number) => {
            if (item === '') return ''
            return `${ind[index]}=${item}`
        }).filter((item) => item !== '')
        window.history.replaceState({}, "", arr.length > 0 ? `${arr.some((item) => item.length > 0) ? '?' : ''}${arr.join('&')}` : window.location.pathname);
    }, [category, prioritydomain, debouncedSearchTerm, contry])
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const Q: string = urlParams.get("q") || '';
        const CATEGORY: string = urlParams.get("category") || '';
        const COUNTRY: string = urlParams.get("contry") || '';
        const PRIORITYDOMAIN: string = urlParams.get("prioritydomain") || '';

        async function FetchData(): Promise<void> {
            await setChargingData(true)
            await setNewsList([])
            const { result, error } = await CallNewsHead(CATEGORY, COUNTRY, Q, PRIORITYDOMAIN, 1)
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
    }, [category, prioritydomain, debouncedSearchTerm, contry])


    async function AddPage(): Promise<void> {
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
    }


    return (
        <>
            {showNew.content !== '' &&
                <NewBox unlock={unlock} setTheNew={setShowNew} newDetails={showNew}>
                </NewBox>
            }
            <main className="FullContainer">
                <ToastContainer />
                <form onSubmit={Submit} className="SearchCont">
                    <div className="PartOfFilters PartOfFiltersWrap">
                        <select id="CountrySelector" value={contry} onChange={async (e) => {
                            await setContry(e.target.value)
                        }} >
                            <Countries />
                        </select>
                        <select id="CategorySelector" value={category} onChange={async (e) => {
                            await setCategory(e.target.value)
                        }} >
                            <Categories />
                        </select>
                        <select id="PrioritySelector" value={prioritydomain} onChange={async (e) => {
                            await setPrioritydomain(e.target.value)
                        }} >
                            <Priority />
                        </select>
                    </div>
                    <div className="PartOfFilters">
                        <input id="QSelector" value={q} className="SearchByQ" type='text' placeholder='Search by Keywords...' onChange={e => setQ(e.target.value)} />
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
