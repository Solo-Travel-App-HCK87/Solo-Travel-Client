import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router';
import HomePage from './pages/HomePage';
import { MainLayout } from './layouts/MainLayout';
import PackagePage from './pages/PackagePage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PackageDetailPage from './pages/PackageDetailPage';
import MyPackagesPage from './pages/MyPackagesPage';
import { ScrollRestoration } from 'react-router';
import { useEffect } from 'react';

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagePage />} />
          </Route>
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/my-packages" element={<MyPackagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
