export function createCard(
  title,
  imageSource,
  deleteCard,
  likeCard,
  openImageHandler
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

  deleteButton.addEventListener("click", function () {
    deleteCard(card);
  });

  likeButton.addEventListener("click", function (evt) {
    likeCard(evt, likeButtonClassActive);
  });

  cardImage.addEventListener("click", function () {
    openImageHandler(imageSource, title);
  });
  return card;
}

export function likeCardHandler(currentTarget, likeButtonClassActive) {
  currentTarget.target.classList.toggle(likeButtonClassActive);
}

export function deleteCardTemplate(thisCard) {
  thisCard.remove();
}
