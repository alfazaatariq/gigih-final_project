import jwtDecode from 'jwt-decode';
import Token from '../interfaces/token';

const checkAuthStatus = () => {
  let isLoggedIn = false;
  const token = sessionStorage.getItem('token');

  if (token) {
    const decodedToken = jwtDecode(token) as Token;

    const currentTime = Math.floor(Date.now() / 1000);

    isLoggedIn = decodedToken.exp > currentTime;
  } else {
    isLoggedIn = false;
  }

  return isLoggedIn;
};

export default checkAuthStatus;
