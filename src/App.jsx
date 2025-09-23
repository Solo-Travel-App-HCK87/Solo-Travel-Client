import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import PackagePage from "./pages/PackagePage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PackageDetailPage from './pages/PackageDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
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
