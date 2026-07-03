import Hero from '../components/home/Hero';
import ClientLogos from '../components/home/ClientLogos';
import SocialProof from '../components/home/SocialProof';
import WhyBizNex from '../components/home/WhyBizNex';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/cta/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <SocialProof />
      <WhyBizNex />
      <Services />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}