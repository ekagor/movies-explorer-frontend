import Promo from '../Landing/Promo/Promo';
import AboutProject from '../Landing/AboutProject/AboutProject';
import Techs from '../Landing/Techs/Techs';
import AboutMe from '../Landing/AboutMe/AboutMe';
import Portfolio from '../Landing/Portfolio/Portfolio';
import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;
