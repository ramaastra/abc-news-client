import { RouterProvider } from 'react-router-dom';
import axios from 'axios';
import router from './router';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return <RouterProvider router={router} />;
}

export default App;
