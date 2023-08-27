import { Cookies } from "react-cookie";

const cookies = new Cookies();

const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

const getCookie = (name) => {
  return cookies.get(name);
};

const removeCookie = (name) => {
  return cookies.remove(name);
};

export { setCookie, getCookie, removeCookie };
