import Navbar from "../components/navbar";
import { CallNewsHead } from "../functions";
import { useState, useEffect } from "react";
import SearchImg from '../img/search.png'
import NewCard from "../components/newCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import useNearScr

function Discover() {
    const [page, setPage] = useState(1)
    const [numberArticles, setNumberArticles] = useState(0)
    const [newsList, setNewsList]: any = useState([])
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    // const [sort, setSort] = useState('')
    const [q, setQ] = useState('')
    const [contry, setContry] = useState('')
    async function Submit(evt: any) {
        await evt.preventDefault();
        await FetchData()
    }
    async function FetchData(): Promise<void> {
        await setNewsList([]);
        const result = await CallNewsHead(category, contry, q, 1)
        await console.log(result);
        await setNumberArticles(result.available)
        await setPage(1)
        await setNewsList(result.news);
    }
    async function AddPage(): Promise<void> {
        await console.log(numberArticles, newsList.length)
        await setLoading(true)
        const result = await CallNewsHead(category, contry, q, page + 1)
        await setPage(page + 1)
        if (result.status !== 'error') {
            await setNewsList([...newsList, ...result.news])
        }
        await setLoading(false)
    }
    useEffect(() => {
        async function FetchData(): Promise<void> {
            // await setLoading(true)
            await setNewsList([])
            const result = await CallNewsHead('general', '', '', 1)
            if (result.status !== 'error') {
                const AllNews = await result.news
                await setNumberArticles(result.available)
                await setNewsList(AllNews);
            }
        }
        FetchData()
    }, [])
    return (
        <>
            <Navbar selected={2} />
            <div className="FullContainer">
                <form onSubmit={Submit} className="SearchCont">
                    <div className="PartOfFilters">
                        <select onChange={e => setContry(e.target.value)} >
                            <option value="" defaultValue="true">All countries</option>
                            {/* <option value='ae' >ae</option> */}
                            {/* <option value='ar' >ar</option> */}
                            {/* <option value='at' >at</option> */}
                            <option value='au' >au</option>
                            {/* <option value='be' >be</option> */}
                            {/* <option value='bg' >bg</option> */}
                            {/* <option value='br' >br</option> */}
                            <option value='ca' >ca</option>
                            {/* <option value='ch' >ch</option>
                            <option value='cn' >cn</option>
                            <option value='co' >co</option>
                            <option value='cu' >cu</option>
                            <option value='cz' >cz</option>
                            <option value='de' >de</option>
                            <option value='eg' >eg</option>
                            <option value='fr' >fr</option> */}
                            <option value='gb' >gb</option>
                            {/* <option value='gr' >gr</option>
                            <option value='hk' >hk</option>
                            <option value='hu' >hu</option>
                            <option value='id' >id</option> */}
                            <option value='ie' >ie</option>
                            {/* <option value='il' >il</option> */}
                            <option value='in' >in</option>
                            {/* <option value='it' >it</option>
                            <option value='jp' >jp</option> */}
                            <option value='kr' >kr</option>
                            {/* <option value='lt' >lt</option>
                            <option value='lv' >lv</option
                            <option value='ma' >ma</option>
                            <option value='mx' >mx</option> */}
                            <option value='my' >my</option>
                            <option value='ng' >ng</option>
                            {/* <option value='nl' >nl</option> */}
                            {/* <option value='no' >no</option>
                            <option value='nz' >nz</option> */}
                            <option value='ph' >ph</option>
                            {/* <option value='pl' >pl</option> */}
                            {/* <option value='pt' >pt</option>
                            <option value='ro' >ro</option>
                            <option value='rs' >rs</option>
                            <option value='ru' >ru</option> */}
                            <option value='sa' >sa</option>
                            {/* <option value='se' >se</option> */}
                            <option value='sg' >sg</option>
                            {/* <option value='si' >si</option> */}
                            {/* <option value='sk' >sk</option>
                            <option value='th' >th</option>
                            <option value='tr' >tr</option>
                            <option value='tw' >tw</option>
                            <option value='ua' >ua</option> */}
                            <option value='us' >us</option>
                            {/* <option value='ve' >ve</option> */}
                            <option value='za' >za</option>
                        </select>
                        <select onChange={e => setCategory(e.target.value)} >
                            <option value='general'>General</option>
                            {/* <option value='general'>Category</option> */}
                            <option value='world'>World</option>
                            <option value='nation'>Nation</option>
                            <option value='business'>Business</option>
                            <option value='entertainment'>Entertainment</option>
                            <option value='sports'>Sports</option>
                            <option value='health'>Health</option>
                            <option value='science'>Science</option>
                            <option value='technology'>Technology</option>
                        </select>
                        {/* <select onChange={e => setSort(e.target.value)} >
                            <option value=''>Sort by</option>
                            <option value='popularity'>Popularity</option>
                            <option value='publishedAt'>Published At</option>
                            <option value='relevancy'>Relevancy</option>
                        </select> */}
                    </div>
                    <div className="PartOfFilters">
                        <input className="SearchByQ" type='text' placeholder='Search by Keywords...' onChange={e => setQ(e.target.value)} />
                        <button className="SearchButton" type="submit">
                            <img alt="Search button" src={SearchImg} />
                        </button>
                    </div>
                </form>
                {/* <div className="NewsContainer">
                    {newsList.map((notc: any) => {
                        return (
                            <NewCard newDetails={notc} key={notc.title} />
                        )
                    })}
                </div> */}
                <div className="AllNewsCont">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
                        <Masonry gutter={'15px'}>
                            {newsList.map((notc: any) => {
                                return notc.title !== '[Removed]' ? (
                                    <NewCard newDetails={notc} key={'key' + Date.now().toString(36) + Math.random().toString(36)} />
                                ) :
                                    (<></>)
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                    {newsList.length < numberArticles &&
                        <div id='Visor'>
                            <button disabled={loading} onClick={AddPage} className="GitHubButton">Show more
                                {loading &&
                                    <span className="mini-loading"></span>
                                }

                            </button>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default Discover;
