import Cookies from 'js-cookie';

import axios from 'axios';
export const getCookie = (name) => {
  const cookie = Cookies.get(name);
  return cookie ? JSON.parse(cookie) : [];
};


export const setCookie = (name, value, options = {}) => {
  Cookies.set(name, JSON.stringify(value), options);
};

//SETTING LocalStorage for google id using session storage mechanism
export const setLocalStorage = (data= {}) =>{
 console.log("It shouldnt be working nor called...cookie.js")
};
