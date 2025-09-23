import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

export function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
