import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function DashboardLayout() {
  const location = useLocation();
  const activeRoute = location.pathname.split('/').pop();

  return (
    <div>
      <Sidebar activeRoute={activeRoute} />
      <main className="p-10 ml-64 h-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
