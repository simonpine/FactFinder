import Navbar from "../components/navbar";
import { CallNewsHead } from "../functions";
import { useState, useEffect } from "react";
import SearchImg from '../img/search.png'
import NewCard from "../components/newCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import LoadingNew from "../components/loadingCard";
import error from  '../img/times-hexagon.png';
const forLoad: Array<number> = [1, 2, 3, 4, 5, 6]
function Discover() {
    const [page, setPage] = useState(1)
    const [numberArticles, setNumberArticles] = useState(0)
    const [newsList, setNewsList]: any = useState([])
    const [loading, setLoading] = useState(false)
    const [chargingData, setChargingData] = useState(false)
    const [category, setCategory] = useState('')
    const [prioritydomain, setPrioritydomain] = useState('')
    const [q, setQ] = useState('')
    const [contry, setContry] = useState('')
    async function Submit(evt: any) {
        await evt.preventDefault();
        await FetchData()
    }
    async function FetchData(): Promise<void> {
        await setNewsList([]);
        await setChargingData(true);
        const result = await CallNewsHead(category, contry, q, prioritydomain, 1)
        if (result.status !== 'error') {
            await setPage(result.nextPage)
            await setNumberArticles(result.totalResults)
            await setNewsList(result.results);
        }
        await setChargingData(false);

    }
    async function AddPage(): Promise<void> {
        await console.log(numberArticles, newsList.length)
        await setLoading(true)
        const result = await CallNewsHead(category, contry, q, prioritydomain, page)
        await setPage(result.nextPage)
        if (result.status !== 'error') {
            await setNewsList([...newsList, ...result.results])
        }
        await setLoading(false)
    }
    async function clearFilters(): Promise<void>{
        await setCategory("top")
        await setQ("")
        await setContry("")
        await setPrioritydomain("")
        await setPage(1)
        await FetchData()
    }
    useEffect(() => {
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
            <Navbar selected={2} />
            <div className="FullContainer">
                <form onSubmit={Submit} className="SearchCont">
                    <div className="PartOfFilters">
                        <select value={contry} onChange={e => setContry(e.target.value)} >
                            <option value="" defaultValue="true">All countries</option>
                            <option value='af' >Afghanistan</option>
                            <option value='al' >Albania</option>
                            <option value='dz' >Algeria</option>
                            <option value='ad' >Andorra</option>
                            <option value='ao' >Angola</option>
                            <option value='ar' >Argentina</option>
                            <option value='am' >Armenia</option>
                            <option value='au' >Australia</option>
                            <option value='at' >Austria</option>
                            <option value='az' >Azerbaijan</option>
                            <option value='bs' >Bahamas</option>
                            <option value='bh' >Bahrain</option>
                            <option value='bd' >Bangladesh</option>
                            <option value='bb' >Barbados</option>
                            <option value='by' >Belarus</option>
                            <option value='be' >Belgium</option>
                            <option value='bz' >Belize</option>
                            <option value='bj' >Benin</option>
                            <option value='bm' >Bermuda</option>
                            <option value='bt' >Bhutan</option>
                            <option value='bo' >Bolivia</option>
                            <option value='ba' >BosniaAndHerzegovina</option>
                            <option value='bw' >Botswana</option>
                            <option value='br' >Brazil</option>
                            <option value='bn' >Brunei</option>
                            <option value='bg' >Bulgaria</option>
                            <option value='bf' >Burkinafasco</option>
                            <option value='bi' >Burundi</option>
                            <option value='kh' >Cambodia</option>
                            <option value='cm' >Cameroon</option>
                            <option value='ca' >Canada</option>
                            <option value='cv' >CapeVerde</option>
                            <option value='ky' >CaymanIslands</option>
                            <option value='cf' >CentralAfricanRepublic</option>
                            <option value='td' >Chad</option>
                            <option value='cl' >Chile</option>
                            <option value='cn' >China</option>
                            <option value='co' >Colombia</option>
                            <option value='km' >Comoros</option>
                            <option value='cg' >Congo</option>
                            <option value='cr' >CostaRica</option>
                            <option value='hr' >Croatia</option>
                            <option value='cu' >Cuba</option>
                            <option value='cy' >Cyprus</option>
                            <option value='cz' >Czechrepublic</option>
                            <option value='dk' >Denmark</option>
                            <option value='dj' >Djibouti</option>
                            <option value='dm' >Dominica</option>
                            <option value='do' >Dominicanrepublic</option>
                            <option value='cd' >DRCongo</option>
                            <option value='ec' >Ecuador</option>
                            <option value='eg' >Egypt</option>
                            <option value='sv' >ElSalvador</option>
                            <option value='gq' >EquatorialGuinea</option>
                            <option value='er' >Eritrea</option>
                            <option value='ee' >Estonia</option>
                            <option value='sz' >Eswatini</option>
                            <option value='et' >Ethiopia</option>
                            <option value='fj' >Fiji</option>
                            <option value='fi' >Finland</option>
                            <option value='fr' >France</option>
                            <option value='pf' >Frenchpolynesia</option>
                            <option value='ga' >Gabon</option>
                            <option value='gm' >Gambia</option>
                            <option value='ge' >Georgia</option>
                            <option value='de' >Germany</option>
                            <option value='gh' >Ghana</option>
                            <option value='gr' >Greece</option>
                            <option value='gd' >Grenada</option>
                            <option value='gt' >Guatemala</option>
                            <option value='gn' >Guinea</option>
                            <option value='gy' >Guyana</option>
                            <option value='ht' >Haiti</option>
                            <option value='hn' >Honduras</option>
                            <option value='hk' >Hongkong</option>
                            <option value='hu' >Hungary</option>
                            <option value='is' >Iceland</option>
                            <option value='in' >India</option>
                            <option value='id' >Indonesia</option>
                            <option value='ir' >Iran</option>
                            <option value='iq' >Iraq</option>
                            <option value='ie' >Ireland</option>
                            <option value='il' >Israel</option>
                            <option value='it' >Italy</option>
                            <option value='ci' >IvoryCoast</option>
                            <option value='jm' >Jamaica</option>
                            <option value='jp' >Japan</option>
                            <option value='je' >Jersey</option>
                            <option value='jo' >Jordan</option>
                            <option value='kz' >Kazakhstan</option>
                            <option value='ke' >Kenya</option>
                            <option value='ki' >Kiribati</option>
                            <option value='xk' >Kosovo</option>
                            <option value='kw' >Kuwait</option>
                            <option value='kg' >Kyrgyzstan</option>
                            <option value='la' >Laos</option>
                            <option value='lv' >Latvia</option>
                            <option value='lb' >Lebanon</option>
                            <option value='ls' >Lesotho</option>
                            <option value='lr' >Liberia</option>
                            <option value='ly' >Libya</option>
                            <option value='li' >Liechtenstein</option>
                            <option value='lt' >Lithuania</option>
                            <option value='lu' >Luxembourg</option>
                            <option value='mo' >Macau</option>
                            <option value='mk' >Macedonia</option>
                            <option value='mg' >Madagascar</option>
                            <option value='mw' >Malawi</option>
                            <option value='my' >Malaysia</option>
                            <option value='mv' >Maldives</option>
                            <option value='ml' >Mali</option>
                            <option value='mt' >Malta</option>
                            <option value='mh' >MarshallIslands</option>
                            <option value='mr' >Mauritania</option>
                            <option value='mu' >Mauritius</option>
                            <option value='mx' >Mexico</option>
                            <option value='fm' >Micronesia</option>
                            <option value='md' >Moldova</option>
                            <option value='mc' >Monaco</option>
                            <option value='mn' >Mongolia</option>
                            <option value='me' >Montenegro</option>
                            <option value='ma' >Morocco</option>
                            <option value='mz' >Mozambique</option>
                            <option value='mm' >Myanmar</option>
                            <option value='na' >Namibia</option>
                            <option value='nr' >Nauru</option>
                            <option value='np' >Nepal</option>
                            <option value='nl' >Netherland</option>
                            <option value='nz' >Newzealand</option>
                            <option value='ni' >Nicaragua</option>
                            <option value='ne' >Niger</option>
                            <option value='ng' >Nigeria</option>
                            <option value='kp' >Northkorea</option>
                            <option value='no' >Norway</option>
                            <option value='om' >Oman</option>
                            <option value='pk' >Pakistan</option>
                            <option value='pw' >Palau</option>
                            <option value='ps' >Palestine</option>
                            <option value='pa' >Panama</option>
                            <option value='pg' >PapuaNewGuinea</option>
                            <option value='py' >Paraguay</option>
                            <option value='pe' >Peru</option>
                            <option value='ph' >Philippines</option>
                            <option value='pl' >Poland</option>
                            <option value='pt' >Portugal</option>
                            <option value='pr' >Puertorico</option>
                            <option value='qa' >Qatar</option>
                            <option value='ro' >Romania</option>
                            <option value='ru' >Russia</option>
                            <option value='rw' >Rwanda</option>
                            <option value='ws' >Samoa</option>
                            <option value='sm' >SanMarino</option>
                            <option value='sa' >Saudiarabia</option>
                            <option value='sn' >Senegal</option>
                            <option value='rs' >Serbia</option>
                            <option value='sc' >Seychelles</option>
                            <option value='sl' >SierraLeone</option>
                            <option value='sg' >Singapore</option>
                            <option value='sk' >Slovakia</option>
                            <option value='si' >Slovenia</option>
                            <option value='sb' >SolomonIslands</option>
                            <option value='so' >Somalia</option>
                            <option value='za' >Southafrica</option>
                            <option value='kr' >Southkorea</option>
                            <option value='es' >Spain</option>
                            <option value='lk' >SriLanka</option>
                            <option value='sd' >Sudan</option>
                            <option value='sr' >Suriname</option>
                            <option value='se' >Sweden</option>
                            <option value='ch' >Switzerland</option>
                            <option value='sy' >Syria</option>
                            <option value='tw' >Taiwan</option>
                            <option value='tj' >Tajikistan</option>
                            <option value='tz' >Tanzania</option>
                            <option value='th' >Thailand</option>
                            <option value='tl' >Timor-Leste</option>
                            <option value='tg' >Togo</option>
                            <option value='to' >Tonga</option>
                            <option value='tt' >Trinidad</option>
                            <option value='tn' >Tunisia</option>
                            <option value='tr' >Turkey</option>
                            <option value='tm' >Turkmenistan</option>
                            <option value='tv' >Tuvalu</option>
                            <option value='ug' >Uganda</option>
                            <option value='ua' >Ukraine</option>
                            <option value='ae' >Unitedarabemirates</option>
                            <option value='gb' >Unitedkingdom</option>
                            <option value='us' >Unitedstatesofamerica</option>
                            <option value='uy' >Uruguay</option>
                            <option value='uz' >Uzbekistan</option>
                            <option value='vu' >Vanuatu</option>
                            <option value='va' >Vatican</option>
                            <option value='ve' >Venezuela</option>
                            <option value='vi' >Vietnam</option>
                            <option value='wo' >World</option>
                            <option value='ye' >Yemen</option>
                            <option value='zm' >Zambia</option>
                            <option value='zw' >Zimbabwe</option>
                        </select>
                        <select value={category} onChange={e => setCategory(e.target.value)} >
                            <option value='top'>All categories</option>
                            <option value='business'>Business</option>
                            <option value='crime'>Crime</option>
                            <option value='domestic'>Domestic</option>
                            <option value='education'>Education</option>
                            <option value='entertainment'>Entertainment</option>
                            <option value='environment'>Environment</option>
                            <option value='food'>Food</option>
                            <option value='health'>Health</option>
                            <option value='lifestyle'>Lifestyle</option>
                            <option value='other'>Other</option>
                            <option value='politics'>Politics</option>
                            <option value='science'>Science</option>
                            <option value='sports'>Sports</option>
                            <option value='technology'>Technology</option>
                            <option value='tourism'>Tourism</option>
                            <option value='world'>World</option>
                        </select>
                        <select value={prioritydomain} onChange={e => setPrioritydomain(e.target.value)} >
                            <option value=''>No priority</option>
                            <option value='top'>Top</option>
                            <option value='medium'>Medium</option>
                            <option value='low'>Low</option>
                        </select>
                    </div>
                    <div className="PartOfFilters">
                        <input value={q} className="SearchByQ" type='text' placeholder='Search by Keywords...' onChange={e => setQ(e.target.value)} />
                        <button className="SearchButton" type="submit">
                            <img alt="Search button" src={SearchImg} />
                        </button>
                    </div>
                </form>
                <div className="AllNewsCont">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
                        <Masonry gutter={'15px'}>
                            {!chargingData ?
                                newsList.length > 0 ?
                                    newsList.map((notc: any) => {
                                        return notc.title !== '[Removed]' ? (
                                            <NewCard newDetails={notc} key={notc.article_id} />
                                        ) :
                                            (<></>)
                                    })
                                    :
                                    <div onClick={clearFilters} className=" errorMsg">
                                        <img alt="This show that the news banner doesnt came" src={error}/>
                                        <h5>No news satisfies the filters.</h5>
                                    </div>

                                :
                                forLoad.map((a:number) => {
                                    return (
                                        <LoadingNew key={a} />
                                    )
                                })



                            }
                        </Masonry>
                    </ResponsiveMasonry>
                    {newsList.length < numberArticles &&
                        <div id='Visor'>
                            <button disabled={loading} onClick={AddPage} className="GitHubButton">Show more
                                {loading &&
                                    <span className="mini-loading"></span>
                                }

                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Discover;
