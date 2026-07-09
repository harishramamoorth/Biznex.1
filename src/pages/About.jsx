import AboutStrip from '../components/about/AboutStrip';
// import Team from '../components/about/Team';
import Testimonials from '../components/Testimonials';

export default function About() {
  return (
    <main>
      <div id="story">
        <AboutStrip />
      </div>
      {/* <div id="team">
        <Team />
      </div> */}
      <div id="reviews">
        <Testimonials />
      </div>
    </main>
  );
}
