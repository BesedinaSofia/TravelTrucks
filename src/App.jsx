// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import CatalogPage from './pages/CatalogPage';
// import CamperPage from './pages/CamperPage';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/catalog" element={<CatalogPage />} />
//       <Route path="/catalog/:id" element={<CamperPage />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CamperPage from './pages/CamperPage';

function App() {
  return (
    <>
      <Header /> {/* Хедер буде на всіх сторінках */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperPage />} />
      </Routes>
    </>
  );
}

export default App;
