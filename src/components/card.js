export function createCard(
  title,
  imageSource,
  openPopup,
  modalImage,
  modalImageImg,
  popupToggleClassOpen
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeButtonClassActive = likeButton.classList[0] + "_is-active";
  card.querySelector(".card__title").textContent = title;
  cardImage.src = imageSource;
  card.querySelector(".card__image").alt = title;

  deleteButton.addEventListener("click", () => {
    deleteCardTemplate(card);
  });

  likeButton.addEventListener("click", (evt) =>
    likeCardHandler(evt, likeButtonClassActive)
  );

  cardImage.addEventListener("click", () => {
    openImageHandler(modalImageImg, imageSource, title);
    openPopup(modalImage, popupToggleClassOpen);
  });
  return card;
}

function likeCardHandler(currentTarget, likeButtonClassActive) {
  currentTarget.target.classList.toggle(likeButtonClassActive);
}

function deleteCardTemplate(thisCard) {
  thisCard.remove();
}

function openImageHandler(modalImageImg, link, alt) {
  modalImageImg.src = link;
  modalImageImg.alt = alt;
}
