export const token_key = "BOOK_BUDDY";
export const token_ID = "ID";

export const setToken = (token) => {
  window.localStorage.setItem(token_key, token);
};
export const setTokenID = (token) => {
  window.localStorage.setItem(token_ID, token);
};

export const removeID = (token) => {
  window.localStorage.removeItem(token_ID);
};
export const getToken = () => {
  let token = window.localStorage.getItem(token_key);
  if (token) return token;
  return false;
};

export const isLogin = () => {
  if (!!getToken()) {
    return true;
  }
  return false;
};

export const removeToken = () => {
  window.localStorage.clear();
};
