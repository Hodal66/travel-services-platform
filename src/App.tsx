import  { useState } from 'react';
import HomePage from './pages/HomePage';
import CarRentalsPage from './pages/CarRentalsPage';
import RealEstatePage from './pages/RealEstatePage';
import HotelsPage from './pages/HotelPage';
import TransfersPage from './pages/TransfersPage';
import ToursPage from './pages/ToursPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';


export type PageType = 'home' | 'cars' | 'properties' | 'hotels' | 'transfers' | 'tours';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'cars':
        return <CarRentalsPage />;
      case 'properties':
        return <RealEstatePage />;
      case 'hotels':
        return <HotelsPage />;
      case 'transfers':
        return <TransfersPage />;
      case 'tours':
        return <ToursPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;