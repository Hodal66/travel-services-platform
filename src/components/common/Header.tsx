// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import type { PageType } from '../../types';
// import { services } from '../../data/sampleData';

// interface HeaderProps {
//   currentPage: PageType;
//   onNavigate: (page: PageType) => void;
// }

// const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleNavigation = (page: PageType) => {
//     onNavigate(page);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div 
//               className="flex-shrink-0 cursor-pointer" 
//               onClick={() => handleNavigation('home')}
//             >
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 TravelHub
//               </h1>
//             </div>
//           </div>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <button
//                 onClick={() => handleNavigation('home')}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                   currentPage === 'home' 
//                     ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
//                     : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Home
//               </button>
//               {services.map((service) => (
//                 <button
//                   key={service.id}
//                   onClick={() => handleNavigation(service.id as PageType)}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//                     currentPage === service.id 
//                       ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
//                       : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   {service.title}
//                 </button>
//               ))}
//             </div>
//           </nav>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-100"
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
//               <button
//                 onClick={() => handleNavigation('home')}
//                 className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
//                   currentPage === 'home' 
//                     ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
//                     : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Home
//               </button>
//               {services.map((service) => (
//                 <button
//                   key={service.id}
//                   onClick={() => handleNavigation(service.id as PageType)}
//                   className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
//                     currentPage === service.id 
//                       ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
//                       : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   {service.title}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { services } from '../../data/sampleData';

interface HeaderProps {
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Get current page from pathname
  const getCurrentPage = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'home';
    return path;
  };

  const currentPage = getCurrentPage();

  const isActivePage = (page: string) => {
    return currentPage === page;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelHub
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePage('home') 
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.id}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePage(service.id) 
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActivePage('home') 
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePage(service.id) 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;