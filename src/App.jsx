import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import { MainLayout } from './layouts/MainLayout';
import PackagePage from './pages/PackagePage';
import PackageDetailPage from './pages/PackageDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagePage />} />
        </Route>
        <Route path="/packages/:id" element={<PackageDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
