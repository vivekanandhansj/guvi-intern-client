export const getUserData = (userData = "user") => {
    const localData = window.localStorage.getItem(userData);
    let res = {};
    try {
      res = JSON.parse(localData) || {}
    } catch (err) {
      res = localData || {};
    }
    return res;
  };
  