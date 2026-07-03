import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import StickyCTA from './components/StickyCTA';
import CustomCursor from './components/common/CustomCursor';
import PageTransition from './components/common/PageTransition';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Process from './pages/Process';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import BookSession from './pages/BookSession';
import FreeScan from './pages/FreeScan';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ProgressBar />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-session" element={<BookSession />} />
          <Route path="/free-scan" element={<FreeScan />} />
        </Routes>
      </PageTransition>
      <Footer />
      <StickyCTA />
    </BrowserRouter>
  );
}

export default App;