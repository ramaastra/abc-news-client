import { useEffect, useState } from 'react';
import axios from 'axios';
import getCurrentUser from '../../utils/getCurrentUser';
import { getAuthToken } from '../../utils/tokenHandler';

function NewsListPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const user = await getCurrentUser();
        const { data: response } = await axios.get(
          `/news?author=${user.username}`
        );
        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  const deleteNews = async (newsId) => {
    await axios.delete(`/news/${newsId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    setNews(news.filter((data) => data.id !== newsId));
  };

  return (
    <div>
      <h2 className="mb-5 text-2xl font-semibold tracking-tight">
        Your Publication
      </h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="font-semibold text-lg">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Headline
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-base">
            {news ? (
              news.map((data, index) => (
                <tr key={data.id} className="bg-white border-b">
                  <td>{index + 1}</td>
                  <td scope="row" className="px-6 py-4 font-medium">
                    {data.headline}
                  </td>
                  <td className="px-6 py-4">{data.category.name}</td>
                  <td className="px-6 py-4">
                    {data.isApproved ? 'Published' : 'On Review'}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <a
                      href={`/dashboard/news/${data.slug}/edit`}
                      className="font-medium border-[1px] border-black rounded-full text-black p-2 flex items-center justify-center transition-colors hover:bg-black hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <button
                      className="font-medium border-[1px] border-black rounded-full text-black p-2 flex items-center justify-center transition-colors hover:bg-black hover:text-white"
                      onClick={() => deleteNews(data.id)}
                    >
                      <svg
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
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>No news found.</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsListPage;
