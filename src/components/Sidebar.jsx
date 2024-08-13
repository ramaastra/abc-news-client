import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from '../utils/getCurrentUser';
import { deleteAuthToken } from '../utils/tokenHandler';

function Sidebar({ activeRoute = 'dashboard' }) {
  const [user, setUser] = useState([]);
  const navigate = useNavigate('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };
    fetchCurrentUser();
  }, []);

  const logout = () => {
    deleteAuthToken();
    navigate('/');
  };

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen border-r-2 flex flex-col p-5 "
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full ">
        <a href="/">
          <h1 className="font-playfair font-bold text-center text-4xl">
            ABC News
          </h1>
        </a>
        <ul className="mt-10 space-y-2">
          <li>
            <a
              href="/dashboard"
              className={`flex items-center px-4 py-2 border-[1px] border-black transition-colors hover:bg-black hover:text-white ${
                activeRoute === 'dashboard' || activeRoute === 'edit'
                  ? 'bg-black text-white hover:opacity-75'
                  : 'bg-white text-black'
              }`}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/dashboard/publish"
              className={`flex items-center px-4 py-2 border-[1px] border-black transition-colors hover:bg-black hover:text-white ${
                activeRoute === 'publish'
                  ? 'bg-black text-white hover:opacity-75'
                  : 'bg-white text-black'
              }`}
            >
              Publish
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 pe-4 transition-colors cursor-pointer hover:bg-gray-100 rounded-full">
        <div className="flex justify-center items-center bg-black text-white font-bold rounded-full w-9 h-9">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-lg">
          {user.firstName} {user.lastName}
        </p>
      </div>
      <button
        className="mt-5 text-left text-lg px-4 py-2 border-[1px] border-black flex justify-between transition-colors hover:bg-red-500 hover:text-white"
        onClick={logout}
      >
        Logout
        <span>
          <svg
            className="w-6 h-6 inline"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>
        </span>
      </button>
    </aside>
  );
}

export default Sidebar;
