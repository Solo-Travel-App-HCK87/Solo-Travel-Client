import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import PackagePage from "./pages/PackagePage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
          <Route path="/package" element={<PackagePage />} />
        </Route>
        <Route path="/package/:id" element={<h1>Package Details</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
