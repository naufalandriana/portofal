import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-md border-b border-border z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="logo text-xl font-bold text-gray-100 flex items-center gap-2">
          Portofal
        </Link>
        
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link 
              to="/" 
              className={`${
                isActive('/') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2`}
            >
              <i className="ph ph-house"></i> Home
            </Link>
          </li>
          <li>
            <Link 
              to="/resume" 
              className={`${
                isActive('/resume') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2`}
            >
              <i className="ph ph-file-text"></i> Resume
            </Link>
          </li>
          <li>
            <Link 
              to="/certifications" 
              className={`${
                isActive('/certifications') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2`}
            >
              <i className="ph ph-certificate"></i> Certifications
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`${
                isActive('/projects') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2`}
            >
              <i className="ph ph-code"></i> Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`${
                isActive('/contact') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2`}
            >
              <i className="ph ph-envelope"></i> Contact
            </Link>
          </li>
        </ul>
        
        <button 
          className="md:hidden text-gray-100 text-xl" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={`ph ${isMobileMenuOpen ? 'ph-x' : 'ph-list'}`}></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md border-b border-border absolute top-full left-0 w-full">
          <div className="py-4 px-4 space-y-4">
            <Link 
              to="/" 
              className={`block ${
                isActive('/') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2 py-2 border-b border-border`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ph ph-house"></i> Home
            </Link>
            <Link 
              to="/resume" 
              className={`block ${
                isActive('/resume') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2 py-2 border-b border-border`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ph ph-file-text"></i> Resume
            </Link>
            <Link 
              to="/certifications" 
              className={`block ${
                isActive('/certifications') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2 py-2 border-b border-border`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ph ph-certificate"></i> Certifications
            </Link>
            <Link 
              to="/projects" 
              className={`block ${
                isActive('/projects') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2 py-2 border-b border-border`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ph ph-code"></i> Projects
            </Link>
            <Link 
              to="/contact" 
              className={`block ${
                isActive('/contact') 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-gray-100'
              } transition-colors duration-300 flex items-center gap-2 py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ph ph-envelope"></i> Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;