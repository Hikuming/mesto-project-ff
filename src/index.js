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

//declaration inputs forms
const nameInput = modalProfileEdit.querySelector(".popup__input_type_name");
const jobInput = modalProfileEdit.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = modalProfileAdd.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = modalProfileAdd.querySelector(".popup__input_type_url");
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
  openModal(
    modalProfileEdit,
    popupToggleClassOpen,
    keydownHandle,
    clearValidation,
    validationConfig
  );
});
profileAddBtn.addEventListener("click", function () {
  openModal(
    modalProfileAdd,
    popupToggleClassOpen,
    keydownHandle,
    clearValidation,
    validationConfig
  );
});
userAvatar.addEventListener("click", function () {
  openModal(
    modalProfileNewAvatar,
    popupToggleClassOpen,
    keydownHandle,
    clearValidation,
    validationConfig
  );
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
    linkInput,
    renderNewCard
  );
});
modalProfileNewAvatarForm.addEventListener("submit", function (evt) {
  handleFromProfileNewAvatarSubmit(evt, newAvatarInput, userAvatar);
});

function openImageHandler(link, alt) {
  openModal(
    modalImage,
    popupToggleClassOpen,
    keydownHandle,
    clearValidation,
    validationConfig
  );
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
    .then((res) => console.log("ок"))
    .catch((err) => console.log(err))
    .finally(() => pendingButton(false, modalProfileEdit));

  title.textContent = name;
  description.textContent = job;
  clearValidation(modalProfileEdit, validationConfig);
  closeModal(modalProfileEdit, popupToggleClassOpen, keydownHandle);
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
      return (id = res._id);
    })
    .catch((err) => console.log(err))
    .finally(() => pendingButton(false, modalProfileAdd));
  renderCard({ name: imageTitle, link: link, cardId: id });
  closeModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);
  clearValidation(modalProfileAdd, validationConfig);
  modalProfileAddForm.reset();
}

function handleFromProfileNewAvatarSubmit(evt, urlInput) {
  evt.preventDefault();
  pendingButton(true, modalProfileNewAvatar);
  patchUserAvatar(urlInput.value)
    .then((res) => (userAvatar.style.backgroundImage = `url('${res.avatar}')`))
    .catch((err) => console.log(err))
    .finally(() => pendingButton(false, modalProfileNewAvatar));
  closeModal(modalProfileNewAvatar, popupToggleClassOpen, keydownHandle);
  clearValidation(modalProfileNewAvatar, validationConfig);
  modalProfileNewAvatarForm.reset();
}

function renderCards(initialCards) {
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
        element._id
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
      initialCards.cardId
    )
  );
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCardsArray]) => {
    userName.textContent = userInfo.name;
    userDescription.textContent = userInfo.about;
    userId = userInfo._id;
    renderCards(initialCardsArray);
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);
