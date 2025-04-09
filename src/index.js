import "./pages/index.css";
import { initialCards } from "./cards";
import {
  createCard,
  deleteCardTemplate,
  likeCardHandler,
} from "./components/card";
import {
  openModal,
  closeModal,
  closeModalBackdrop,
  keydownHandle
} from "./components/modal";

const addIcon = new URL("./images/add-icon.svg", import.meta.url);
const avatar = new URL("./images/avatar.jpg", import.meta.url);
const card_1 = new URL("./images/card_1.jpg", import.meta.url);
const card_2 = new URL("./images/card_2.jpg", import.meta.url);
const card_3 = new URL("./images/card_3.jpg", import.meta.url);
const close = new URL("./images/close.svg", import.meta.url);
const deleteIcon = new URL("./images/delete-icon.svg", import.meta.url);
const editIcon = new URL("./images/edit-icon.svg", import.meta.url);
const likeActive = new URL("./images/like-active.svg", import.meta.url);
const likeInactive = new URL("./images/like-inactive.svg", import.meta.url);
const logo = new URL("./images/logo.svg", import.meta.url);

const images = [
  { name: "addIcon", link: addIcon },
  { name: "avatar", link: avatar },
  { name: "card_1", link: card_1 },
  { name: "card_2", link: card_2 },
  { name: "card_3", link: card_3 },
  { name: "close", link: close },
  { name: "deleteIcon", link: deleteIcon },
  { name: "editIcon", link: editIcon },
  { name: "likeActive", link: likeActive },
  { name: "likeInactive", link: likeInactive },
  { name: "logo", link: logo },
];

const placesList = document.querySelector(".places__list");

//declaration popups and btns
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const modalProfileEdit = document.querySelector(".popup_type_edit");
const modalProfileAdd = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");

const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector('.popup__caption');

const modalProfileEditCloseBtn = modalProfileEdit.querySelector(".popup__close");
const modalProfileAddCloseBtn = modalProfileAdd.querySelector(".popup__close");
const modalImageCloseBtn = modalImage.querySelector(".popup__close");

const modalProfileEditForm = modalProfileEdit.querySelector(".popup__form");
const modalProfileAddForm = modalProfileAdd.querySelector(".popup__form");

//declaration inputs forms
const nameInput = modalProfileEdit.querySelector(".popup__input_type_name");
const jobInput = modalProfileEdit.querySelector(
  ".popup__input_type_description"
);

const cardNameInput = modalProfileAdd.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = modalProfileAdd.querySelector(".popup__input_type_url");

//declaration popup active class
const popupToggleClassOpen = "popup_is-opened";

//open popup
profileEditBtn.addEventListener("click", function () {
  handleFormEditAutocomplete(nameInput, jobInput);
  openModal(modalProfileEdit, popupToggleClassOpen, keydownHandle);
});
profileAddBtn.addEventListener("click", function () {
  openModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);
});

//close popup
modalProfileEditCloseBtn.addEventListener("click", function () {
  closeModal(modalProfileEdit, popupToggleClassOpen, keydownHandle);
});
modalProfileAddCloseBtn.addEventListener("click", function () {
  closeModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);
});
modalImageCloseBtn.addEventListener("click", function () {
  closeModal(modalImage, popupToggleClassOpen, keydownHandle);
});

//close backdrop popup
modalProfileEdit.addEventListener("click", closeModalBackdrop);
modalProfileAdd.addEventListener("click", closeModalBackdrop);
modalImage.addEventListener("click", closeModalBackdrop);

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

function openImageHandler(link, alt) {
  openModal(modalImage, popupToggleClassOpen, keydownHandle);
  modalImageImg.src = link;
  modalImageImg.alt = alt;
  modalImageCaption.textContent = alt;
}

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

  const name = nameInput.value;
  const job = jobInput.value;

  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  title.textContent = name;
  description.textContent = job;

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

  renderCard({ name: imageTitle, link: link });
  console.log(modalProfileAdd);

  closeModal(modalProfileAdd, popupToggleClassOpen, keydownHandle);

  modalProfileAdd.querySelector(".popup__form").reset();
}

// @todo: Вывести карточки на страницу
function renderCards(initialCards) {
  initialCards.forEach((element) => {
    placesList.append(
      createCard(
        element.name,
        element.link,
        deleteCardTemplate,
        likeCardHandler,
        openImageHandler
      )
    );
  });
}

function renderNewCard(initialCards) {
  placesList.prepend(
    createCard(
      initialCards.name,
      initialCards.link,
      deleteCardTemplate,
      likeCardHandler,
      openImageHandler
    )
  );
}

renderCards(initialCards);
