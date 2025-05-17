const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-38",
  headers: {
    authorization: "1eacb18d-93ca-4844-b65a-47120e5a6ecd",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("getInitialCards получен");
        return res.json();
      }
      return Promise.reject(`Ошибка getInitialCards: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("getUserInfo получен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const patchUserInfo = (nameUpdate, descriptionUpdate) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameUpdate,
      about: descriptionUpdate,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("patchUserInfo отправлен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const postNewCard = (title, url) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: url,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("postNewCard отправлен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const deleteCardFromSrv = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("deleteCard отправлен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("putLike отправлен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        console.log("deleteLike отправлен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

export const patchUserAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("patchUserAvatar отправлен");
        return res.json();
      }
      return Promise.reject(`Ошибка getUserInfo: ${res.status}`);
    })
    .catch((err) => console.log(err));
};
