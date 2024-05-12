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
          <Comment name={'SimonPine'} comment={'dignissim rhoncus fames feugiat dis. Primis tempor vestibulum auctor non class, nunc malesuada sem arcu semper, quam nullam.'} picture={'https://lh3.googleusercontent.com/a/ACg8ocKkcJhQE10oTEvEbDo9fsLixAvQzLtMMboJhNwHIXvgk_sJV-3O=s96-c'} />
          <Comment name={'Will Smith'} comment={'magnis feugiat dignissim inceptos. Commodo a ultrices etiam accumsan in at praesent sapien consequat, molestie euismod.'} picture={'https://ygo-assets-entities-us.yougov.net/be75ec24-c681-11e8-b786-f96307b120ad.jpg'} />
          <Comment name={'Richard Nixon'} comment={'Etiam justo inceptos lacus fermentum cras proin urna dictumst mus leo risus nisi lobortis nascetur dis habitasse placerat aliquam, phasellus cursus sed parturient.'} picture={'https://hips.hearstapps.com/hmg-prod/images/los-angeles-california-nixon-press-conference-at-the-news-photo-1690823585.jpg?crop=0.665xw:1.00xh;0.168xw,0&resize=1200:*'} />
          <Comment name={'Petro'} comment={'Turpis velit imperdiet maecenas taciti nullam sapien scelerisque ut sollicitudin nec conubia per vel neque volut.'} picture={'data:image/jpeg;base64,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'} />

        </div>
      </div>
      <button onClick={async () => {
        const response = await fetch('https://fact-finder-api.onrender.com/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: 'Your title data',
            text: 'Your text data'
          })
        });
        const afertJson = await response.json()
        await console.log(afertJson.FakePosibility)
      }}>Test</button>
    </>
  );
}

export default App;
