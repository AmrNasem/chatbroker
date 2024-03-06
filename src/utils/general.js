export const setCookie = (name, value, timeToLiveMS) => {
  const expires = new Date(new Date().getTime() + timeToLiveMS).toUTCString();
  document.cookie = `${`${name}=${encodeURIComponent(
    value
  )}`}; expires=${expires}`;
};

export const deleteCookie = (name) => {
  setCookie(name, null, 0);
};

export const getCookie = (name) => {
  const targettedCookie = decodeURIComponent(document.cookie)
    .split(";")
    .find((cookie) => cookie.trim().split("=")[0] === name);
  return targettedCookie?.trim().split("=")[1];
};
