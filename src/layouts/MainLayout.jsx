import { Navigate, Outlet, Route, Routes } from 'react-router';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import PackagePage from '../pages/PackagePage';
import PackageDetailPage from '../pages/PackageDetailPage';
import MyPackagesPage from '../pages/MyPackagesPage';
import ChatRoomPage from '../pages/ChatRoomPage';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export function MainRoute() {
  const access_token = localStorage.access_token;
  if (!access_token) {
    return <Navigate to={'/login'} />;
  }
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/packages" element={<PackagePage />} />
      </Route>
      <Route path="/packages/:id" element={<PackageDetailPage />} />
      <Route path="/my-packages" element={<MyPackagesPage />} />
      <Route path="/chat/room/:packageId" element={<ChatRoomPage />} />
    </Routes>
  );
}
