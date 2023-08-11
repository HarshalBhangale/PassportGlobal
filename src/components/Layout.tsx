import { Outlet } from "react-router-dom";
import { Header } from './Header';

export function Layout() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}
