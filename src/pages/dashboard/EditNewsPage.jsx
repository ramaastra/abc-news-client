import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../utils/tokenHandler';
import Spinner from '../../components/Spinner';

function EditNewsPage() {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState({
    id: '',
    headline: '',
    category: '',
    content: '',
    image: {
      data: '',
      preview: ''
    }
  });
  const [currentHeadline, setCurrentHeadline] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: response } = await axios.get('/news/categories');
        setCategories(response.data);
        setNewsData((prevNewsData) => ({
          ...prevNewsData,
          category: response.data[0].id
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();

    const fetchNews = async () => {
      try {
        const { data: response } = await axios.get(`/news/${slug}`);
        setCurrentHeadline(response.data.headline);
        setNewsData({
          id: response.data.id,
          headline: response.data.headline,
          category: response.data.category.id,
          content: response.data.content,
          image: {
            data: '',
            preview: response.data.pictureUrl
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  const handleChange = (event) => {
    const { name: inputName, value: inputValue } = event.target;
    console.log(inputName, inputValue);
    setNewsData((prevNewsData) => ({
      ...prevNewsData,
      [inputName]: inputValue
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setNewsData((prevNewsData) => ({
      ...prevNewsData,
      image: {
        data: imageFile,
        preview: URL.createObjectURL(imageFile)
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorMessage) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('headline', newsData.headline);
      formData.append('categoryId', newsData.category);
      formData.append('content', newsData.content);
      if (newsData.image.data) {
        formData.append('image', newsData.image.data);
      }
      await axios.patch(`/news/${newsData.id}`, formData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      setIsLoading(false);
      navigate('/dashboard');
    } catch ({ response }) {
      setErrorMessage(
        response.status === 400
          ? Array.isArray(response.data.error)
            ? response.data.error[0]
            : response.data.error
          : response.status === 403
          ? 'Admin is not permitted to publish a news'
          : 'Something went wrong, please try again later'
      );
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="mb-5 text-2xl font-semibold tracking-tight">
        Edit "{`${currentHeadline}`}"
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 w-full">
          <div className="flex flex-col gap-3 w-1/2">
            <div>
              <label htmlFor="headline">Headline</label>
              <input
                name="headline"
                id="headline"
                type="text"
                placeholder="A Very Cool News Title"
                required
                className="mt-2 w-full block border-[1px] outline-none px-2 py-1 border-black"
                value={newsData.headline}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="block mt-2 w-full border-[1px] border-black outline-none px-2 py-1"
                value={newsData.category}
                onChange={handleChange}
              >
                {categories.length &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full flex flex-col h-full">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                id="content"
                placeholder="This is the news that will change the world."
                className="mt-2 w-full h-full block border-[1px] outline-none px-2 py-1 border-black"
                value={newsData.content}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={
                newsData.image.preview ||
                'https://www.womantowomanmentoring.org/wp-content/uploads/placeholder.jpg'
              }
              alt="Preview Image"
              className="mb-5 mt-2 aspect-square object-cover"
            />
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-base mt-4 text-red-500">{errorMessage}</p>
        )}
        <button
          type="submit"
          className={`cursor-pointer border-[1px] border-black bg-black text-white transition-opacity hover:opacity-75 py-2 mt-5 flex justify-center w-full ${
            isLoading ? 'opacity-75' : 'opacity-100'
          }`}
        >
          {!isLoading ? 'Submit' : <Spinner />}
        </button>
      </form>
    </div>
  );
}

export default EditNewsPage;
