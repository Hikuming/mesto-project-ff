export function openModal(popupFrame, classActive) {
  popupFrame.classList.add(classActive);
  document.addEventListener("keydown", keydownHandle)
    
}

export function closeModal(popupFrame, classActive) {
  popupFrame.classList.remove(classActive);
  document.removeEventListener("keydown", keydownHandle)
}

export function closeModalBackdrop({ currentTarget, target }) {
  const classActive = "popup_is-opened";
  if (currentTarget === target) {
    closeModal(currentTarget, classActive);
  }
}

export function keydownHandle (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    const popupToggleClassOpen = "popup_is-opened";
    if (openedPopup) {
      closeModal(openedPopup, popupToggleClassOpen, keydownHandle);
    }
  }
}
