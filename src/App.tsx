import './App.scss';
import Navbar from './components/navbar';
import Banner from './img/title.jpg'
import Logo from './img/logo.svg'
import Comment from './components/comment';
import LogoSimon from './img/LogoSImon.png'
function App() {
  return (
    <>
      <Navbar selected={1} />
      <div className='FullContainer'>
        <div className='HorizontalContLand'>
          <img className='MainPhoto' alt='Represents the news that this page is going to judge' src={Banner} />
          <div className='SquarsPlusText'>
            <div className='squarsCont'>

              <h2 className='PercentageItem img1'>50%</h2>
              <h2 className='PercentageItem img2'>90%</h2>
              <div className='PercentageItem Fil'>
                <img alt='FactFinder logo' src={LogoSimon} />
              </div>
              <div className='PercentageItem MagicalBorder'>
                <img alt='FactFinder logo' src={Logo} />
              </div>
            </div>
            <p>FactFinder is a solution to the contemporary problem of polarization, sensationalism, and fake news. With artificial intelligence and natural language processing, this news source engine lets users identify easily how polarized are the news, and what is the possibility that each news is fake. The objective is not to create a new news source but to unify the ones that already exist around the world, and let people have their own criteria about what are they reading.
            </p>
          </div>
        </div>
        <div className='HorizontalContLand CommentsCont'>
          <Comment name={'SimonPine'} comment={'dignissim rhoncus fames feugiat dis. Primis tempor vestibulum auctor non class, nunc malesuada sem arcu semper, quam nullam'} picture={'https://lh3.googleusercontent.com/a/ACg8ocKkcJhQE10oTEvEbDo9fsLixAvQzLtMMboJhNwHIXvgk_sJV-3O=s96-c'}/>

        </div>
      </div>
    </>
  );
}

export default App;
