import Hero from '../components/home/Hero';
import ClientLogos from '../components/home/ClientLogos';
import SocialProof from '../components/home/SocialProof';
import WorriedAbout from '../components/home/WorriedAbout';
import WhyBizNex from '../components/home/WhyBizNex';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/cta/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <SocialProof />
      <WorriedAbout />
      <WhyBizNex />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}