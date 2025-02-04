import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import News from '../components/News';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const categorySlug = searchParams.get('category');
        const { data: response } = await axios.get(
          `/news?category=${categorySlug}`
        );
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
        <News key={data.id} data={data} />
      ))}
      <a
        href="/dashboard/publish"
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

export default NewsPage;
