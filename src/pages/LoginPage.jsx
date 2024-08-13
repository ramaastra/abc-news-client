import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name: inputName, value: inputValue } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [inputName]: inputValue
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorMessage) {
      return;
    }

    setIsLoading(true);
    try {
      const { data: response } = await axios.post('/auth/login', loginData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch ({ response }) {
      setErrorMessage(
        response.status === 400
          ? response.data.error
          : response.status === 401
          ? 'Invalid email or password'
          : 'Something went wrong, please try again later'
      );
    }
    setIsLoading(false);
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="border-[1px] border-black p-10">
        <h1 className="font-playfair font-bold text-5xl mb-5 text-center">
          Login
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              required
              className={`w-72 block border-[1px] outline-none px-2 py-1 ${
                errorMessage ? 'border-red-500' : 'border-black'
              }`}
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="******"
              required
              className={`w-72 block border-[1px] outline-none px-2 py-1 ${
                errorMessage ? 'border-red-500' : 'border-black'
              }`}
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className={`cursor-pointer border-[1px] border-black bg-black text-white transition-opacity hover:opacity-75 py-2 mt-2 text-sm flex justify-center ${
              isLoading ? 'opacity-75' : 'opacity-100'
            }`}
          >
            {!isLoading ? 'Submit' : <Spinner />}
          </button>
        </form>
        <p className="mt-5 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold underline">
            Register here
          </a>
        </p>
      </div>
      <div className="group flex items-center align-middle cursor-pointer mt-4">
        <span className="group-hover:-translate-x-2 transition-transform">
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
              strokeWidth="1"
              d="m14 8-4 4 4 4"
            />
          </svg>
        </span>
        <a href="/">Back to home</a>
      </div>
    </main>
  );
}

export default LoginPage;
