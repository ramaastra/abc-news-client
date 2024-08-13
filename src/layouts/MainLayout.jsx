import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function MainLayout() {
  return (
    <>
      <Header />
      <main className="px-16">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
