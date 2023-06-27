export const setItemWithExpiration = (key, value, expirationInSeconds) => {
  const expirationMS = expirationInSeconds * 1000;
  const expirationDate = new Date().getTime() + expirationMS;
  const item = {
    value: value,
    expirationDate: expirationDate,
  };
  localStorage.setItem(key, JSON.stringify(item));

  setTimeout(() => {
    localStorage.removeItem(key);
  }, expirationMS);
};


export const getItemWithExpiration = (key) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item && new Date().getTime() < item.expirationDate) {
    return item.value;
  } else {
    localStorage.removeItem(key);
    return null;
  }
};
