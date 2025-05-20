import "./pages/index.css";
import {
  createCard,
  deleteCardTemplate,
  likeCardHandler,
} from "./components/card";
import {
  openModal,
  closeModal,
  closeModalBackdrop,
  keydownHandle,
} from "./components/modal";
import {
  getInitialCards,
  getUserInfo,
  patchUserAvatar,
  patchUserInfo,
  postNewCard,
  deleteCardFromSrv,
  putLike,
  deleteLike,
  getResponseData,
} from "./components/api";

import { enableValidation, clearValidation } from "./components/validation";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const placesList = document.querySelector(".places__list");

//declaration popups and btns
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const modalProfileEdit = document.querySelector(".popup_type_edit");
const modalProfileAdd = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");
const modalProfileNewAvatar = document.querySelector(".popup_type_new-avatar");

const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");

const modalProfileEditCloseBtn =
  modalProfileEdit.querySelector(".popup__close");
const modalProfileAddCloseBtn = modalProfileAdd.querySelector(".popup__close");
const modalImageCloseBtn = modalImage.querySelector(".popup__close");
const modalProfileNewAvatarCloseBtn =
  modalProfileNewAvatar.querySelector(".popup__close");

const modalProfileEditForm = modalProfileEdit.querySelector(".popup__form");
const modalProfileAddForm = modalProfileAdd.querySelector(".popup__form");
const modalProfileNewAvatarForm =
  modalProfileNewAvatar.querySelector(".popup__form");

let userId = "";
let userAvatarImg = "";

//declaration inputs forms
const nameInput = modalProfileEdit.querySelector(".popup__input_type_name");
const jobInput = modalProfileEdit.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = modalProfileAdd.querySelector(
  ".popup__input_type_card-name"
);
const imageUrlInput = modalProfileAdd.querySelector(".popup__input_type_url");
const newAvatarInput = modalProfileNewAvatar.querySelector(
  ".popup__input_type_url"
);
//declaration popup active class
const popupToggleClassOpen = "popup_is-opened";
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");

//вешаем слушатели на октрытие форм
profileEditBtn.addEventListener("click", function () {
  handleFormEditAutocomplete(nameInput, jobInput);
  clearValidation(modalProfileEdit, validationConfig);
  openModal(modalProfileEdit, popupToggleClassOpen, keydownHandle);
});
profileAddBtn.addEventListener("click", function () {
  modalProfileAddForm.reset();
  clearValidation(modalProfileAdd, validationConfig);
  openModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);
});
userAvatar.addEventListener("click", function () {
  modalProfileNewAvatarForm.reset();
  clearValidation(modalProfileNewAvatar, validationConfig);
  openModal(modalProfileNewAvatar, popupToggleClassOpen, keydownHandle);
});

//вешаем слушатели на закрытие форм
modalProfileEditCloseBtn.addEventListener("click", function () {
  closeModal(modalProfileEdit, popupToggleClassOpen, keydownHandle);
});
modalProfileAddCloseBtn.addEventListener("click", function () {
  closeModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);
});
modalImageCloseBtn.addEventListener("click", function () {
  closeModal(modalImage, popupToggleClassOpen, keydownHandle);
});
modalProfileNewAvatarCloseBtn.addEventListener("click", function () {
  closeModal(modalProfileNewAvatar, popupToggleClassOpen, keydownHandle);
});

//вешаем слушатели на закрытие по бекдропу форм
modalProfileEdit.addEventListener("click", closeModalBackdrop);
modalProfileAdd.addEventListener("click", closeModalBackdrop);
modalImage.addEventListener("click", closeModalBackdrop);
modalProfileNewAvatar.addEventListener("click", closeModalBackdrop);

//вешаем слушатели на сабмиты форм
modalProfileEditForm.addEventListener("submit", function (evt) {
  handleFormEditSubmit(
    evt,
    modalProfileEdit,
    popupToggleClassOpen,
    nameInput,
    jobInput
  );
});
modalProfileAddForm.addEventListener("submit", function (evt) {
  handleFormAddSubmit(
    evt,
    modalProfileAdd,
    popupToggleClassOpen,
    cardNameInput,
    imageUrlInput,
    renderNewCard
  );
});
modalProfileNewAvatarForm.addEventListener("submit", function (evt) {
  handleFromProfileNewAvatarSubmit(evt, newAvatarInput, userAvatar);
});

function openImageHandler(link, alt) {
  openModal(modalImage, popupToggleClassOpen, keydownHandle);
  modalImageImg.src = link;
  modalImageImg.alt = alt;
  modalImageCaption.textContent = alt;
}
//хендлер для постановки в форму реактировани профиля
function handleFormEditAutocomplete(nameInput, jobInput) {
  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

function handleFormEditSubmit(
  evt,
  modalProfileEdit,
  popupToggleClassOpen,
  nameInput,
  jobInput
) {
  evt.preventDefault();

  clearValidation(modalProfileEdit, validationConfig);

  const name = nameInput.value;
  const job = jobInput.value;

  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  pendingButton(true, modalProfileEdit);
  patchUserInfo(name, job)
    .then((res) => {
      title.textContent = res.name;
      description.textContent = res.about;
      clearValidation(modalProfileEdit, validationConfig);
      closeModal(modalProfileEdit, popupToggleClassOpen, keydownHandle);
    })
    .catch((err) => console.log(err))
    .finally(() => pendingButton(false, modalProfileEdit));
}

function handleFormAddSubmit(
  evt,
  modalProfileAdd,
  popupToggleClassOpen,
  cardNameInput,
  linkInput,
  renderCard
) {
  evt.preventDefault();
  const imageTitle = cardNameInput.value;
  const link = linkInput.value;
  let id;
  pendingButton(true, modalProfileAdd);
  postNewCard(imageTitle, link)
    .then((res) => {
      renderCard(res, userId);
      closeModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);
      clearValidation(modalProfileAdd, validationConfig);
      modalProfileAddForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => pendingButton(false, modalProfileAdd));
}

function avatarChange(url) {
  userAvatar.style.backgroundImage = `url('${url}')`;
}

function handleFromProfileNewAvatarSubmit(evt, urlInput) {
  evt.preventDefault();
  pendingButton(true, modalProfileNewAvatar);
  patchUserAvatar(urlInput.value)
    .then((res) => {
      avatarChange(res.avatar);
      closeModal(modalProfileNewAvatar, popupToggleClassOpen, keydownHandle);
      clearValidation(modalProfileNewAvatar, validationConfig);
      modalProfileNewAvatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => pendingButton(false, modalProfileNewAvatar));
}

function renderCards(initialCards, userId) {
  initialCards.forEach((element) => {
    //проверка id овнера карточки
    const deleteButtonActive = userId === element.owner._id;
    placesList.append(
      createCard(
        element.name,
        element.link,
        deleteCardTemplate,
        likeCardHandler,
        openImageHandler,
        element.likes,
        deleteButtonActive,
        element._id,
        userId
      )
    );
  });
}

function pendingButton(pending, form) {
  const button = form.querySelector(".popup__button");
  if (pending) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранениe";
  }
}

function renderNewCard(initialCards) {
  placesList.prepend(
    createCard(
      initialCards.name,
      initialCards.link,
      deleteCardTemplate,
      likeCardHandler,
      openImageHandler,
      [],
      true,
      initialCards.cardId,
      userId
    )
  );
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCardsArray]) => {
    userName.textContent = userInfo.name;
    userDescription.textContent = userInfo.about;
    userId = userInfo._id;
    userAvatarImg = userInfo.avatar;
    avatarChange(userAvatarImg);
    renderCards(initialCardsArray, userId);
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);
