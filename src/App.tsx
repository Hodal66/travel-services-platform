// import  { useState } from 'react';
// import HomePage from './pages/HomePage';
// import CarRentalsPage from './pages/CarRentalsPage';
// import RealEstatePage from './pages/RealEstatePage';
// import HotelsPage from './pages/HotelPage';
// import TransfersPage from './pages/TransfersPage';
// import ToursPage from './pages/ToursPage';
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';


// export type PageType = 'home' | 'cars' | 'properties' | 'hotels' | 'transfers' | 'tours';

// function App() {
//   const [currentPage, setCurrentPage] = useState<PageType>('home');

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage onNavigate={setCurrentPage} />;
//       case 'cars':
//         return <CarRentalsPage />;
//       case 'properties':
//         return <RealEstatePage />;
//       case 'hotels':
//         return <HotelsPage />;
//       case 'transfers':
//         return <TransfersPage />;
//       case 'tours':
//         return <ToursPage />;
//       default:
//         return <HomePage onNavigate={setCurrentPage} />;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header currentPage={currentPage} onNavigate={setCurrentPage} />
//       <main className="flex-grow">
//         {renderCurrentPage()}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import CarRentalsPage from './pages/car/CarRentalsPage';
import RealEstatePage from './pages/real_estate/RealEstatePage';
import TransfersPage from './pages/transfer/TransfersPage';
import ToursPage from './pages/tour/ToursPage';
import TransferDetailPage from './pages/transfer/TransferDetailPage';
import TourDetailPage from './pages/tour/TourDetailPage';
import Layout from './components/common/Layout';
import { PageType } from './types';
import HotelsPage from './pages/hotel/HotelPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <Routes>
          {/* Routes with Header and Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage onNavigate={function (page: PageType): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="cars" element={<CarRentalsPage />} />
            <Route path="properties" element={<RealEstatePage />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="transfers" element={<TransfersPage />} />
            <Route path="tours" element={<ToursPage />} />
          </Route>

          {/* Detail routes without Header and Footer */}
          {/* <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} /> */}
          <Route path="/transfers/:id" element={<TransferDetailPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<HomePage onNavigate={function (page: PageType): void {
            throw new Error('Function not implemented.');
          } } />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;