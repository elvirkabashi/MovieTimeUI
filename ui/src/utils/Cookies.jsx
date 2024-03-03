import Cookies from 'js-cookie';
import axios from 'axios';

export const getAuthToken = () => {
  const cookieToken = Cookies.get('authToken');
  if (cookieToken) {
    return cookieToken;
  }

  return null;
};

export const getUserInfo = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error('No token found.');
      return null;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get('http://localhost:7147/api/UserInfo', config);

    return response.data;
  } catch (error) {
    console.error('Error getting user info:', error);


    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Unauthorized access. Deleting auth token cookie.');

      Cookies.remove('authToken');
      window.location.href = '/';

    }

    return null;
  }
};
