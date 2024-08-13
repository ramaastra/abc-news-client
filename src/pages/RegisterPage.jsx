import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import Spinner from '../components/Spinner';

function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isFieldError = (fieldName) => {
    return errorMessage.toLowerCase().split(' ').includes(fieldName);
  };

  const handleChange = (event) => {
    const { name: inputName, value: inputValue } = event.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [inputName]: inputValue
    }));

    if (errorMessage) {
      setErrorMessage('');
    }

    if (
      (inputName === 'password' &&
        inputValue !== registerData.confirmPassword) ||
      (inputName === 'confirmPassword' && inputValue !== registerData.password)
    ) {
      setErrorMessage('Password does not match');
    } else {
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
      await axios.post('/auth/register', registerData);
      toast.success('Account created. Please login to continue');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch ({ response }) {
      setErrorMessage(
        response.status === 400
          ? Array.isArray(response.data.error)
            ? response.data.error[0]
            : response.data.error
          : 'Something went wrong, please try again later'
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        transition={Slide}
        hideProgressBar={true}
        theme="dark"
      />
      <main className="h-screen flex flex-col justify-center items-center">
        <div className="border-[1px] border-black p-10">
          <h1 className="font-playfair font-bold text-5xl mb-5 text-center">
            Register
          </h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  className={`w-52 block border-[1px] outline-none px-2 py-1 ${
                    isFieldError('email') ? 'border-red-500' : 'border-black'
                  }`}
                  value={registerData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  className={`w-52 block border-[1px] outline-none px-2 py-1 ${
                    isFieldError('username') ? 'border-red-500' : 'border-black'
                  }`}
                  value={registerData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  className={`w-52 block border-[1px] outline-none px-2 py-1 ${
                    isFieldError('firstName')
                      ? 'border-red-500'
                      : 'border-black'
                  }`}
                  value={registerData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  className={`w-52 block border-[1px] outline-none px-2 py-1 ${
                    isFieldError('lastName') ? 'border-red-500' : 'border-black'
                  }`}
                  value={registerData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="******"
                  required
                  className={`w-52 block border-[1px] outline-none px-2 py-1 ${
                    isFieldError('password') ? 'border-red-500' : 'border-black'
                  }`}
                  value={registerData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="******"
                  required
                  className={`w-52 block border-[1px] outline-none px-2 py-1 ${
                    isFieldError('password') ? 'border-red-500' : 'border-black'
                  }`}
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
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
            Already have an account?{' '}
            <a href="/login" className="font-semibold underline">
              Login here
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
    </>
  );
}

export default RegisterPage;
