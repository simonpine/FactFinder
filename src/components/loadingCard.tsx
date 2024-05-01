function getRandomIntInclusive(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

function LoadingNew() {
    return (
        <div className='NewCardCont bgLoad'>
        <div className="firstRowNew">
            <div className="ImgLoading" style={{height: `${getRandomIntInclusive(100, 180)}px`, width: `${getRandomIntInclusive(250, 600)}px`}} />
            <div className='BarsCont'>
                <div>
                    <h5 className='ClasificationText1 TextLoad'>Polarization: </h5>
                    <h5 className='ClasificationText TextLoad' ></h5>
                    <div className='Progresbar TextLoad'>
                    </div>
                </div>
                <div>
                    <h5 className='ClasificationText TextLoad'>Falsity: </h5>
                    <h5 className='ClasificationText TextLoad' ></h5>
                    <div className='Progresbar TextLoad'>
                    </div>
                </div>
            </div>
        </div>
        <h5 className='NewDateCard TextLoad TextLoadDate'>234345456</h5>
        <h5 className='NewDateCard TextLoad'>234345456</h5>
        <h4 className='NewTitleCard TextLoad'>asd</h4>
        
        <div className='ButtonContCard '>
            <button className='GitHubButton ColorChangeButton TextLoad'>
                Read more
            </button>
        </div>
    </div>
    )
}
export default LoadingNew