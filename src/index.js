import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard } from "./components/card";
import {
  openModal,
  handleFormEditAutocomplete,
  handleFormEditSubmit,
  handleFormAddSubmit,
} from "./components/modal";

const addIcon = new URL("../images/add-icon.svg", import.meta.url);
const avatar = new URL("../images/avatar.jpg", import.meta.url);
const card_1 = new URL("../images/card_1.jpg", import.meta.url);
const card_2 = new URL("../images/card_2.jpg", import.meta.url);
const card_3 = new URL("../images/card_3.jpg", import.meta.url);
const close = new URL("../images/close.svg", import.meta.url);
const deleteIcon = new URL("../images/delete-icon.svg", import.meta.url);
const editIcon = new URL("../images/edit-icon.svg", import.meta.url);
const likeActive = new URL("../images/like-active.svg", import.meta.url);
const likeInactive = new URL("../images/like-inactive.svg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);

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
profileEditBtn.addEventListener("click", () => {
  handleFormEditAutocomplete(nameInput, jobInput);
  openModal(modalProfileEdit, popupToggleClassOpen);
});
profileAddBtn.addEventListener("click", () =>
  openModal(modalProfileAdd, popupToggleClassOpen)
);

modalProfileEdit.addEventListener("submit", (evt) =>
  handleFormEditSubmit(
    evt,
    modalProfileEdit,
    popupToggleClassOpen,
    nameInput,
    jobInput
  )
);
modalProfileAdd.addEventListener("submit", (evt) =>
  handleFormAddSubmit(
    evt,
    modalProfileAdd,
    popupToggleClassOpen,
    cardNameInput,
    linkInput,
    renderCard
  )
);

// @todo: Вывести карточки на страницу
function renderCard(initialCards) {
  initialCards.forEach((element) => {
    placesList.prepend(
      createCard(
        element.name,
        element.link,
        openModal,
        modalImage,
        modalImageImg,
        popupToggleClassOpen
      )
    );
  });
}

renderCard(initialCards);
