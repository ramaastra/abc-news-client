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
    news.map((data) => <News data={data} />)
  );
}

export default Homepage;
