import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import { MainLayout } from './layouts/MainLayout';
import PackagePage from './pages/PackagePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/package" element={<PackagePage />} />
        </Route>
        <Route path="/package/:id" element={<h1>Package Details</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
