import { useEffect, useState } from 'react';
import axios from 'axios';
import formatDate from '../utils/formatDate';
import getCurrentUser from '../utils/getCurrentUser';

function Header() {
  const [user, setUser] = useState({});
  const [today, setToday] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };
    fetchCurrentUser();

    const fetchCategories = async () => {
      try {
        const { data: response } = await axios.get('/news/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();

    setToday({
      weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      date: formatDate(new Date())
    });
  }, []);

  return (
    <header className="flex flex-col px-16">
      <div className="grid grid-cols-3 border-b-2 py-6">
        <div className="flex justify-start items-center gap-5">
          <svg
            className="w-8 h-8 text-gray-800 transition-opacity hover:opacity-75 hover:cursor-pointer"
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
              strokeWidth="1"
              d="M5 7h14M5 12h14M5 17h10"
            />
          </svg>
          <span className="cursor-default opacity-20">|</span>
          <div className="flex items-center gap-2">
            <input type="text" className="px-3 py-1 border" />
            <svg
              className="w-6 h-6 text-gray-800 transition-opacity hover:opacity-75 hover:cursor-pointer"
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
                strokeWidth="1.5"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>

        <a href="/" className="flex justify-center items-center">
          <h1 className="font-playfair font-bold text-4xl">ABC News</h1>
        </a>

        <div className="flex justify-end h-full items-center gap-2">
          {!user?.id ? (
            <>
              <a
                href="/register"
                className="border-[1px] border-black px-3 py-2 transition-all hover:opacity-75"
              >
                Register
              </a>
              <a
                href="/login"
                className="border-[1px] border-black px-5 py-2 transition-all bg-black text-white hover:opacity-75"
              >
                Login
              </a>
            </>
          ) : (
            <div
              className="flex justify-center items-center gap-2 pe-4 transition-colors cursor-pointer
                hover:bg-gray-100 rounded-full"
            >
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
              <p className="text-lg">{user.firstName}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between py-6">
        <div>
          <p className="font-semibold">{today.weekday}</p>
          <p className="text-xs">{today.date}</p>
        </div>
        <div className="flex justify-center gap-10">
          {categories &&
            categories.map((category) => {
              return (
                <a
                  href={`news?category=${category.slug}`}
                  className="transition-opacity opacity-75 hover:opacity-100"
                >
                  {category.name}
                </a>
              );
            })}
        </div>
      </div>
    </header>
  );
}

export default Header;
