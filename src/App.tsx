import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Certification from './pages/Certification';
import CreatePost from './pages/CreatePost';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-primary text-gray-100 font-poppins overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certifications" element={<Certification />} />
          <Route path="/blog/create" element={<CreatePost />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;