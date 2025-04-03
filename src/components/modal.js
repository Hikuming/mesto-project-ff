export function openModal(popupFrame, classActive) {
  popupFrame.classList.add(classActive);
  const closeBtn = popupFrame.querySelector(".popup__close");
  //вешаем слушатель на кнопку закрытия
  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    closeModal(popupFrame, classActive);
  });
  //вешаем слушатель на бэкдроп
  popupFrame.addEventListener("click", closeModalBackdrop);
  //вешаем слушатель на Еsc
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closeModal(openedPopup, classActive);
      }
    }
  });
}

function closeModal(popupFrame, classActive) {
  popupFrame.classList.remove(classActive);
  const closeBtn = popupFrame.querySelector(".popup__close");
  //убираем слушатель с кнопки закрытия
  closeBtn.removeEventListener("click", (event) => {
    event.stopPropagation();
    closeModal(popupFrame, classActive);
  });
  //убираем слушатель на бэкдроп
  popupFrame.removeEventListener("click", closeModalBackdrop);
  //убираем слушатель на Еsc
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closeModal(openedPopup, classActive);
      }
    }
  });
}

function closeModalBackdrop({ currentTarget, target }) {
  const classActive = "popup_is-opened";
  if (currentTarget === target) {
    closeModal(currentTarget, classActive);
  }
}

export function handleFormEditAutocomplete (
    nameInput,
    jobInput
) {
  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");

  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

export function handleFormEditSubmit(
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

  closeModal(modalProfileEdit, popupToggleClassOpen);
}

export function handleFormAddSubmit(
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

  renderCard([{ name: imageTitle, link: link }]);

  closeModal(modalProfileAdd, popupToggleClassOpen);

  cardNameInput.value = "";
  linkInput.value = "";
}
