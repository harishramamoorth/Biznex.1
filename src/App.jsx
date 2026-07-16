import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import StickyCTA from './components/StickyCTA';
import CustomCursor from './components/common/CustomCursor';
import PageTransition from './components/common/PageTransition';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Process from './pages/Process';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import BookSession from './pages/BookSession';
import FreeScan from './pages/FreeScan';
import WorriedAbout from './pages/WorriedAbout';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ProgressBar />
        <CustomCursor />
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-session" element={<BookSession />} />
            <Route path="/free-scan" element={<FreeScan />} />
            <Route path="/services" element={<Navigate to="/worried-about" replace />} />
            <Route path="/worried-about" element={<WorriedAbout />} />
          </Routes>
        </PageTransition>
        <Footer />
        <StickyCTA />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;