import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const access_token = localStorage.access_token;
  if (access_token) {
    return <Navigate />;
  }
  {
    return (
      <>
        <Outlet />
      </>
    );
  }
}
