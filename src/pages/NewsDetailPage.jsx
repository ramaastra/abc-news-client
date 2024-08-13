import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formatDate from '../utils/formatDate';

function NewsDetailPage() {
  const { slug } = useParams();
  const [news, setNews] = useState({
    id: '',
    headline: '',
    content: '',
    pictureUrl: '',
    createdAt: '',
    updatedAt: '',
    author: {},
    category: {}
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data: response } = await axios.get(`/news/${slug}`);
        setNews({
          id: response.data.id,
          headline: response.data.headline,
          pictureUrl: response.data.pictureUrl,
          content: response.data.content,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          category: response.data.category,
          author: response.data.author
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="w-1/2">
      <h1 className="font-playfair text-4xl mb-4 font-bold">{news.headline}</h1>
      {news.pictureUrl && (
        <img
          src={news.pictureUrl}
          alt={news.headline}
          className="w-full aspect-video object-cover mb-4"
        ></img>
      )}
      <p className="mb-4 flex gap-2">
        <span className="font-semibold">
          {news.author.firstName} {news.author.lastName}
        </span>
        <span>|</span>
        <span>{formatDate(news.createdAt)}</span>
        <span>|</span>
        <span>{news.category.name}</span>
      </p>
      <p>{news.content}</p>
    </div>
  );
}

export default NewsDetailPage;
