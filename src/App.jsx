import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router';
import HomePage from './pages/HomePage';
import { MainLayout } from './layouts/MainLayout';
import PackagePage from './pages/PackagePage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PackageDetailPage from './pages/PackageDetailPage';
import MyPackagesPage from './pages/MyPackagesPage';
import ChatRoomPage from './pages/ChatRoomPage';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider } from './contexts/auth';

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
    <AuthProvider>
      <Provider store={store}>
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
              <Route path="/chat/room/:packageId" element={<ChatRoomPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
