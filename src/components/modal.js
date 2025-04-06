export function openModal(popupFrame, classActive) {
  popupFrame.classList.add(classActive);
}

export function closeModal(popupFrame, classActive) {
  popupFrame.classList.remove(classActive);
}

export function closeModalBackdrop({ currentTarget, target }) {
  const classActive = "popup_is-opened";
  if (currentTarget === target) {
    closeModal(currentTarget, classActive);
  }
}

export function handleFormEditAutocomplete(nameInput, jobInput) {
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

  renderCard({ name: imageTitle, link: link });
  console.log(modalProfileAdd);

  closeModal(modalProfileAdd, popupToggleClassOpen);

  modalProfileAdd.querySelector(".popup__form").reset();
}
