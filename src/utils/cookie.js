import Cookies from 'js-cookie';


export const getCookie = (name) => {
  const cookie = Cookies.get(name);
  return cookie ? JSON.parse(cookie) : [];
};


export const setCookie = (name, value, options = {}) => {
  Cookies.set(name, JSON.stringify(value), options);
};
