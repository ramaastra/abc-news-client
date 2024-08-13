import { useEffect, useState } from 'react';
import axios from 'axios';
import News from '../components/News';

function Homepage() {
  const [news, setNews] = useState([]);
  const [latestNews, setLatestNews] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data: response } = await axios.get('/news');
        setNews(response.data);
        setLatestNews(response.data.find(({ pictureUrl }) => pictureUrl));
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
      <div className="grid grid-cols-2">
        <div>
          {news.map((data) => (
            <News key={data.id} data={data} />
          ))}
        </div>
        {latestNews.id && (
          <div>
            <img
              src={latestNews.pictureUrl}
              alt={latestNews.headline}
              className="aspect-video 1-full object-cover"
            />
            <a href={`/news/${latestNews.slug}`}>
              <h3 className="font-playfair font-semibold text-4xl mt-3">
                {latestNews.headline}
              </h3>
            </a>
            <p className="mt-3">{latestNews.content.slice(0, 200) + '...'}</p>
          </div>
        )}
      </div>
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

export default Homepage;
