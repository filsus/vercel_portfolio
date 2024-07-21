import HeaderSection from "./components/HeaderSection";
import Navbar from "./components/Navbar"
import FilmSection from "./components/FilmSection"
import Footer from "./components/Footer";
import App from "../app/nodegraph/App"
import VimeoVideo from './components/Showreel';
import AboutMe from './components/AboutMe'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] bg-no-repeat overflow-hidden relative">
      <Navbar />
      <div className="container mt-8 place-self-center px-12">
        <HeaderSection />
        </div>
      <div id="about" className="bg-[#040404] ">
        <div className=" mx-auto mt-8  px-12">          
          <AboutMe/>
        </div>
      </div>
      <div id="showreel" className="container mt-8 place-self-center px-12 py-4 min-h-screen">
        <VimeoVideo/>
      </div>
    <App />
       <div className="container mt-8 place-self-center px-12 py-4">
        <FilmSection />
        </div>
      <Footer/>
    </main>
  );
}