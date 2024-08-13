import { useEffect, useState } from 'react';
import axios from 'axios';
import News from '../components/News';

function Homepage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data: response } = await axios.get('/news');
        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  return !news ? (
    <p>No news found.</p>
  ) : (
    <>
      {news.map((data) => (
        <News data={data} />
      ))}
      <a
        href="/news/publish"
        className="fixed bottom-10 right-16 transition-opacity hover:opacity-75 flex items-center gap-1 group"
      >
        <div className="bg-black w-14 h-14 flex justify-center items-center rounded-full transition-transform group-hover:-translate-x-2 group-hover:rotate-90">
          <svg
            className="w-6 h-6 text-white"
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
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </div>
        <p className="hidden group-hover:block leading-5">
          <span className="block">Publish</span>
          <span className="block">News</span>
        </p>
      </a>
    </>
  );
}

export default Homepage;
