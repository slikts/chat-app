import uuid from "uuid/v4";

const key = "__chat-client-token";
const { localStorage } = window;

const clientToken = () => {
  const cachedToken = localStorage.getItem(key);
  if (cachedToken) {
    return cachedToken;
  }
  const newToken = uuid();
  localStorage.setItem(key, newToken);
  return newToken;
};

export default clientToken();
