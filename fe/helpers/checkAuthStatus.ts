import jwtDecode from 'jwt-decode';
import Token from '../interfaces/token';

const checkAuthStatus = () => {
  let isLoggedIn = false;
  let isExpired = false;
  const token = sessionStorage.getItem('token');

  if (token) {
    const decodedToken = jwtDecode(token) as Token;
    const currentTime = Math.floor(Date.now() / 1000);
    isExpired = decodedToken.exp < currentTime;
    if (isExpired) {
      sessionStorage.removeItem('token');
      isLoggedIn = false;
    } else {
      isLoggedIn = true;
    }
  } else {
    isLoggedIn = false;
  }

  return isLoggedIn;
};

export default checkAuthStatus;
