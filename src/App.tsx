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
                {/* <img alt='FactFinder logo' src={LogoSimon} /> */}
              </div>
              <div className='PercentageItem MagicalBorder'>
                <img alt='FactFinder logo' src={Logo} />
              </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit odio faucibus nec justo, sodales habitasse euismod ridiculus convallis. At ultrices hendrerit eleifend mollis donec bibendum laoreet, integer felis urna sociis tortor accumsan proin, ante dignissim rhoncus fames feugiat dis. Primis tempor vestibulum auctor non class, nunc malesuada sem arcu semper, quam nullam viverra curae. Id parturient dictumst cras suscipit morbi, blandit torquent risus iaculis ad tempus, inceptos quisque molestie neque. Purus nam ut volutpat hac magna duis dui leo erat eros, congue in ultricies sociosqu porta etiam interdum vivamus velit. Penatibus tristique pellentesque mus vel placerat est, fusce platea nulla quis.
            </p>
          </div>
        </div>
        <div className='HorizontalContLand CommentsCont'>
          <div className='CartComent'>
            <div>
              <img alt='User icon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5XRVQ7xxHNWBa1Hj590AOOFQpP2FxYemRENy37Igew&s'></img>
              <h4>Simon Pineda</h4>
            </div>
            <p className='commentP'>dignissim rhoncus fames feugiat dis. Primis tempor vestibulum auctor non class, nunc malesuada sem arcu semper, quam nullam.</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
