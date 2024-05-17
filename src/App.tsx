import './App.scss';
import Navbar from './components/navbar';
import Banner from './img/title.jpg'
import Logo from './img/logo.svg'
import Comment from './components/comment';
import LogoSimon from './img/LogoSImon.png'
import { Link } from 'react-router-dom';
import arrow from './img/arrow-small-right.png'

function App() {
  return (
    <>
      <Navbar selected={1} />
      <main className='FullContainer'>
        <div className='HorizontalContLand'>
          <img className='MainPhoto' alt='Represents the news that this page is going to judge' src={Banner} />
          <div className='SquarsPlusText'>
            <aside className='squarsCont'>

              <h5 className='PercentageItem img1 srcore2'><span>97%</span></h5>
              <h5 className='PercentageItem img2 srcores'><span>98%</span></h5>
              <div className='PercentageItem Fil'>
                {/* <img alt='FactFinder logo' src={LogoSimon} /> */}
              </div>
              <div className='PercentageItem MagicalBorder'>
                <img alt='FactFinder logo' src={Logo} />
              </div>
            </aside>
            <p>FactFinder is a solution to the contemporary problem of polarization, sensationalism, and fake news. With artificial intelligence and natural language processing, this news source engine lets users identify easily how polarized are the news, and what is the possibility that each news is fake. The objective is not to create a new news source but to unify the ones that already exist around the world, and let people have their own criteria about what are they reading.
            </p>
          </div>
        </div>
        <section className='HorizontalContLand CommentsCont'>
          <Comment name={'Santiago Romero'} comment={'The web application has a lot of very interesting and innovative features, such as the "Polarization" and "Falsity" parameters that come with each of the news.'} picture={'https://lh3.googleusercontent.com/a/AAcHTtf08uiV86Qb-Yea9cHkHw-A3y7KDOH1EIzvpJA8Q9Bk=s96-c'}/>
          <Comment name={'Cachumbin'} comment={'The web application isn´t easy to navigate, as the news section, which is the central part of the web application, isn´t in first-touch range inside of the web application.'} picture={'https://lh3.googleusercontent.com/a/AAcHTtdNcO0V0vYX3Ydg7iGOSmtbCbtJ6pEddclRO7FzTw=s96-c'}/>
          <Comment name={'Uparela'} comment={'As a person who studies politics, I find this application very interesting and useful.'} picture={'https://lh3.googleusercontent.com/a/ACg8ocLlcNPmrqiwWlvbfC44e72fjWpCb9mlYMylulEf0t7XI1wNsA=s96-c'}/>
        </section>
        <Link to={{ pathname: "/discover" }} className='GitHubButton'>Get informed now <img className='MoveOnHover' alt='Arrow to indicate the page change' src={arrow}/></Link>
        <br></br>
      </main>
    </>
  );
}

export default App;
